import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Create from './component/Create'
import Home from './component/Home'
import Update from './component/Update'
import Read from './component/Read'
import 'bootstrap/dist/css/bootstrap.min.css'
import Email from './component/Email'
import Login from './LandingPage/Login'
import Signup from './LandingPage/Signup'
import UserDashboard from './Dashboard/UserDashboard'
import ProjectPage from './Project/AddProjectPage'
import { Provider } from 'react-redux'
import store from './Redux/store'
import UpdateProjectPage from './Project/UpdateProject'
import OnlyUserCanSee from './Dashboard/OnlyUserCanSee'
import UpdateProjectPageForUser from './Project/UpdateProjectPageForUser'
import AddProjectPageForUser from './Project/AddProjectPageForUser'
import PrivateRoute from './PrivateRoute'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuthState = sessionStorage.getItem("isAuthenticated");
    return storedAuthState ? JSON.parse(storedAuthState) : false;
  });

  useEffect(() => {
    sessionStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const location = useLocation();
 
  useEffect(() => {
    const isLoginPage = location.pathname === "/";
   
    if (isLoginPage) {
      sessionStorage.clear();
      setIsAuthenticated(false);
    }
  }, [location.pathname]);
 
  const handleLogin = (value) => {
    setIsAuthenticated(value);
  };
 
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Provider store={store}>
        <Routes>
          <Route path='/login' element={<Login onLogin={handleLogin} />} />
          <Route path='/' element={<Login onLogin={handleLogin} />} />
          <Route path='/signup' element={<Signup />} />

          {/* Private routes using isAuthenticated */}
          <Route path='/home' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Home handleLogout={handleLogout} />} />} />

          <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Create />} />} />
          <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Update />} />} />
          <Route path='/read/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Read />} />} />
          <Route path='/email' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Email />} />} />
          <Route path='/user' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<UserDashboard />} />} />
          <Route path='/project' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<ProjectPage />} />} />
          <Route path='/user/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<UpdateProjectPage />} />} />
          <Route path="/user-page" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<OnlyUserCanSee />} />} />
          <Route path='/user-page/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<UpdateProjectPageForUser />} />} />
          <Route path='/project-page' element={<PrivateRoute isAuthenticated={isAuthenticated} element={<AddProjectPageForUser />} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </Provider>
  );
}

export default App;
