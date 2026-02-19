import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

export default function App() {
  // Load todos from localStorage (or start with empty array)
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all"); // all, active, completed

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ➕ Add a new todo
  function addTodo(text) {
    const newTodo = {
      id: Date.now(),        // unique ID
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  }

  // ✅ Toggle complete/incomplete
  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  }

  // ❌ Delete a todo
  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  // 🗑️ Clear all completed
  function clearCompleted() {
    setTodos(todos.filter(todo => !todo.completed));
  }

  // 🔍 Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all"
  });

  // 📊 Count remaining
  const remaining = todos.filter(todo => !todo.completed).length;

  return (
    <div className="app">
      <h1>📝 Todo List</h1>

      <TodoForm onAdd={addTodo} />

      {/* Filter Buttons */}
      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      {/* Footer Stats */}
      <div className="footer">
        <p>{remaining} task{remaining !== 1 ? "s" : ""} remaining</p>
        {todos.some(t => t.completed) && (
          <button onClick={clearCompleted} className="clear-btn">
            Clear Completed 🗑️
          </button>
        )}
      </div>
    </div>
  );
}