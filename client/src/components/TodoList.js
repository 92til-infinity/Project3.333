import React from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";



export default class TodoList extends React.Component {
    state = {
        todos: [],
        todosToShow: "all",
        toggleAllComplete: true
    };

    addTodo = (todo) => {
        this.setState({
            todos: [todo, ...this.state.todos]
        })
    }

    toggleComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    //Should update
                    return {
                        ...todo,
                        complete: !todo.complete
                    }
                } else {
                    return todo;
                }
            })
        })
    }

    updateTodoToShow = (string) => {
        this.setState({
            todosToShow: string
        })
    }

    handleDeleteTodo = (id) => {
        this.state({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    }

    removeAllCompleteTodos = () => {
        this.state({
            todos: this.state.todos.filter(todo => !todo.complete)
        })
    }
    render() {
        let todos = [];
        if (this.state.todosToShow === "all") {
            todos = this.state.todos;
        } else if (this.state.todosToShow === "active") {
            todos = this.state.todos.filter(todo => !todo.complete);
        } else if (this.state.todosToShow === "complete") {
            todos = this.state.todos.filter(todo => todo.complete);

            return (
                <div>
                    <TodoForm onSubmit={this.addTodo} />
                    {todos.map(todo => (
                        <Todo key={todo.id}
                            toggleComplete={() => this.toggleComplete(todo.id)}
                            onDelete={() => this.handleDeleteTodo(todo.id)}
                            todo={todo}
                        />
                    ))}
                    <div>
                        Active Todos: {this.state.todos.filder(todo => !todo.complete).length}
                    </div>
                    <div>
                        <button onClick={() => this.updateTodoToShow("all")}>All</button>
                        <button onClick={() => this.updateTodoToShow("active")}>Active</button>
                        <button onClick={() => this.updateTodoToShow("complete")}>Complete</button>
                    </div>
                    {this.state.todos.some(todo => todo.complete) ? <div>
                        <button onClick={this.removeAllCompleteTodos}>Remove all complete todos</button>
                    </div> : null}
                    <div>
                        <button onClick={() => this.setState({
                            todos: this.state.todos.map(todo => ({
                                ...todo,
                                complete: this.state.toggleAllComplete
                            })),
                            toggleAllComplete: !this.state.toggleAllComplete
                        })
                        }>Toggle All Complete: {`${this.state.toggleAllComplete}`}</button>
                    </div>
                </div>
            )
        }
    }
}