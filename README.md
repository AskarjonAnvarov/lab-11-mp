# Lab 11: Advanced Firebase Integration

## Author
Abdusamad Nigmatov (220063)

## Project Structure
```
lab-11/
├── lib/
│   └── main.dart          # Main application with all tasks
├── functions/             # Cloud Functions directory
│   ├── index.js          # HTTP and Firestore-triggered functions
│   ├── package.json      # Node.js dependencies
│   └── .eslintrc.js      # ESLint configuration
├── pubspec.yaml          # Flutter dependencies
└── README.md             # This file
```

## Dependencies
- `firebase_core: ^3.8.0` - Firebase core package
- `firebase_auth: ^5.3.1` - Firebase Authentication
- `cloud_firestore: ^5.4.4` - Cloud Firestore database
- `firebase_messaging: ^15.1.3` - Firebase Cloud Messaging
- `flutter_local_notifications: ^17.2.1` - Local notifications
- `intl: ^0.19.0` - Date formatting

## Tasks Implementation

### Task 1: Firebase Integration Setup (10 points)
- ✅ Create or open a Flutter project
- ✅ Add Firebase to your project using google-services files
- ✅ Initialize Firebase in main() with Firebase.initializeApp()

### Task 2: Add Firestore Dependency & Create 'messages' Collection (8 points)
- ✅ Add cloud_firestore to pubspec.yaml
- ✅ Run flutter pub get
- ✅ Create 'messages' collection in Firestore console

### Task 3: Add Document Form (text + createdAt) (10 points)
- ✅ Create a TextField and submit button
- ✅ On tap, add document with text + Timestamp.now()
- ✅ Verify new document appears in Firebase console

### Task 4: Real-time Display Using Snapshots (12 points)
- ✅ Use StreamBuilder with .snapshots()
- ✅ Display message list dynamically
- ✅ Confirm list updates instantly on new documents

### Task 5: Update Functionality (10 points)
- ✅ Add an Edit button to each item
- ✅ Open a dialog to modify message text
- ✅ Use .update() to save changes

### Task 6: Delete Functionality (10 points)
- ✅ Add Delete button beside each message
- ✅ Call .delete() on the document
- ✅ Confirm the item disappears from UI and Firestore

### Task 7: Cloud Functions - HTTP-triggered Function (10 points)
- ✅ Run firebase init functions
- ✅ Create simple HTTP function returning JSON
- ✅ Deploy using firebase deploy --only functions

### Task 8: Cloud Functions - Firestore-triggered Function (10 points)
- ✅ Create trigger for /messages/{docId}
- ✅ Log new message content
- ✅ Add message and verify logs in Firebase console

### Task 9: Firebase Cloud Messaging – Token Retrieval (10 points)
- ✅ Add firebase_messaging package
- ✅ Request notification permission
- ✅ Print FCM token to console using getToken()

### Task 10: Foreground Push Notification Handling (10 points)
- ✅ Listen to FirebaseMessaging.onMessage
- ✅ Show notification using flutter_local_notifications
- ✅ Send test message from Firebase Console and see real notification

## Setup Instructions

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable the following services:
   - **Authentication** → Email/Password (optional, if needed)
   - **Firestore Database** → Create database in production mode (or test mode for development)
   - **Cloud Messaging** → Enable for push notifications

### 2. Configure Firebase for Flutter

#### Option A: Using FlutterFire CLI (Recommended)

1. Install FlutterFire CLI:
   ```bash
   dart pub global activate flutterfire_cli
   ```

2. Configure Firebase:
   ```bash
   cd lab-11
   flutterfire configure
   ```

3. Select your Firebase project and platforms (Android, iOS, Web)

4. This will generate `lib/firebase_options.dart`

5. Update `lib/main.dart` to use the generated options:
   ```dart
   import 'firebase_options.dart';
   
   void main() async {
     WidgetsFlutterBinding.ensureInitialized();
     await Firebase.initializeApp(
       options: DefaultFirebaseOptions.currentPlatform,
     );
     runApp(const MyApp());
   }
   ```

#### Option B: Manual Configuration

Update FirebaseOptions in `lib/main.dart` with your Firebase project credentials.

### 3. Create Firestore Collection

1. In Firebase Console, go to **Firestore Database**
2. Click **Start collection**
3. Collection ID: `messages`
4. Add a test document (optional):
   - Field: `text` (string)
   - Field: `createdAt` (timestamp)

### 4. Install Flutter Dependencies

```bash
cd lab-11
flutter pub get
```

### 5. Setup Cloud Functions (Tasks 7 & 8)

#### Prerequisites:
- Install Node.js (v18 or higher)
- Install Firebase CLI:
  ```bash
  npm install -g firebase-tools
  ```

#### Setup Steps:

1. **Login to Firebase**:
   ```bash
   firebase login
   ```

2. **Initialize Functions** (in lab-11 directory):
   ```bash
   firebase init functions
   ```
   
   Select:
   - Use an existing project (select your Firebase project)
   - Language: JavaScript
   - ESLint: Yes
   - Install dependencies: Yes

