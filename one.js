import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyCeUAIqli551JvewXW2wJAdBv5-FewT2KI", // Public API key for your project
  authDomain: "life-4794f.firebaseapp.com",        // Your app's authentication domain
  projectId: "life-4794f",                          // Your Firebase project ID
  storageBucket: "life-4794f.firebasestorage.app",  // Your Cloud Storage bucket
  messagingSenderId: "615333406565",                // Sender ID for Cloud Messaging
  appId: "1:615333406565:web:6f3381427827715d51e38c", // Your unique app identifier
  measurementId: "G-S9GV8R4J36"                     // Google Analytics measurement ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Example function to store user data
function storeUserData(userId, data) {
  set(ref(database, 'users/' + userId), data);
}