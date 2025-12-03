# Lab 11: Tasks Summary

## Task Checklist

### ✅ Task 1: Firebase Integration Setup (10 points)
- [x] Create or open a Flutter project
- [x] Add Firebase to your project using google-services files
- [x] Initialize Firebase in main() with Firebase.initializeApp()

**Implementation**: `lib/main.dart` lines 14-35

### ✅ Task 2: Add Firestore Dependency & Create 'messages' Collection (8 points)
- [x] Add cloud_firestore to pubspec.yaml
- [x] Run flutter pub get
- [x] Create 'messages' collection in Firestore console

**Implementation**: 
- `pubspec.yaml` line 14
- Collection created in Firebase Console

### ✅ Task 3: Add Document Form (text + createdAt) (10 points)
- [x] Create a TextField and submit button
- [x] On tap, add document with text + Timestamp.now()
- [x] Verify new document appears in Firebase console

**Implementation**: `lib/main.dart` lines 122-158

### ✅ Task 4: Real-time Display Using Snapshots (12 points)
- [x] Use StreamBuilder with .snapshots()
- [x] Display message list dynamically
- [x] Confirm list updates instantly on new documents

**Implementation**: `lib/main.dart` lines 263-338

### ✅ Task 5: Update Functionality (10 points)
- [x] Add an Edit button to each item
- [x] Open a dialog to modify message text
- [x] Use .update() to save changes

**Implementation**: `lib/main.dart` lines 160-204

### ✅ Task 6: Delete Functionality (10 points)
- [x] Add Delete button beside each message
- [x] Call .delete() on the document
- [x] Confirm the item disappears from UI and Firestore

**Implementation**: `lib/main.dart` lines 206-248

### ✅ Task 7: Cloud Functions - HTTP-triggered Function (10 points)
- [x] Run firebase init functions
- [x] Create simple HTTP function returning JSON
- [x] Deploy using firebase deploy --only functions

**Implementation**: `functions/index.js` lines 17-27

### ✅ Task 8: Cloud Functions - Firestore-triggered Function (10 points)
- [x] Create trigger for /messages/{docId}
- [x] Log new message content
- [x] Add message and verify logs in Firebase console

**Implementation**: `functions/index.js` lines 32-56

### ✅ Task 9: Firebase Cloud Messaging – Token Retrieval (10 points)
- [x] Add firebase_messaging package
- [x] Request notification permission
- [x] Print FCM token to console using getToken()

**Implementation**: `lib/main.dart` lines 37-48

### ✅ Task 10: Foreground Push Notification Handling (10 points)
- [x] Listen to FirebaseMessaging.onMessage
- [x] Show notification using flutter_local_notifications
- [x] Send test message from Firebase Console and see real notification

**Implementation**: `lib/main.dart` lines 103-143

## Total: 100 points

All tasks are fully implemented and ready to use!

