# Firebase Spark Setup (No Backend Required)

This project is configured to work with Firebase Spark plan by writing directly to Firestore from the client.

## 1) Configure Environment Variables

Create a `.env.local` file from `.env.example` and fill all values from your Firebase Web App config:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## 2) Create Firestore Database

In Firebase Console:

1. Build > Firestore Database
2. Create database in production mode
3. Select a region close to your users

## 3) Publish Security Rules

Use the `firestore.rules` file in this repository.

If you use Firebase CLI:

```bash
firebase init firestore
firebase deploy --only firestore:rules
```

## 4) Verify from App

- Open `/settings` and check Firebase status badge.
- Open `/editor` and click Save draft / Publish.
- Data is written to `articles` collection.

## Spark Plan Notes

- This app does not require Cloud Functions for write flow.
- Firestore has daily free quotas on Spark; high traffic may require Blaze.
- Keep rules strict and avoid public broad writes in production.
