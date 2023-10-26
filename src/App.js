import TaskList from './components/task_components/TaskList';
import TaskForm from './components/task_components/TaskForm';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import LoginComponent from './components/auth/LoginComponent';
import RegisterComponent from './components/auth/RegisterComponent';
import HeaderComponent from './components/other_components/HeaderComponent';
import FooterComponent from './components/other_components/FooterComponent';
import { isUserLoggedIn } from './services/AuthService';
import TaskDetails from './components/task_components/TaskDetails';
import ArchiveListComponent from './components/task_components/ArchiveListComponent';
import ProfileComponent from './components/other_components/ProfileComponent';
import EditProfileComponent from './components/other_components/EditProfileComponent';
import { ToastContainer } from 'react-toastify';

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

          <Route path='/tasks/:username' element={
            <AuthenticateRoute>
              <TaskList />
            </AuthenticateRoute>
          } />

          <Route path='/tasks-completed/:username' element={
            <AuthenticateRoute>
              <ArchiveListComponent />
            </AuthenticateRoute>
          } />

          <Route path='/add-task/' element={
            <AuthenticateRoute>
              <TaskForm />
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

          <Route path='/task-details/:taskUniqueKey' element={
            <AuthenticateRoute>
              <TaskDetails />
            </AuthenticateRoute>
          } />


          <Route path='/update-task/:taskUniqueKey' element={
            <AuthenticateRoute>
              <TaskForm />
            </AuthenticateRoute>
          } />

          <Route path='/login' element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />

        </Routes>

        <FooterComponent />
      </BrowserRouter>

      <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />
    </div>
  );
}

export default App;