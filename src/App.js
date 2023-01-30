import { useState } from 'react';

import TodoForm from './components/Todos/TodoForm';
import TodoList from './components/Todos/TodoList';
import './App.css';

function App() {

  const [todos, setTodos] = useState(['todo one', 'todo two', 'todo three']);

  return (
    <div className="App">
      <h1>Todo app</h1>
      <TodoForm />
      <TodoList todos={todos} />

    </div>
  );
}

export default App;
