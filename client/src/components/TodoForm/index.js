import React, { useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../Todo/style.css";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const handleChange = event => {
    setInput(event.target.value);
  }

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    //if statement to chekc if everyhting is filled out
    // if (todoEnable && date) {
    //     props.
    // }

    // if (!todoEnable && date) {
    //     props.onSubmit({
    //         id: Math.floor(Math.random() * 10000),
    //         text: input
    //     })
    // }
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </>
      ) : (
          <>
            <input
              placeholder="Add a todo"
              value={input}
              onChange={handleChange}
              name="text"
              className="todo-input"
              ref={inputRef}
            />
            <button
              onClick={handleSubmit}
              className="todo-button"
            >
              Add todo
          </button>
          </>
        )}
      <label>
        <div className="date-error" />
      </label>
    </form>
  );
}

export default TodoForm;
