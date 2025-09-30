import React, { useState } from 'react';
import './SetPassword.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import fetchData from '../../func/fetch';

export default function ForgetPassword() {

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [search] = useSearchParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async () => {
    
    const uidb64 = search.get('uidb64');
    const token = search.get('token');

    if(!token || !uidb64) return navigate('/forget_password');
    
    setIsLoading(true);

    const response = await fetchData(
      `password-reset/${uidb64}/${token}/`, 
    {
      new_password: password,
      re_new_password: passwordConfirmation,
    },
    'Failed to reset password. Please try again.'
    );

    setIsLoading(false);

    if(response?.error_status) return setError(response.message);

    navigate('/Sign_in');

  };

  return (
    <div className='email_link'> 
      <div className="small_container">
        <div className="header">
          <h2>Welcome To Renting System</h2>
        </div>
        <div className="header_link_containar">
          <p>Your new password must be different from previously used passwords.</p>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="pass">
              <label htmlFor="password">New Password:</label>
              <input
                placeholder='Enter Your Password'
                type={showPassword ? "text" : "password"}
                name="password" // Name this field accordingly
                value={password}
                onChange={({target}) => setPassword(target.value)}
              />
              <span className='eye' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="pass">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                placeholder='Enter Your Password'
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword" // Name this field accordingly
                value={passwordConfirmation}
                onChange={({target}) => setPasswordConfirmation(target.value)}
              />
              <span className='eye' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <div className="set_btn">
              <button className='set_pass_btn' type="button" disabled={isLoading} style={isLoading ? { background: '#9ad9b5' } : {}} onClick={() => handleSubmit()}>
                { isLoading ? 'Reseting...' : 'Reset Password' }
              </button>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '1rem'}}>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <p className='back'><a href="sign_in"><span><i class="fa-solid fa-arrow-left"></i></span>Back to Sign In</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}




// import React from 'react'
// import SetPassword from '../setNewPassword/SetPassword.css'
// import { useState } from 'react'
// import {FaEye ,FaEyeSlash} from "react-icons/fa"

// export default function Forget_password() {
//     const [ show , setshow ] =useState(false)
//     const [ showpass , setshowpass ] =useState(false)
//   return (
//     <div className='email_link'> 
//         <div className="small_container">

//         <div className="header">
//                 <h2>Welcome To Renting System</h2>
//             </div>
//             <div className="header_link_containar">

//           <p>Your new password must be different from previously used passwords.</p>
//             </div>

//         <div className="form">
//           <form action="">
//           <div className="pass">
//                   <label htmlFor="password">New Password:</label>
//                   <input
//                   placeholder='Enter Your Password'
//                    type={show ? "text" : "password"} name="" id="password" />
//                   <span className='eye' onClick={()=> setshow(!show)}>
//                     {show ? <FaEye/> : <FaEyeSlash/>}
//                   </span>
//                 </div>
//                 <div className="pass">
//                   <label htmlFor="password"> Confirm Password:</label>
//                   <input placeholder='Enter Your Password' type={showpass ? "text" : "password"} name="" id="password" />
//                   <span className='eye' onClick={()=> setshowpass(!showpass)}>
//                     {show ? <FaEye/> : <FaEyeSlash/>}
//                   </span>
//                 </div>

//               <div className="set_btn">
//                 <button className='set_pass_btn' type="submit"> Reset Password </button>
//               </div>
                  
//  <p className='back'><a href="Sign"><span><i class="fa-solid fa-arrow-left"></i></span>Back to Sing In</a></p>
//           </form>
//         </div>
//         </div>
//     </div>
//   )
// }

