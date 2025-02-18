import { useState, useEffect } from "react";
import { addTodo, getTodos, deleteTodo, updateTodo } from "./db";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const storedTodos = await getTodos();
    setTodos(storedTodos);
  };

  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    const todo = { text: newTodo, completed: false };
    await addTodo(todo);
    setNewTodo("");
    loadTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((t) => t.id === id);
    await updateTodo(id, { completed: !todo.completed });
    loadTodos();
  };

  return (
    <div className="app">
      <h1>Todo PWA</h1>
      <div className="input-container">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <span onClick={() => toggleComplete(todo.id)}>{todo.text}</span>
            <button onClick={() => handleDelete(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
