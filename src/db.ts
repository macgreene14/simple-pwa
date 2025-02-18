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

export type Todo = {
  id?: number;
  text: string;
  completed: boolean;
};

export const addTodo = async (todo: Todo): Promise<number> => {
  const db = await dbPromise;
  const key = await db.add(STORE_NAME, todo);
  if (typeof key !== 'number') {
    throw new Error("Unexpected key type. Expected number but got " + typeof key);
  }
  return key;
};


export const getTodos = async (): Promise<Todo[]> => {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
};

export const deleteTodo = async (id: number): Promise<void> => {
  const db = await dbPromise;
  return db.delete(STORE_NAME, id);
};

export const updateTodo = async (id: number, updates: Partial<Todo>): Promise<IDBValidKey> => {
  const db = await dbPromise;
  const todo = await db.get(STORE_NAME, id);
  if (!todo) {
    throw new Error(`Todo with id ${id} not found.`);
  }
  Object.assign(todo, updates);
  return db.put(STORE_NAME, todo);
};
