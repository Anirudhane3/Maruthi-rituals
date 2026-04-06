import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCcqAZSdo8dyn7vFt9tJFPTztVgl99Ht4w",
  authDomain: "disable-analytics-94e71.firebaseapp.com",
  projectId: "disable-analytics-94e71",
  storageBucket: "disable-analytics-94e71.firebasestorage.app",
  messagingSenderId: "449503580775",
  appId: "1:449503580775:web:03ec99982e0da1f4713ac2",
  measurementId: "G-VYQ4T9Z7BN"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
