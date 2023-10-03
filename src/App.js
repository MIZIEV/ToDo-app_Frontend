import TodoList from './components/Todos/TodoList';
import TodoForm from './components/Todos/TodoForm';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import LoginComponent from './components/auth/LoginComponent';
import RegisterComponent from './components/auth/RegisterComponent';
import HeaderComponent from './components/UI/HeaderComponent';
import FooterComponent from './components/UI/FooterComponent';
import { isUserLoggedIn } from './services/AuthService';
import TodoDetails from './components/Todos/TodoDetails';

function App() {

  function AuthenticateRoute({ children }) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    } else {
      <Navigate to="/" />
    }
  }

  return (

    <div className='App'>
      <BrowserRouter>

        <HeaderComponent />

        <Routes>
          <Route path='/' element={<LoginComponent />} />


          <Route path='/todos/:username' element={
            <AuthenticateRoute>
              <TodoList />
            </AuthenticateRoute>
          } />

          <Route path='/add-todo/' element={
            <AuthenticateRoute>
              <TodoForm />
            </AuthenticateRoute>
          } />



          <Route path='/todo-details/:todoUniqueKey' element={
            <AuthenticateRoute>
              <TodoDetails />
            </AuthenticateRoute>
          } />


          <Route path='/update-todo/:todoUniqueKey' element={
            <AuthenticateRoute>
              <TodoForm />
            </AuthenticateRoute>
          } />

          <Route path='/login' element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />

        </Routes>

        <FooterComponent />
      </BrowserRouter>

    </div>
  );
}

export default App;