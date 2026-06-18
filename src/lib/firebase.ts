import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAjk9cE0J4ZEz952HvLnB8bwiUbclYsvok",
  authDomain: "quickbuk-e758d.firebaseapp.com",
  projectId: "quickbuk-e758d",
  storageBucket: "quickbuk-e758d.firebasestorage.app",
  messagingSenderId: "258229002262",
  appId: "1:258229002262:web:f50048359146284eb85537",
  measurementId: "G-LZ80XZ4FS8",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
