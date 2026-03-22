import admin from 'firebase-admin';

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: getEnv('FIREBASE_PROJECT_ID'),
    privateKey: getEnv('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
    clientEmail: getEnv('FIREBASE_CLIENT_EMAIL'),
  }),
});

export const db = admin.firestore();