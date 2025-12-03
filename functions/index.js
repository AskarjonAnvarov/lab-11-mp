/**
 * Lab 11: Cloud Functions
 * 
 * This file contains:
 * - Task 7: HTTP-triggered Function
 * - Task 8: Firestore-triggered Function
 */

const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

// Initialize Firebase Admin
initializeApp();

// ============================================================================
// TASK 7: HTTP-triggered Function
// ============================================================================
// Simple HTTP function returning JSON
exports.helloWorld = onRequest((request, response) => {
  response.json({
    message: "Hello from Firebase Cloud Functions!",
    timestamp: new Date().toISOString(),
    method: request.method,
    path: request.path,
  });
});

// ============================================================================
// TASK 8: Firestore-triggered Function
// ============================================================================
// Create trigger for /messages/{docId}
exports.onMessageCreated = onDocumentCreated(
  {
    document: "messages/{docId}",
    region: "us-central1",
  },
  async (event) => {
    // Get the document data
    const snapshot = event.data;
    if (!snapshot) {
      console.log("No data associated with the event");
      return;
    }

    const data = snapshot.data();
    const docId = event.params.docId;

    // Task 8: Log new message content
    console.log("=== New Message Created ===");
    console.log("Document ID:", docId);
    console.log("Message Text:", data.text);
    console.log("Created At:", data.createdAt);
    console.log("==========================");

    // Optional: You can add additional processing here
    // For example, send notifications, update other collections, etc.

    return null;
  }
);

