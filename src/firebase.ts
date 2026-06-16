import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyBZEF_GgIGNNB8ozt1_IRKPsMkVVB5FOaw",
  authDomain: "health-on-wheels-d6a04.firebaseapp.com",
  projectId: "health-on-wheels-d6a04",
  storageBucket: "health-on-wheels-d6a04.firebasestorage.app",
  messagingSenderId: "328587379910",
  appId: "1:328587379910:web:189993b987232c1f6d83c7",
  measurementId: "G-8VJKKGF1YT"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore & Auth Services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Strict operation enum
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

// Strictly structured error information interface compatible with custom visual console
export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

/**
 * Handle and wrap Firestore errors inside standard JSON formats so security compliance can be easily diagnosed.
 */
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error Detailed Dispatch: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
