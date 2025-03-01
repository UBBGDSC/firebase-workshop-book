# Chapter 4: Reading Records from Firestore

In this chapter, we'll learn how to read and display shopping list items from Firestore in real-time.

## Setting Up the UI

First, let's add the shopping list section to our `index.html`:

```html
<section id="whenSignedIn" hidden="true">
  <!-- Previous auth content -->

  <section class="shopping-list">
    <button id="addRandomThing">Add Random Product</button>
    <ul id="thingsList"></ul>
  </section>
</section>
```

## Implementing Real-time Data Reading

Update your `app.js` to include Firestore functionality:

```javascript
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const db = getFirestore(app);
const itemsList = document.getElementById("itemsList");
let unsubscribe;

onAuthStateChanged(auth, (user) => {
  if (user) {
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = `
      <img src="${user.photoURL}" alt="User photo">
      <p>Hello ${user.displayName}!</p>
      <p>Email: ${user.email}</p>
      `;

    const itemsRef = collection(db, "list");
    // construct query for retrieving dat
    const q = query(itemsRef);

    // set up real time listener for changes
    unsubscribe = onSnapshot(q, (snapshot) => {
      itemsList.innerHTML = "";
      snapshot.docs.forEach((doc) => {
        const item = doc.data();
        const itemElement = document.createElement("li");
        itemElement.innerHTML = `
            <div class="product-info">
                <div>
                    <span class="product-name">${item.item}</span>
                    <span class="product-price">$${item.price}</span>
                </div>
            </div>
        `;
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
```

## Understanding Real-time Updates

Let's break down the key concepts of real-time data reading:

1. **Collection Reference**:

   ```javascript
   listRef = collection(db, "list");
   ```

Creates a reference to the 'list' collection in Firestore.

2. **Query Creation**:

   ```javascript
   const q = query(listRef);
   ```

   Creates a query that retrieves all items from the 'list' collection.

3. **Real-time Listener**:

   ```javascript
   onSnapshot(q, (snapshot) => {
     // Update UI with new data
   });
   ```

   - Sets up a real-time connection to Firestore
   - Automatically updates the UI when data changes
   - Returns an unsubscribe function

4. **Cleanup**:
   ```javascript
   if (unsubscribe) {
     unsubscribe();
   }
   ```
   Removes the listener when the user signs out to prevent memory leaks.

## Adding a New Item

HTML

```html
<section id="whenSignedIn" hidden="true">
  <button id="signOutButton">Sign out</button>
  <div id="userDetails"></div>
  <section class="shopping-list">
    <button id="addRandomItem">Add Random Product</button>
    <ul id="itemsList"></ul>
  </section>
</section>
```

```javascript
import { faker } from "https://esm.sh/@faker-js/faker";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// keep code from previous section

onAuthStateChanged(auth, (user) => {
  if (user) {
    // keep code from previous section
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
        console.error("Error adding thing:", error);
      }
    };
  }
  // keep code from previous section
});
```
