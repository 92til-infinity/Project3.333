import React, { useState } from 'react';
import TodoForm from '../TodoForm';
import Todo from '../Todo';
import TodoCompleted from "../TodoCompleted";
import axios from 'axios';
import '../Todo/style.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardGroup,
  MDBContainer,
} from 'mdbreact';

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    return axios.post('/api/todos', todo);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
    return axios.post('/api/todos', newValue);
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const removeCompletedTodo = (id) => {
    const removeArr = [...completedTodos].filter((todo) => todo.id !== id);
    setCompletedTodos(removeArr);
  };

  const completeTodo = (id, todo) => {
    // let updatedTodos = todos.map((todo) => {
    //   if (todo.id === id) {
    //     todo.isComplete = !todo.isComplete;
    //   }
    //   return todo;
    // });
    const newCompletedTodos = [todo, ...completedTodos];
    if (todo.id === id) {
      setIsComplete({ isComplete: !todo.isComplete })
    }
    setCompletedTodos(newCompletedTodos);
    // setTodos(updatedTodos);
    removeTodo(id);
  };

  const revertCompletedTodo = (id, todo) => {
    console.log("reverting completed todo");
    const removeCompletedTodos = [todo, ...todos];
    if (todo.id === id) {
      setIsComplete({ isComplete: !todo.isComplete })
    }
    setTodos(removeCompletedTodos, ...todos);
    console.log(todos);
    removeTodo(id);
  }

  return (
    <div className="body">
      <div>
        <h1 style={{ color: "black" }}>What's the plan today?</h1>
        <TodoForm onSubmit={addTodo} />

        <MDBContainer>
          <MDBCardGroup deck>
            <MDBCard>
              <MDBCardTitle tag='h5' className="p-4">
                Todos
            </MDBCardTitle>
              <MDBCardBody
                className="align-self-center"
              >
                <Todo
                  todos={todos}
                  completeTodo={completeTodo}
                  removeTodo={removeTodo}
                  updateTodo={updateTodo}
                />

              </MDBCardBody>
            </MDBCard>

            <MDBCard>
              <MDBCardTitle tag='h5' className="p-4">
                Completed Todos
            </MDBCardTitle>
              <MDBCardBody className="align-self-center">
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
