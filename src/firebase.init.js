
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD8eGW5lcVHCmNEVrWh-o7w85s-AAbckYY",
  authDomain: "email-password-auth-6ace6.firebaseapp.com",
  projectId: "email-password-auth-6ace6",
  storageBucket: "email-password-auth-6ace6.firebasestorage.app",
  messagingSenderId: "71960745541",
  appId: "1:71960745541:web:52805e3a0c71bc5077f52c"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;