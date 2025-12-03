# Complete Setup Guide for Lab 11

## Quick Start Checklist

- [ ] Firebase project created
- [ ] Firestore database initialized
- [ ] FlutterFire configured OR Firebase manually configured
- [ ] Dependencies installed (`flutter pub get`)
- [ ] Cloud Functions initialized (for Tasks 7 & 8)
- [ ] FCM configured for Android/iOS (for Tasks 9 & 10)
- [ ] Test the app

## Detailed Steps

### Step 1: Firebase Console Setup

1. **Create/Select Project**:
   - Go to https://console.firebase.google.com/
   - Create new project or select existing
   - Enable billing if needed (for Cloud Functions)

2. **Enable Firestore**:
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in production mode" (or test mode for development)
   - Select location (choose closest to you)

3. **Create Messages Collection**:
   - After database is created, click "Start collection"
   - Collection ID: `messages`
   - Document ID: Leave empty (auto-generated)
   - Add a test field: `text` (string), value: "Test message"
   - Click "Save"

4. **Enable Cloud Messaging**:
   - Go to Cloud Messaging
   - The service is automatically enabled

### Step 2: Flutter App Configuration

#### Using FlutterFire CLI (Easiest):

```bash
cd lab-11
dart pub global activate flutterfire_cli
flutterfire configure
```

Select your project and platforms.

#### Manual Configuration:

1. Get your Firebase config from Firebase Console:
   - Project Settings → General → Your apps
   - Copy the configuration values

2. Update `lib/main.dart` line 17-24 with your values

### Step 3: Android Configuration

1. **Add google-services.json**:
   - Download from Firebase Console → Project Settings → Your apps → Android app
   - Place in `android/app/google-services.json`

2. **Update android/app/build.gradle**:
   Add at the top:
   ```gradle
   plugins {
       id "com.android.application"
       id "kotlin-android"
       id "dev.flutter.flutter-gradle-plugin"
       id "com.google.gms.google-services"  // Add this
   }
   ```

   Add at the bottom:
   ```gradle
   dependencies {
       implementation platform('com.google.firebase:firebase-bom:32.7.0')
       implementation 'com.google.firebase:firebase-messaging'
   }
   ```

3. **Update android/build.gradle**:
   Add in dependencies:
   ```gradle
   dependencies {
       classpath 'com.google.gms:google-services:4.4.0'
   }
   ```

4. **Update AndroidManifest.xml**:
   Add inside `<application>` tag:
   ```xml
   <meta-data
       android:name="com.google.firebase.messaging.default_notification_icon"
       android:resource="@mipmap/ic_launcher" />
   ```

### Step 4: Cloud Functions Setup

1. **Install Firebase CLI** (if not installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login**:
   ```bash
   firebase login
   ```

3. **Initialize Functions**:
   ```bash
   cd lab-11
   firebase init functions
   ```
   
   Choose:
   - Use an existing project
   - JavaScript
   - ESLint: Yes
   - Install dependencies: Yes

4. **Copy function files**:
   The `functions/index.js` is already created with the code.
   You may need to adjust it after `firebase init`.

5. **Deploy**:
   ```bash
   firebase deploy --only functions
   ```

6. **Get Function URL**:
   After deployment, check Firebase Console → Functions for the URL.

### Step 5: Test Everything

1. **Run the app**:
   ```bash
   flutter run -d android
   ```

2. **Test Firestore**:
   - Add a message
   - Edit a message
   - Delete a message
   - Verify updates in real-time

3. **Test Cloud Functions**:
   - Open HTTP function URL in browser
   - Check Firestore logs when adding messages

4. **Test Push Notifications**:
   - Copy FCM token from console
   - Send test notification from Firebase Console
   - Verify notification appears

## Common Issues

### "Firebase not initialized" error
- Check Firebase configuration values are correct
- Ensure `Firebase.initializeApp()` is called before using Firebase

### Firestore permission denied
- Check Firestore rules in Firebase Console
- For testing, use rules that allow read/write

### Cloud Functions deployment fails
- Ensure you're in the correct Firebase project
- Check Node.js version (18+)
- Run `npm install` in functions directory

### Push notifications not working
- Verify FCM token is printed
- Check notification permissions
- Ensure google-services.json is in correct location
- For Android, check build.gradle configuration

### Real-time updates not working
- Verify using `.snapshots()`
- Check Firestore rules
- Ensure StreamBuilder is properly implemented

## Verification

### Task 1: ✅ Firebase Setup
- Firebase initialized in main()
- No initialization errors

### Task 2: ✅ Firestore
- Collection 'messages' exists
- Can read/write documents

### Task 3: ✅ Add Document
- TextField and button work
- Documents added with timestamp

### Task 4: ✅ Real-time Updates
- StreamBuilder implemented
- List updates automatically

### Task 5: ✅ Update
- Edit button works
- Dialog opens
- Updates saved

### Task 6: ✅ Delete
- Delete button works
- Confirmation dialog
- Item removed

### Task 7: ✅ HTTP Function
- Function deployed
- URL accessible
- Returns JSON

### Task 8: ✅ Firestore Trigger
- Trigger deployed
- Logs appear when document created

### Task 9: ✅ FCM Token
- Token printed to console
- Permissions requested

### Task 10: ✅ Foreground Notifications
- Notification appears in foreground
- Local notification shown

## Next Steps

After completing setup:
1. Test all features
2. Verify in Firebase Console
3. Send real push notification
4. Test on different devices

Good luck! 🚀

