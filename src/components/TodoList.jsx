import React from "react";
import TodoItem from "./TodoItem.jsx";

function TodoList({ todos, deleteTodo, editTodo, saveTodo, now }) {
  return (
    <div>
      {todos.length === 0 ? (
        <p>No notes yet. Add one!</p>

      ) : (
        todos.map((todo) => (

          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            saveTodo={saveTodo}
            now={now}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;
