import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TodoForm from './components/Todos/TodoForm';
import TodoList from './components/Todos/TodoList';
import TodosActions from './components/Todos/TodosAcions';

import './App.css';

const URL_PUT = "http://localhost:8080/api/add";
const URL_GET = "http://localhost:8080/api/todos"

function App() {

  const [todos, setTodos] = useState([]);

  const addTodoHandler = (text) => {

    const newTodo = {
      text: text,
      isCompleted: false,
      id: uuidv4()
    }

    setTodos([...todos, newTodo]);

    /*fetch(URL_PUT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo)

    }).then(() => { console.log(URL) })
    console.log(JSON.stringify(newTodo))*/
  }


  useEffect(() => {
    fetch(URL_GET)
      .then(response => response.json())
      .then(result => { setTodos(result) })
  }, [])



  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodoHandler = (id) => {
    setTodos(todos.map((todo) => {
      return todo.id === id
        ? {
          ...todo, isCompleted: !todo.isCompleted
        } : { ...todo }
    }))
  }

  const resetTodosHandler = () => {
    setTodos([]);
  }

  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted))
  }

  const completedTodosCount = todos.filter((todo) => todo.isCompleted).length

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