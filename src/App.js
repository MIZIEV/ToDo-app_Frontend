import TodoList from './components/Todos/TodoList';
import TodoForm from './components/Todos/TodoForm';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import LoginComponent from './components/auth/LoginComponent';
import RegisterComponent from './components/auth/RegisterComponent';
import HeaderComponent from './components/other_components/HeaderComponent';
import FooterComponent from './components/other_components/FooterComponent';
import { isUserLoggedIn } from './services/AuthService';
import TodoDetails from './components/Todos/TodoDetails';
import ArchiveListComponent from './components/Todos/ArchiveListComponent';
import ProfileComponent from './components/other_components/ProfileComponent';
import EditProfileComponent from './components/other_components/EditProfileComponent';

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

          <Route path='/todos-completed/:username' element={
            <AuthenticateRoute>
              <ArchiveListComponent />
            </AuthenticateRoute>
          } />

          <Route path='/add-todo/' element={
            <AuthenticateRoute>
              <TodoForm />
            </AuthenticateRoute>
          } />

          <Route path='/profile/:username' element={
            <AuthenticateRoute>
              <ProfileComponent />
            </AuthenticateRoute>
          } />

          <Route path='/profile/update/:username' element={
            <AuthenticateRoute>
              <EditProfileComponent />
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