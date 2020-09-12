<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import DatePicker from "../DatePicker";
import "../Todo/style.css";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [showDate, setShowDate] = useState(false);
  const [todoEnable, setTodoEnable] = useState(true);
  const [date, setDate] = useState({
    startDate: new Date(),
  });
  const [dateOpen, setDateOpen] = useState(false);
=======
import React, { useState, useEffect, useRef } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Todo/style.css";

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : "");
    const [showDate, setShowDate] = useState(false);
    const [todoEnable, setTodoEnable] = useState(true);
    const [date, setDate] = useState({
        startDate: new Date()
    })

    const [dateOpen, setDateOpen] = useState(false);


    const handleDateChange = date => {
        setDate({
            startDate: date
        })
        setTodoEnable(false);
    }
>>>>>>> master

  const handleDateChange = (date) => {
    console.log(date);
    setDate({
      startDate: date,
    });
    setTodoEnable(false);
  };

  const handleDoDate = (e) => {
    e.preventDefault();
    setShowDate(true);
    setTodoEnable(false);
    setDateOpen(true);
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

    const handleSubmit = event => {
        event.preventDefault();
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input,
            date: date
        })
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
        setTodoEnable(true);
        setShowDate(false);
        setInput("");
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      date: date,
    });
    setTodoEnable(true);
    setShowDate(false);
    setInput("");
  };

    return (
        <form onSubmit={handleSubmit} className='todo-form'>
            {props.edit ? (
                <>
                    <input
                        placeholder='Update your item'
                        value={input}
                        onChange={handleChange}
                        name='text'
                        ref={inputRef}
                        className='todo-input edit'
                    />
                    <button onClick={handleSubmit} className='todo-button edit'>
                        Update
              </button>
                </>
            ) : (
                    <>
                        <input
                            placeholder='Add a todo'
                            value={input}
                            onChange={handleChange}
                            name='text'
                            className='todo-input'
                            ref={inputRef}
                        />
                        <label>
                            <button
                                onClick={handleDoDate}
                                className='due-date-button'>
                                Due Date
                                {showDate &&
                                    <DatePicker
                                        open={dateOpen}
                                        onClickOutside={() => setDateOpen(false)}
                                        selected={date.startDate}
                                        onChange={handleDateChange}
                                        value={date}
                                        popperModifiers={{
                                            enabled: true
                                        }}
                                    />
                                }
                            </button>

                        </label>
                        <button
                            disabled={todoEnable}
                            onClick={handleSubmit}
                            className='todo-button'>
                            Add todo
                        </button>
                    </>
                )}
            <label>
                <div className="date-error">

                </div>
            </label>
        </form>
    );
}

export default TodoForm;
