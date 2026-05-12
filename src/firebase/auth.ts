import { FirebaseAuth, FirestoreDB } from './config';
import { User } from '@types/index';

export const signInWithPhone = async (phoneNumber: string) => {
  const confirmation = await FirebaseAuth.signInWithPhoneNumber(phoneNumber);
  return confirmation;
};

export const confirmCode = async (confirmation: any, code: string) => {
  const credential = await confirmation.confirm(code);
  return credential.user;
};

export const signInWithEmail = async (email: string, password: string) => {
  const credential = await FirebaseAuth.signInWithEmailAndPassword(email, password);
  return credential.user;
};

export const signUpWithEmail = async (email: string, password: string, name: string) => {
  const credential = await FirebaseAuth.createUserWithEmailAndPassword(email, password);
  await credential.user.updateProfile({ displayName: name });
  return credential.user;
};

export const signOut = async () => {
  await FirebaseAuth.signOut();
};

export const getCurrentUser = () => {
  return FirebaseAuth.currentUser;
};

export const onAuthStateChanged = (callback: (user: any) => void) => {
  return FirebaseAuth.onAuthStateChanged(callback);
};

export const createUserProfile = async (user: any, data: Partial<User>) => {
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

export const getUserProfile = async (uid: string): Promise<User | null> => {
  const doc = await FirestoreDB.collection('users').doc(uid).get();
  if (!doc.exists) return null;
  return doc.data() as User;
};
