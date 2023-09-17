import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TodoForm from './components/Todos/TodoForm';
import TodoList from './components/Todos/TodoList';
import TodosActions from './components/Todos/TodosAcions';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import LoginComponent from './components/auth/LoginComponent';
import RegisterComponent from './components/auth/RegisterComponent';

const URL_PUT = "http://localhost:8080/api/add";
const URL_GET = "http://localhost:8080/api/todos";
const URL_UPDATE = "http://localhost:8080/api/todo/";
const URL_DELETE_ALL = "http://localhost:8080/api/todos/delete";
const URL_DELETE_COMPLETED_TODOS = "http://localhost:8080/api/todos/delete_completed";

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
    })
  }

  /*useEffect(() => {
    fetch(URL_GET)
      .then(response => response.json())
      .then(result => { setTodos(result) })
  }, [])*/

  const deleteTodoHandler = (todoUniqueKey) => {
    setTodos(todos.filter((todo) => todo.todoUniqueKey !== todoUniqueKey))

    fetch(URL_UPDATE + todoUniqueKey, {
      method: "DELETE",
    })

  }

  const toggleTodoHandler = (todoUniqueKey) => {

    setTodos(todos.map((todo) => {
      return todo.todoUniqueKey === todoUniqueKey ? { ...todo, completed: !todo.completed } : { ...todo }
    }))

    todos.map((todo) => {
      if (todo.todoUniqueKey === todoUniqueKey) {

        const updatedTodo = {
          ...todo,
          completed: !todo.completed
        }

        fetch(URL_UPDATE + todoUniqueKey, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTodo)
        })
      }
    })
  }

  const resetTodosHandler = () => {

    fetch(URL_DELETE_ALL, {
      method: "DELETE",
    })
    setTodos([])
  }

  const deleteCompletedTodosHandler = () => {

    fetch(URL_DELETE_COMPLETED_TODOS, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todos.filter((todo) => todo.completed))
    })

    setTodos(todos.filter((todo) => !todo.completed))
  }

  const completedTodosCount = todos.filter((todo) => todo.completed).length




  return (

    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
      </BrowserRouter>

    </div>

    /*
        { old logic, I'll keep it for now 
    
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
        </div>}
    */


  );
}

export default App;