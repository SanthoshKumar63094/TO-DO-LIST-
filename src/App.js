import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo.jsx";
import TodoList from "./components/TodoList.jsx";
import "./App.css";

function App() {
  // Load from localStorage OR start with an empty array
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Keep a ticking clock so overdue/pending UI updates automatically
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000); // update every 30s
    return () => clearInterval(id);
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add a new todo (with dueAt ISO string from datetime-local)
  const addTodo = (text, dueAt) => {
    const newTodo = { id: Date.now(), text, dueAt, isEditing: false, completed: false };
    setTodos([...todos, newTodo]);
  };

  // Toggle todo completion status
  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Enable editing mode
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo
      )
    );
  };

  // Save edited text
  const saveTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
      )
    );
  };

  return (
    <div className="container">
      <div className="App">
        <h1> Todo List </h1>
        <AddTodo addTodo={addTodo} />
        <div className="todo-container">
          <div className="todo-column">
            <h2>Active Tasks</h2>
            <TodoList 
              todos={todos.filter(todo => !todo.completed)} 
              deleteTodo={deleteTodo} 
              editTodo={editTodo} 
              saveTodo={saveTodo} 
              toggleComplete={toggleComplete}
              now={now} 
            />
          </div>
          <div className="todo-column">
            <h2>Completed</h2>
            <TodoList 
              todos={todos.filter(todo => todo.completed)} 
              deleteTodo={deleteTodo} 
              editTodo={editTodo} 
              saveTodo={saveTodo} 
              toggleComplete={toggleComplete}
              now={now} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
