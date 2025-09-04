import React, { useState } from "react";

function AddTodo({ addTodo }) {
  const [text, setText] = useState("");
  const [dueAt, setDueAt] = useState(""); // optional due date (YYYY-MM-DD)

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      // pass null when no date selected
      addTodo(trimmed, dueAt ? new Date(dueAt).toISOString() : null);
      setText("");
      setDueAt("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-form" aria-label="Add a todo">
      <input
        className="add-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your note..."
        aria-label="Todo text"
      />
      <input
        className="date-input"
        type="date"
        value={dueAt}
        onChange={(e) => setDueAt(e.target.value)}
        aria-label="Due date (optional)"
      />
      <button type="submit" className="add-button">
        Add
      </button>
    </form>
  );
}

export default AddTodo;
