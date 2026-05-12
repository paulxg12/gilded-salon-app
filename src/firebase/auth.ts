import { 
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  updateProfile,
  User,
} from 'firebase/auth';
import { FirebaseAuth, FirestoreDB } from './config';
import { User as AppUser } from '@types/index';

export const signInWithPhone = async (phoneNumber: string) => {
  const provider = new PhoneAuthProvider(FirebaseAuth);
  const verificationId = await provider.verifyPhoneNumber(phoneNumber);
  return { verificationId };
};

export const confirmCode = async (verificationId: string, code: string) => {
  const credential = PhoneAuthProvider.credential(verificationId, code);
  const userCredential = await signInWithCredential(FirebaseAuth, credential);
  return userCredential.user;
};

export const signInWithEmail = async (email: string, password: string) => {
  const credential = await signInWithEmailAndPassword(FirebaseAuth, email, password);
  return credential.user;
};

export const signUpWithEmail = async (email: string, password: string, name: string) => {
  const credential = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
  await updateProfile(credential.user, { displayName: name });
  return credential.user;
};

export const signOut = async () => {
  await firebaseSignOut(FirebaseAuth);
};

export const getCurrentUser = () => {
  return FirebaseAuth.currentUser;
};

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return firebaseOnAuthStateChanged(FirebaseAuth, callback);
};

export const createUserProfile = async (user: User, data: Partial<AppUser>) => {
  await FirestoreDB.collection('users').doc(user.uid).set({
    id: user.uid,
    email: user.email,
    name: data.name || '',
    phone: data.phone || user.phoneNumber || '',
    role: 'customer',
    language: 'en',
    notificationsEnabled: true,
    createdAt: new Date(),
    ...data,
  });
};

export const getUserProfile = async (uid: string): Promise<AppUser | null> => {
  const doc = await FirestoreDB.collection('users').doc(uid).get();
  if (!doc.exists) return null;
  return doc.data() as AppUser;
};
