import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkLAJj6_AXijpmtdQNL4NsgxpEO7Jd9mU",
    authDomain: "chatgpt-clone-e3e4b.firebaseapp.com",
    projectId: "chatgpt-clone-e3e4b",
    storageBucket: "chatgpt-clone-e3e4b.appspot.com",
    messagingSenderId: "624176608047",
    appId: "1:624176608047:web:8a907cce2257350ab167da"
  };

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }