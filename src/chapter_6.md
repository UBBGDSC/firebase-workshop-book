# Chapter 6: Updating Records in Firestore

In this chapter, we'll implement the functionality to update existing items in our shopping list.

## Adding the Edit Modal

First, add the modal HTML to your `index.html`:

```html
<!-- Edit Modal -->
<section id="whenSignedIn" hidden="true">
  <button id="signOutButton">Sign out</button>
  <div id="userDetails"></div>
  <section class="shopping-list">
    <button id="addRandomItem">Add Random Product</button>
    <ul id="itemsList"></ul>
  </section>

  <div id="editModal" class="modal">
    <div class="modal-content">
      <span id="closeModal" class="close">&times;</span>
      <h2>Edit Product</h2>
      <form id="editForm">
        <div class="form-group">
          <label for="editItem">Item:</label>
          <input type="text" id="editItem" required />
        </div>
        <div class="form-group">
          <label for="editPrice">Price:</label>
          <input type="number" id="editPrice" step="0.01" min="0" required />
        </div>
        <button type="submit" class="save-btn">Save Changes</button>
      </form>
    </div>
  </div>
</section>
```

## Implementing Update Functionality

Update your imports in `app.js`:

```javascript
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

// Get modal elements
const editForm = document.getElementById("editForm");
const editModal = document.getElementById("editModal");
const closeModal = document.getElementById("closeModal");
```

## Adding Modal Controls

Add these event listeners to handle the modal:

```javascript
// Close modal when clicking outside
closeModal.onclick = () => {
  editModal.style.display = "none";
};
```

## Updating the Shopping List Item Template

Update the shopping list item template to include an edit button:

```javascript
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
    document.getElementById("editItem").value = item.item;
    document.getElementById("editPrice").value = item.price;
  };

  itemsList.appendChild(itemElement);
});
```

## Handling Form Submission

Add the form submission handler:

```javascript
editForm.onsubmit = async (e) => {
  e.preventDefault();
  const docId = editForm.dataset.docId;
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
```

## Understanding Update Operations

Let's break down the key concepts of updating documents:

1. **Document Reference**:

   ```javascript
   const docRef = doc(db, "things", docId);
   ```

   References the specific document to update.

2. **Update Operation**:

   ```javascript
   await updateDoc(docRef, {
     name,
     price,
     updatedAt: serverTimestamp(),
   });
   ```

   Updates only the specified fields.

3. **Timestamps**:
   ```javascript
   updatedAt: serverTimestamp();
   ```
   Adds a server-side timestamp to track when the document was last modified.

This concludes our Firebase workshop! You now have a fully functional shopping list application with authentication, real-time updates, and CRUD operations.
