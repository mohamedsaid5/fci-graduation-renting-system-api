import React, { useState } from 'react';
import './Forget_password.css';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);

      const response = await fetch('http://54.161.17.51:8000/api/request-reset-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      setIsLoading(false);
      if (!response.ok) {
        throw new Error('Failed to request password reset');
      }

      setSuccessMessage('Password reset link sent successfully!');
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error.message);
      setError('Failed to request password reset. Please try again.');
    }
  };

  return (
    <div className='email_link'> 
      <div className="small_container">
        <div className="header">
          <h2>Welcome To Renting System</h2>
        </div>
        <div className="header_link_containar">
          <p>Enter your email address and we will send you a link to set your password.</p>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="mail">
              <label htmlFor="mail">Email:</label>
              <input type="email" name="email" id="mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="sing_in_btn" style={{display: 'flex', alignItems: 'center'}}>
              <button className='sing_btn' type="submit" disabled={isLoading} style={isLoading ? { background: '#9ad9b5' } : {}}>{isLoading ? 'Sending...' : 'Send Reset Link'}</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