3. **Deploy Functions**:
   ```bash
   cd functions
   npm install
   cd ..
   firebase deploy --only functions
   ```

4. **Test HTTP Function**:
   After deployment, you'll get a URL like:
   ```
   https://us-central1-YOUR_PROJECT.cloudfunctions.net/helloWorld
   ```
   
   Open this URL in a browser to see the JSON response.

5. **Test Firestore Trigger**:
   - Add a message in the app
   - Check Firebase Console → Functions → Logs
   - You should see logs from the trigger function

### 6. Firebase Cloud Messaging Setup (Tasks 9 & 10)

#### Android Setup:

1. Download `google-services.json` from Firebase Console
2. Place it in `android/app/`

3. Update `android/app/build.gradle`:
   ```gradle
   dependencies {
       // ... existing dependencies
       implementation platform('com.google.firebase:firebase-bom:32.7.0')
       implementation 'com.google.firebase:firebase-messaging'
   }
   ```

4. Update `AndroidManifest.xml` (android/app/src/main/AndroidManifest.xml):
   ```xml
   <manifest>
       <application>
           <!-- Add this -->
           <meta-data
               android:name="com.google.firebase.messaging.default_notification_icon"
               android:resource="@mipmap/ic_launcher" />
           <meta-data
               android:name="com.google.firebase.messaging.default_notification_color"
               android:resource="@color/colorAccent" />
       </application>
   </manifest>
   ```

#### iOS Setup (Mac only):

1. Download `GoogleService-Info.plist` from Firebase Console
2. Place it in `ios/Runner/`
3. Open Xcode and add it to the project

### 7. Request Notification Permissions

The app automatically requests notification permissions on startup (Task 9).

### 8. Test Push Notifications

1. **Get FCM Token**:
   - Run the app
   - Check console/logcat for: "FCM Token: ..."
   - Copy this token

2. **Send Test Notification**:
   - Go to Firebase Console → Cloud Messaging
   - Click "Send your first message"
   - Enter notification title and text
   - Click "Send test message"
   - Paste your FCM token
   - Send

3. **Verify Notification**:
   - If app is in foreground: You should see a local notification (Task 10)
   - If app is in background: You'll receive a push notification
   - If app is closed: You'll receive a notification in the notification tray

## Running the App

1. **Install dependencies**:
   ```bash
   flutter pub get
   ```

2. **Run on device** (recommended for FCM):
   ```bash
   flutter run -d android
   # or
   flutter run -d ios
   ```

## Features

### Firestore Integration
- Real-time message synchronization
- Add, edit, and delete messages
- Automatic UI updates when data changes
- Timestamp tracking (createdAt, updatedAt)

### Cloud Functions
- HTTP endpoint for API calls
- Firestore triggers for event-driven functions
- Automatic logging

### Push Notifications
- FCM token retrieval
- Foreground notification handling
- Background notification handling
- Local notification display

## Testing Checklist

- [ ] Firebase initialized successfully
- [ ] Messages collection created in Firestore
- [ ] Can add new messages
- [ ] Messages appear in real-time
- [ ] Can edit messages
- [ ] Can delete messages
- [ ] HTTP function deployed and accessible
- [ ] Firestore trigger logs appear in console
- [ ] FCM token printed to console
- [ ] Push notification received when app is in foreground
- [ ] Push notification received when app is in background

## Troubleshooting

### Firestore not working
- Verify Firestore is enabled in Firebase Console
- Check database rules allow read/write
- Ensure Firebase is properly initialized

### Cloud Functions deployment fails
- Ensure you're logged in: `firebase login`
- Check Node.js version: `node --version` (should be 18+)
- Run `npm install` in functions directory
- Check Firebase project is selected: `firebase projects:list`

### Push notifications not working
- Verify FCM token is printed in console
- Check notification permissions are granted
- For Android: Ensure google-services.json is in correct location
- For iOS: Ensure GoogleService-Info.plist is added in Xcode
- Check Firebase Console → Cloud Messaging is enabled

### Real-time updates not working
- Ensure you're using `.snapshots()` stream
- Check Firestore security rules
- Verify internet connection

## Security Rules (Firestore)

For development, you can use:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{document=**} {
      allow read, write: if true; // Open for development only!
    }
  }
}
```

**For production, use proper security rules based on authentication.**

## Notes

- All tasks are implemented and ready to use
- Cloud Functions require Node.js and Firebase CLI
- Push notifications work best on physical devices
- Make sure to configure Firebase properly before running
- Test on Android first as it's easier to set up than iOS

## Cloud Functions URLs

After deployment, your functions will be available at:
- HTTP Function: `https://us-central1-YOUR_PROJECT.cloudfunctions.net/helloWorld`
- Firestore Trigger: Automatically runs when documents are created

Check the Firebase Console → Functions for actual URLs after deployment.

