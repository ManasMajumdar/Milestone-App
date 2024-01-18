import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { setOwner } from '../Redux/ownerSlice';
import { getAllProjectsByOwner } from '../Redux/projectSlice';
import baseURL from '../api';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const dispatch = useDispatch();

  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    if (isLoading) {
      return;
    }
  
    setIsLoading(true);
  
    if (!loginDetail.email.trim() || !loginDetail.password.trim()) {
      setErrorMessage("Please enter both email and password.");
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await fetch(`${baseURL}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(loginDetail),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
  
        if (response.status === 400) {
          setErrorMessage("Incorrect email or password 🙄. Please try again. 🙂");
        } else if (response.status === 500) {
          setErrorMessage("Internal Server Error ☹️");
        } else {
          setErrorMessage(`Error: ${response.status} - ${errorData.message}`);
        }
  
        onLogin(false);
      } else {
        const data = await response.json();
  
        localStorage.setItem("token", data.token);
        onLogin(true);
        console.log("JWT Token:", data.token);
  
        if (data.role === "ADMIN") {
          navigate("/home");
        } else {
          dispatch(setOwner(data?.email));
          // dispatch(getAllProjectsByOwner(data.email));
          navigate("/user-page");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please check your network connection and try again.");
      onLogin(false);
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
    <>
    <div className='login template d-flex justify-content-center align-items-center vh-100 bg-primary'>
      <div className='form_container p-5 rounded bg-white'>
        <form onSubmit={handleFormSubmit}>
          <h3 className='text-center'>Sign In</h3>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='Enter Email'
              className='form-control'
              value={loginDetail.email}
              onChange={(e) => handleChange(e, 'email')}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              placeholder='Enter Password'
              className='form-control'
              value={loginDetail.password}
              onChange={(e) => handleChange(e, 'password')}
            />
          </div>
          <div className='d-grid'>
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Signing in...' : 'Login'}</Button>
            {errorMessage && (
              <div className="alert alert-danger mt-2" role="alert">
                {errorMessage}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
    </>
    
  );
}

export default Login;

