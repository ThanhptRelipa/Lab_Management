import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'upload-avatar-79096.firebaseapp.com',
  projectId: 'upload-avatar-79096',
  storageBucket: 'upload-avatar-79096.appspot.com',
  messagingSenderId: '1061733525707',
  appId: '1:1061733525707:web:4c84218026a10a6031534e',
  measurementId: 'G-VKR5PT1C59'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
