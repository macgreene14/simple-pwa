import { openDB } from "idb";

const DB_NAME = "todoDB";
const STORE_NAME = "todos";

// Open or create the database
const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
    }
  },
});

export const addTodo = async (todo) => {
  const db = await dbPromise;
  return db.add(STORE_NAME, todo);
};

export const getTodos = async () => {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
};

export const deleteTodo = async (id) => {
  const db = await dbPromise;
  return db.delete(STORE_NAME, id);
};

export const updateTodo = async (id, updates) => {
  const db = await dbPromise;
  const todo = await db.get(STORE_NAME, id);
  if (!todo) return;
  Object.assign(todo, updates);
  return db.put(STORE_NAME, todo);
};
