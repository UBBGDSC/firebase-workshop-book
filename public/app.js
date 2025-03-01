// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  addDoc,
  deleteDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { faker } from "https://esm.sh/@faker-js/faker";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBsbybn3H6J0Gs3SM6W2tjmcUu_ST5VZDk",
  authDomain: "shopping-list-67b7d.firebaseapp.com",
  projectId: "shopping-list-67b7d",
  storageBucket: "shopping-list-67b7d.firebasestorage.app",
  messagingSenderId: "738099009909",
  appId: "1:738099009909:web:185a3b45354f96c8c85b3c",
  measurementId: "G-9NM9FVH1GW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
let unsubscribe;

// extract the html elements related to login
const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");
const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");

const userDetails = document.getElementById("userDetails");

const addRandomItem = document.getElementById("addRandomItem");
const itemsList = document.getElementById("itemsList");

const editForm = document.getElementById("editForm");
const editModal = document.getElementById("editModal");
const closeModal = document.getElementById("closeModal");

signInButton.onclick = async () => {
  console.log("sign in button clicked");
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Sign in error", error);
  }
};

signOutButton.onclick = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign out error", error);
  }
};

// handle modal
closeModal.onclick = () => {
  editModal.style.display = "none";
};

editForm.onsubmit = async (e) => {
  e.preventDefault();
  const docId = editForm.dataset.docId;
  const ref = editForm.dataset.ref;
  console.log(ref);
  const item = document.getElementById("editItem").value;
  const price = document.getElementById("editPrice").value;

  try {
    const docRef = doc(db, "list", docId);
    console.log(docRef);
    await updateDoc(docRef, {
      item,
      price,
      updateAt: serverTimestamp(),
    });
    editModal.style.display = "none";
    console.log("Updated successfully!");
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = `
      <img src="${user.photoURL}" alt="User photo">
      <p>Hello ${user.displayName}!</p>
      <p>Email: ${user.email}</p>
      `;

    addRandomItem.onclick = async () => {
      try {
        const newItem = {
          uid: user.uid,
          item: faker.commerce.productName(),
          price: faker.commerce.price(),
          createdAt: serverTimestamp(),
        };

        await addDoc(itemsRef, newItem);
        console.log("Added new item successfully!");
      } catch (error) {
        console.error("Error adding item:", error);
      }
    };

    const itemsRef = collection(db, "list");
    // construct query for retrieving dat
    const q = query(itemsRef);

    console.log(q);
    console.log(itemsRef);

    // set up real time listener for changes
    unsubscribe = onSnapshot(q, (snapshot) => {
      itemsList.innerHTML = "";
      snapshot.docs.forEach((_doc) => {
        const item = _doc.data();
        const itemElement = document.createElement("li");
        itemElement.innerHTML = `
            <div class="product-info">
                <div>
                    <span class="product-name">${item.item}</span>
                    <span class="product-price">$${item.price}</span>
                </div>
                <div class="product-actions">
                  <button class="edit-btn">Edit</button>
                  <button class="delete-btn">Delete</button>
                </div>
            </div>
        `;

        const deleteBtn = itemElement.querySelector(".delete-btn");
        deleteBtn.onclick = async () => {
          try {
            await deleteDoc(_doc.ref);
            console.log("Item deleted successfully!");
          } catch (error) {
            console.error("Error deleting item:", error);
          }
        };

        const editBtn = itemElement.querySelector(".edit-btn");
        editBtn.onclick = () => {
          editModal.style.display = "block";
          editForm.dataset.docId = _doc.id;
          editForm.dataset.ref = _doc.ref;
          document.getElementById("editItem").value = item.item;
          document.getElementById("editPrice").value = item.price;
        };

        itemsList.appendChild(itemElement);
      });
    });
  } else {
    if (unsubscribe) {
      unsubscribe();
    }
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    userDetails.innerHTML = "";
  }
});
