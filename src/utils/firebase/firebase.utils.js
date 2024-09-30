// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import {query, getDocs, collection, writeBatch, doc, getDoc, setDoc, getFirestore} from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt : "select_account"
});

export const db = getFirestore()
export const auth = getAuth(app);

export const signInWithGooglePopUp = async () => {
    const res = await signInWithPopup(auth,provider);
    return res;
}

export const createUserDocumentation = async (userAuth, data ={}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);

    if(userSnapShot.exists()) return userDocRef;
    
    let {email, displayName} = userAuth;
    
    
    
    const createdAt = new Date();
    try{
        await setDoc(userDocRef,{
            email, 
            displayName : data.displayName || displayName,
            createdAt,
            ...data
        });
    }
    catch(error){
        console.log("error creating the user",error.message);
    }

    return userDocRef;
}

export const createAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    
    try {
        console.log(auth);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Response from createUserWithEmailAndPassword:', res); // Add this log
        return res; // This should include a 'user' object
    } catch (error) {
        console.error('Error creating user with email and password:', error); // Log any errors
        throw error; // Re-throw the error to be caught by the saga
    }
};

export const signInAuthWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);


export const signOutUser = async () => await signOut(auth);


// adding the data into firestore database

export const addColletionsAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db,collectionKey);

    const batch = writeBatch(db);

    objectsToAdd.forEach((element)=>{
        const docRef = doc(collectionRef,element.title.toLowerCase());
        batch.set(docRef, element);
    });

    await batch.commit();
    console.log("done");
}


export const getCategoriesAndDocuments = async() => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    const result = querySnapshot.docs.reduce((acc,element)=>{
        const {title, items} = element.data();
        acc[title] = items;
        return acc;
    },{});
    console.log(result);
    return result;
}

export const getCurrentUserFromFB = () => {
    console.log("Triggered");
    return new Promise((resolve,reject)=>{
        const unsubscribe = onAuthStateChanged(auth,(userAuth)=>{
            unsubscribe(); // whether we get the user or not, just sign out
            resolve(userAuth); // sign in whether the user or null.
        },reject);
        
    });
}