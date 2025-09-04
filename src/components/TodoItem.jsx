import React, { useState } from "react";

function TodoItem({ todo, deleteTodo, editTodo, saveTodo, toggleComplete, now }) {
  const [newText, setNewText] = useState(todo.text);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveTodo(todo.id, newText.trim());
    }
  };

  // Prepare due date label (optional)
  const hasDue = !!todo.dueAt;
  const dueDate = hasDue ? new Date(todo.dueAt) : null;
  const dueLabel = hasDue
    ? dueDate.toLocaleDateString(undefined, { month: "short", day: "2-digit" })
    : "";

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        className="todo-checkbox"
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      />
      <div className="todo-content">
        {todo.isEditing ? (
          <input
            className="todo-input"
            type="text"
            autoFocus
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => saveTodo(todo.id, newText.trim())}
          />
        ) : (
          <>
            <div className="todo-text">
              {todo.text}
              {hasDue && (
                <div className="todo-meta">
                  <span className="due-small">Due: {dueLabel}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {!todo.isEditing && (
        <div className="todo-actions">
          <button 
            className="btn btn-edit" 
            onClick={() => editTodo(todo.id)}
            aria-label="Edit todo"
          >
            Edit
          </button>
          <button 
            className="btn btn-delete" 
            onClick={() => deleteTodo(todo.id)}
            aria-label="Delete todo"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
