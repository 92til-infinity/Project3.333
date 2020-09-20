import React, { useState, useEffect } from "react";
import TodoForm from "../TodoForm";
import Todo from "../Todo";
import TodoCompleted from "../TodoCompleted";
import axios from "axios";
import "../Todo/style.css";
import API from "../../utils/API";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardGroup,
  MDBContainer,
} from "mdbreact";

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    return axios.post("/api/todos", todo);
  };

  useEffect(() => {
    API.getTodoStatus(false).then((todoList) => {
      setTodos(todoList.data);
    });
    API.getTodoStatus(true).then((todoList) => {
      setCompletedTodos(todoList.data);
    });
  }, []);

  // Update todo text in API and in Hook
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    API.updateTodo(todoId, newValue);
    setTodos(
      todos.map((item) => {
        if (item.id !== todoId) {
          return item;
        }
        return {
          ...item,
          text: newValue.text,
        };
      })
    );
  };

  // Delete an in progress Todo, remove from Hook
  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
    API.deleteTodo(id);
  };

  // Delete a completed Todo, remove from Hook
  const removeCompletedTodo = (id) => {
    const removeArr = [...completedTodos].filter((todo) => todo.id !== id);
    setCompletedTodos(removeArr);
    API.deleteTodo(id);
  };

  const completeTodo = (id, todo) => {
    const newCompletedTodos = [todo, ...completedTodos];
    setCompletedTodos(newCompletedTodos);
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
    API.updateTodo(id, { complete: true });
  };

  const revertCompletedTodo = (id, todo) => {
    const removeCompletedTodos = [todo, ...todos];
    setTodos(removeCompletedTodos);
    const removeArr = [...completedTodos].filter((todo) => todo.id !== id);
    setCompletedTodos(removeArr);
    API.updateTodo(id, { complete: false });
  };

  return (
    <div className="body">
      <div>
        <h1 style={{ color: "black" }}>What's the plan today?</h1>
        <TodoForm onSubmit={addTodo} />

        <MDBContainer>
          <MDBCardGroup deck>
            <MDBCard>
              <MDBCardTitle tag="h5" className="pt-4">
                Todos
              </MDBCardTitle>
              <hr />
              <MDBCardBody className="align-self-left">
                <Todo
                  todos={todos}
                  completeTodo={completeTodo}
                  removeTodo={removeTodo}
                  updateTodo={updateTodo}
                />
              </MDBCardBody>
            </MDBCard>

            <MDBCard>
              <MDBCardTitle tag="h5" className="pt-4">
                Completed Todos
              </MDBCardTitle>
              <hr />
              <MDBCardBody className="align-self-left">
                <TodoCompleted
                  completedTodos={completedTodos}
                  revertCompletedTodo={revertCompletedTodo}
                  removeCompletedTodo={removeCompletedTodo}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCardGroup>
        </MDBContainer>
      </div>
    </div>
  );
}

export default TodoPage;
