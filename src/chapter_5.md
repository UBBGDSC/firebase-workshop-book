# Chapter 5: Deleting Records from Firestore

In this chapter, we'll implement the functionality to delete items from our shopping list.

## Adding Delete UI Elements

First, let's update our shopping list item template in `app.js` to include a delete button:

```javascript
import { deleteDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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
                  <button class="delete-btn">Delete</button>
                </div>
            </div>
        `;

  const deleteBtn = itemElement.querySelector(".delete-btn");
  deleteBtn.onclick = async () => {
    try {
      const docRef = doc(db, "list", _doc.id);
      await deleteDoc(docRef);
      console.log("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  itemsList.appendChild(itemElement);
});
```

## Understanding Delete Operations

Let's break down the key concepts of deleting documents:

1. **Document Reference**:

   ```javascript
   doc.ref;
   ```

   References the specific document in Firestore.

2. **Delete Operation**:

   ```javascript
   await deleteDoc(doc.ref);
   ```

   Permanently removes the document from Firestore.

3. **Error Handling**:
   ```javascript
   try {
     await deleteDoc(doc.ref);
     console.log("Deleted successfully!");
   } catch (error) {
     console.error("Error deleting document:", error);
   }
   ```
   Handles potential errors during deletion.

## Batch Deletes

For deleting multiple items at once, you can use batch operations:

```javascript
import { writeBatch } from "firebase/firestore";

async function deleteMultipleItems(docIds) {
  const batch = writeBatch(db);

  docIds.forEach((id) => {
    const docRef = doc(db, "things", id);
    batch.delete(docRef);
  });

  try {
    await batch.commit();
    console.log("Batch delete successful!");
  } catch (error) {
    console.error("Error in batch delete:", error);
  }
}
```

In the next chapter, we'll learn how to update records in our shopping list.
