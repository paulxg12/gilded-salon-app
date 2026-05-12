# Gilded Salon — Firebase Setup Guide

## Prerequisites
- Node.js v18+ installed on your machine
- A Google account (for Firebase)
- A Twilio account (for WhatsApp)

---

## Step 1: Create Firebase Project

1. Go to **https://console.firebase.google.com**
2. Click **Create a project** (or use your existing "salon app" project)
3. Name: **Gilded Salon**
4. Disable Google Analytics (optional)
5. Click **Create project**

---

## Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication → Sign-in method**
2. Enable **Phone**
   - Add test numbers (for development without SMS):
     - `+971 50 123 4567` → test code: `123456`
     - `+971 55 111 1111` → test code: `000000`
3. Enable **Email/Password**
4. Click **Save**

---

## Step 3: Create Firestore Database

1. Go to **Firestore Database → Create database**
2. Choose **Start in test mode** (we'll secure it later with the rules file)
3. Choose a location (e.g., `eur3` - europe-west or the closest to Dubai)
4. Click **Enable**

---

## Step 4: Get Firebase Config Keys

1. Go to **Project Settings → General → Your apps**
2. Click **Add app → Web** (even though you're building mobile, the config is the same format)
3. Register app nickname: **Gilded Salon**
4. Copy the `firebaseConfig` values

---

## Step 5: Fill in .env

Open **gilded-app/.env** and paste your Firebase keys:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSy...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=gilded-salon.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=gilded-salon
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=gilded-salon.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

> ⚠️ Never commit this file to GitHub. It's already in `.gitignore`.

---

## Step 6: Install Dependencies + Run App

```bash
cd gilded-app
npm install
npx expo start
```

Scan the QR code with **Expo Go** on your phone.

---

## Step 7: Install Firebase CLI & Login

```bash
npm install -g firebase-tools
firebase login
```

Follow the browser login flow.

---

## Step 8: Connect Firebase to Project

```bash
cd gilded-app
firebase use --add
```
- Select your Firebase project
- Give it an alias: `default`

---

## Step 9: Deploy Firestore Security Rules

```bash
firebase deploy --only firestore:rules
```

---

## Step 10: Deploy Firestore Indexes

```bash
firebase deploy --only firestore:indexes
```

This enables the queries for:
- Customer bookings sorted by date
- Scheduled reminders
- Follow-up queries

---

## Step 11: Set Up Twilio WhatsApp

1. Go to **https://twilio.com** → Sign up (free trial gives $15 credit)
2. In Console → **Messaging → Try it Out → Send a WhatsApp Message**
3. Scan the QR code with your phone to join the sandbox
4. Note your:
   - **Account SID** (starts with `AC...`)
   - **Auth Token** (starts with `...`)
   - **WhatsApp number** (usually `+14155238886`)

---

## Step 12: Deploy Cloud Functions

```bash
cd gilded-app/functions
npm install
```

Set Twilio config:

```bash
firebase functions:config:set \
  twilio.account_sid="AC_YOUR_TWILIO_SID" \
  twilio.auth_token="YOUR_TWILIO_AUTH_TOKEN" \
  twilio.whatsapp_number="+14155238886" \
  salon.name="Gilded Salon — Dubai Marina"
```

Deploy:

```bash
cd ..
firebase deploy --only functions
```

This deploys 5 cloud functions:
| Function | Trigger |
|----------|---------|
| `onBookingCreated` | When a booking is added to Firestore |
| `sendBookingReminders` | Runs every hour (sends 24h reminders) |
| `sendFollowUps` | Runs daily at 6 PM (sends post-visit reviews) |
| `testWhatsApp` | Callable from the app to test |
| `whatsappWebhook` | Handles incoming WhatsApp replies |

---

## Step 13: Configure Twilio Webhook (for Reply Handling)

1. In Twilio Console → **Messaging → Try it Out → Send a WhatsApp Message**
2. Under **Sandbox Configuration**, set **When a message comes in** to:

```
https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/whatsappWebhook
```

Example: `https://us-central1-gilded-salon.cloudfunctions.net/whatsappWebhook`

3. Set **HTTP POST** → Save

---

## Step 14: Add Admin Phone in Settings

1. Open the app → Log in as admin
2. Go to **Settings → WhatsApp Integration**
3. Enter your admin phone: `+971501234567`
4. Toggle **Auto-send Booking Invoice** ON

---

## Step 15: Test the Full Flow

```bash
# Test WhatsApp from terminal
firebase functions:shell
> testWhatsApp({ phone: "+971501234567" })
```

Or in the app:

1. Open customer app → Book a service → Confirm
2. Check your WhatsApp → invoice received ✅
3. Check admin WhatsApp → new booking alert ✅
4. Open admin portal → booking appears in real-time ✅
5. Reply to the WhatsApp message:
   - Reply `5` → saves rating to Firestore
   - Reply `CANCEL` → cancels your booking
   - Reply `BOOK` → get booking link

---

## Step 16: Go Live — Publish to App Store

```bash
# Install EAS CLI
npm install -g eas-cli
eas login

# Build for stores
eas build --platform android --profile production
eas build --platform ios --profile production
```

Then submit to Google Play Console and App Store Connect.

---

## Monthly Costs Summary

| Service | Cost |
|---------|------|
| Firebase (Spark tier) | **$0/mo** |
| Twilio WhatsApp (~600 msgs) | **~$5-10/mo** |
| Google Play (one-time) | **$25** |
| Apple Developer (annual) | **$99/yr** |
| **Total first year** | **~$220-240** |
| **Every year after** | **~$108-120/yr** |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Module not found" | Run `npm install` in both `gilded-app/` and `gilded-app/functions/` |
| Phone auth not working | Add test numbers in Firebase Auth console |
| WhatsApp not sending | Check Twilio credits (+$15 free trial) |
| Cloud Functions error | Run `firebase functions:log` to see error logs |
| Firestore permission denied | Run `firebase deploy --only firestore:rules` |
