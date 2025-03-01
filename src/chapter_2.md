# Chapter 2: Firebase Authentication

In this chapter, we'll implement Google Authentication in our shopping list application using Firebase Auth.

## Setting Up Authentication in Firebase Console

1. Go to your Firebase Console
2. Navigate to Authentication > Get started -> Sign-in method
3. Enable Email and Password as native providers, and Google as a sign-in provider
4. Configure OAuth consent screen if needed

## Implementing Authentication UI

Update your `index.html` to include authentication sections:

```html
<section id="whenSignedOut">
  <button id="signInButton">Sign in with Google</button>
</section>

<section id="whenSignedIn" hidden="true">
  <button id="signOutButton">Sign out</button>
  <div id="userDetails"></div>
</section>
```

## Authentication Logic

Update your `app.js` to include authentication functionality:

```javascript
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Get DOM elements
const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");
const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");
const userDetails = document.getElementById("userDetails");

// Initialize Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sign in event handler
signInButton.onclick = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Sign in error:", error);
  }
};

// Sign out event handler
signOutButton.onclick = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

// Auth state observer
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = `
            <img src="${user.photoURL}" alt="User photo">
            <p>Hello ${user.displayName}!</p>
            <p>Email: ${user.email}</p>
        `;
  } else {
    // User is signed out
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    userDetails.innerHTML = "";
  }
});
```

Let's break down the code:

- `getAuth`: A method that gets an authnetication instance based on the app that was instantiated in the previous chapter.
- `GoogleAuthProvider`: Provider for Google authentication, required for signing in with Google
- `signInWithPopup`: Sign in with a popup
- `signOut`: Sign out
- `onAuthStateChanged`: Probably the most important method available over here. It represents an observer that is always triggered when the auth state changes.
