# Chapter 3: Understanding Firestore

## What is Firestore?

Firestore is Firebase's modern NoSQL document database. It's designed to be:

- Fast and scalable
- Real-time by default
- Secure with flexible rules
- Available offline
- Easy to use with intuitive data model

## Data Model

### Documents and Collections

Firestore organizes data into **Collections** and **Documents**:

```
users (collection)
  └── user123 (document)
        ├── name: "John Doe"
        ├── email: "john@example.com"
        └── items (sub-collection)
              ├── item1 (document)
              └── item2 (document)
```

### Document Structure

Documents are like JSON objects:

```javascript
{
  id: "user123",  // Document ID
  name: "John Doe",
  email: "john@example.com",
  createdAt: timestamp,
  isActive: true,
  tags: ["shopping", "groceries"]
}
```

## Data Types

Firestore supports various data types:

```javascript
{
  string: "Hello",
  number: 42,
  boolean: true,
  timestamp: Timestamp,
  geoPoint: GeoPoint,
  array: ["a", "b", "c"],
  map: {
    nested: "value"
  },
  null: null
}
```

## Setting Up Firestore

1. Initialize in your app:

```javascript
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);
```
