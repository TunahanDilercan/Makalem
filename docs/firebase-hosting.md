# Firebase Hosting Deployment (Next.js)

This project is prepared for Firebase Hosting with framework-aware deployment.

## Prerequisites

1. Install Firebase CLI
2. Run `firebase login`
3. Copy `.firebaserc.example` to `.firebaserc` and set your project id

## Deploy Steps

1. Ensure your `.env.local` exists
2. Run `firebase use --add` (if project is not selected yet)
3. Run `firebase deploy`

## Notes

- The app works in demo mode without Firestore by using static code content and local storage fallback in editor actions.
- If Firebase env vars are configured, Save/Publish writes to Firestore.
- `firebase.json` already includes `frameworksBackend`, suitable for Next.js SSR routes.
