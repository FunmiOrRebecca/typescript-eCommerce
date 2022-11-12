import { initializeApp } from "firebase/app";
import{ getAuth,
GoogleAuthProvider,
signInWithPopup,
createUserWithEmailAndPassword,
signInWithEmailAndPassword, 
signOut, 
onAuthStateChanged,
User,
NextOrObserver
} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc, collection,writeBatch, query, getDocs, QueryDocumentSnapshot} from "firebase/firestore";
import { type } from "os";
import { Category } from "../store/categoriesReducer/category.types";

const firebaseConfig = {
  apiKey: "AIzaSyDdmEPApFt2u2AxwLS4smmJ5XJVzNXTIhQ",
  authDomain: "practicedatabase-1a3f1.firebaseapp.com",
  projectId: "practicedatabase-1a3f1",
  storageBucket: "practicedatabase-1a3f1.appspot.com",
  messagingSenderId: "886970042077",
  appId: "1:886970042077:web:5836075178227e04b67d34",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters(
  {
    prompt: "select_account"
  }
);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const database = getFirestore();


export type AdditionalInformation = {
  displayName? : string;
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}

export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation={} as AdditionalInformation): Promise<void | QueryDocumentSnapshot<UserData>>  => {
  const userDocRef = doc(database, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log("userSnapshot",userSnapshot.exists());

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
        await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation})

    } catch (error) {
      console.log(error);
    }

  }
  // return userDocRef;
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email:string, password:string) =>{
  if(!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email:string, password:string) => {
  if(!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
}
export const signOutUser = async () =>{
  signOut(auth);
}

export const onAuthStateChangedListener = async (callback: NextOrObserver<User> ) => {
     onAuthStateChanged(auth, callback);
}

export type objectToAdd = {
  title: string;
}
export const addCollectionAndDocuments = async <T extends objectToAdd>(collectionKey: string, objectsToAdd:T[]): Promise<void>=> {
  const collectionRef = collection(database, collectionKey);
  const batch = writeBatch(database);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  })
  await batch.commit();
  console.log("done");
}

export const getCategoriesAndDocuments = async() : Promise<Category[]> => {
  const collectionRef = collection(database, 'categories');
  const q = query(collectionRef);
  // await Promise.reject( new Error('new error'));

  const querySnapShot = await getDocs(q);
  return  querySnapShot.docs.map(docSnapshot => docSnapshot.data() as Category);
  //Migrated to categoriesSelector
  // .reduce((acc, docSnapShot)=>{
  //   const {title, items} = docSnapShot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {})
  // return categoryMap;
}


export const getCurrentUser = (): Promise<User | null> =>{
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}