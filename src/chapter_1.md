# Chapter 1: Setting Up Firebase and Emulators

In this chapter, we'll learn how to set up Firebase in a web application and configure local emulators for development.

## Prerequisites

- Node.js installed on your machine
- A Google account
- Basic understanding of HTML, CSS, and JavaScript

## Creating a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a Project"
3. Name your project and follow the setup wizard

## Installing Firebase Tools

Open your terminal and install the Firebase CLI globally:

```bash
npm install -g firebase-tools
```

## Project Initialization

1. Create a new directory for your project and navigate to it:

```bash
mkdir firebase-shopping-list
cd firebase-shopping-list
```

2. Login to Firebase:

```bash
firebase login
```

3. Initialize Firebase in your project:

```bash
firebase init
```

During initialization, select:

- Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
- Emulators: Set up local emulators for Firebase products

Use an existing project, and select the one that you have created in the console.

For emulators, choose:

- Hosting Emulator

Write port 8080 for Emulator, and download the emulators now.

## Starting the Emulators

Run the emulators with:

```bash
firebase emulators:start
```

This will start:

- Hosting emulator on port 8080

## Setting Up Firebase in Your Web App

Create a new file `index.html` with the basic structure:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Firebase Shopping List</title>
    <link rel="stylesheet" href="styles.css" />
    <script type="module" src="app.js"></script>
  </head>

  <body>
    <h1>My Shopping List</h1>
  </body>
</html>
```

Create `app.js` and initialize Firebase with the config object:

```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";

const firebaseConfig = {
  // Your Firebase config object
  // Get this from Firebase Console > Project Settings
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("everything initialized properly!");
```

## Testing the Setup

1. Visit `http://localhost:8080` (or your local development server)
2. Open the browser console
3. Verify no Firebase connection errors

## Key Points to Remember

- Always use emulators for local development
- Never commit Firebase config with real API keys to version control
- Use environment variables for production credentials
- The emulator UI provides great debugging tools

In the next chapter, we'll implement authentication using Firebase Auth.
