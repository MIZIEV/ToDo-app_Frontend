import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TodoForm from './components/Todos/TodoForm';
import TodoList from './components/Todos/TodoList';
import TodosActions from './components/Todos/TodosAcions';

import './App.css';

const URL_PUT = "http://localhost:8080/api/add";
const URL_GET = "http://localhost:8080/api/todos"
const URL_UPDATE = "http://localhost:8080/api/todo/"

function App() {

  const [todos, setTodos] = useState([]);

  const addTodoHandler = (text) => {

    const newTodo = {
      text: text,
      completed: false,
      todoUniqueKey: uuidv4()
    }

    setTodos([...todos, newTodo]);

    fetch(URL_PUT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo)

    }).then(() => { console.log(URL) })
    console.log(JSON.stringify(newTodo))
  }

  useEffect(() => {
    fetch(URL_GET)
      .then(response => response.json())
      .then(result => { setTodos(result) })
  }, [])

  const deleteTodoHandler = (todoUniqueKey) => {
    setTodos(todos.filter((todo) => todo.id !== todoUniqueKey))
  }

  const toggleTodoHandler = (todoUniqueKey) => {
    console.log("start toggle method")

    setTodos(todos.map((todo) => {
      return todo.todoUniqueKey === todoUniqueKey ? { ...todo, completed: !todo.completed } : { ...todo }
    }))
    console.log("all todos - " + todos)

    todos.map((todo) => {
      console.log("started query")
      if (todo.todoUniqueKey === todoUniqueKey) {

        const updatetTodo = {
          ...todo,
          completed: !todo.completed
        }
        fetch(URL_UPDATE + todoUniqueKey, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatetTodo)
        })
        console.log(JSON.stringify(updatetTodo))
      }
    })
  }

  const resetTodosHandler = () => {
    setTodos([]);
  }

  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const completedTodosCount = todos.filter((todo) => todo.completed).length

  return (
    <div className="App">
      <h1>Todo app</h1>
      <TodoForm addTodo={addTodoHandler} />

      {todos.length > 0 && <TodosActions
        completedTodosExists={!!completedTodosCount}
        resetTodos={resetTodosHandler}
        deleteCompletedTodos={deleteCompletedTodosHandler} />}

      <TodoList todos={todos} deleteTodo={deleteTodoHandler} toggleTodo={toggleTodoHandler} />

      {completedTodosCount > 0 && (
        <h3>{`You have completed ${completedTodosCount} ${completedTodosCount > 1 ? "todos" : "todo"}`}</h3>
      )}
    </div>
  );
}

export default App;