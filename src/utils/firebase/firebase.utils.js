// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import {query, getDocs, collection, writeBatch, doc, getDoc, setDoc, getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt2hVUt07cnPxwB2tFaK0vl7pezAC2wtE",
  authDomain: "crown-clothing-final-b3411.firebaseapp.com",
  projectId: "crown-clothing-final-b3411",
  storageBucket: "crown-clothing-final-b3411.appspot.com",
  messagingSenderId: "1009072945791",
  appId: "1:1009072945791:web:5bb15085abf0bedd2b5d4a",
  measurementId: "G-5MVTJPR1Y9"
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
    
    const {email, displayName} = userAuth;
    

    const createdAt = new Date();
    try{
        await setDoc(userDocRef,{
            email, 
            displayName,
            createdAt,
            ...data
        });
    }
    catch(error){
        console.log("error creating the user",error.message);
    }

    return userDocRef;
}

export const createAuthWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);


export const signOutUser = () => signOut(auth);


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
    return result;
}