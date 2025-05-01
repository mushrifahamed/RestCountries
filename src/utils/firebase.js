import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBix6bgsg9iarMAWxAqNb0TIPxe-vMrIhs",
    authDomain: "rest-country-app-51442.firebaseapp.com",
    projectId: "rest-country-app-51442",
    storageBucket: "rest-country-app-51442.firebasestorage.app",
    messagingSenderId: "158135441461",
    appId: "1:158135441461:web:2d4d0cd9b9c14e6b1c397c",
    measurementId: "G-XG35LJMQ1B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);