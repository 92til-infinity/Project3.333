import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import "./style.css";

function TodoCompleted({
  completedTodos,
  removeCompletedTodo,
  revertCompletedTodo,
}) {
  return completedTodos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
      id="completedDiv"
    >
      <div key={todo.id} onClick={() => revertCompletedTodo(todo.id, todo)}>
        {todo.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeCompletedTodo(todo.id)}
          className="delete-icon"
        />
      </div>
    </div>
  ));
}

export default TodoCompleted;
