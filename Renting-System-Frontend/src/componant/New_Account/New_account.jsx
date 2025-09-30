import React, { useState } from 'react';
import '../New_Account/new_account.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import fetchData from '../../func/fetch';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
    user_type: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showpassword2, setShowpassword2] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let { message, error_status } = await fetchData(
      'auth/register/',
      formData,
      'Registration failed. Please try again.'
    );
    
    setIsLoading(false);

    if (!error_status) return navigate('/Sign_in');
    setError(message);
  };

  return (
    <div className='SignIn'>
      <div className="small_container">
        <div className="header">
          <h2>Welcome To Renting System</h2>
        </div>
        <div className="header_link">
          <a href="sign_in">Sing In</a>
          <a href="New_account">Register</a>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="Username">
              <label htmlFor="user"> Username:</label>
              <input type="text" name="username" id="user" value={formData.username} onChange={handleChange} />
            </div>
            <div className="first_name">
              <label htmlFor="first"> First Name:</label>
              <input type="text" name="first_name" id="first" value={formData.first_name} onChange={handleChange} />
            </div>
            <div className="last_name">
              <label htmlFor="last"> Last Name:</label>
              <input type="text" name="last_name" id="last" value={formData.last_name} onChange={handleChange} />
            </div>
            <div className="mail">
              <label htmlFor="mail"> Email:</label>
              <input type="email" name="email" id="mail" value={formData.email} onChange={handleChange} />
            </div>
            <div className="pass">
              <label htmlFor="password"> Password:</label>
              <input type={showPassword ? "text" : "password"} name="password" id="password" value={formData.password} onChange={handleChange} />
              <span className='eye' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="pass">
              <label htmlFor="password2"> Confirm Password:</label>
              <input type={showpassword2 ? "text" : "password"} name="password2" id="password2" value={formData.password2} onChange={handleChange} />
              <span className='eye' onClick={() => setShowpassword2(!showpassword2)}>
                {showpassword2 ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="radio_buttons">
              <label htmlFor="student">Student</label>
              <input type="radio" name="user_type" id="student" value="student" defaultChecked onChange={handleChange} />
              <label htmlFor="renter">Owner</label>
              <input type="radio" name="user_type" id="renter" value="owner" onChange={handleChange} />
            </div>
            <div className="sign_in_btn">
              <button disabled={isLoading} className='sing_btn' type="submit" style={isLoading ? { background: '#9ad9b5' } : {}}>
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

