import { useState, useEffect } from "react";
import { addTodo, getTodos, deleteTodo, updateTodo } from "./db";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const storedTodos = await getTodos();
    setTodos(
      storedTodos.filter((todo) => typeof todo.id === "number") as Todo[]
    );
  };

  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    const todo: Todo = { id: Date.now(), text: newTodo, completed: false };
    await addTodo(todo);
    setNewTodo("");
    loadTodos();
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    loadTodos();
  };

  const toggleComplete = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    await updateTodo(id, { completed: !todo.completed });
    loadTodos();
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a task..."
      />
      <button onClick={handleAdd}>Add</button>
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
};
export default App;
