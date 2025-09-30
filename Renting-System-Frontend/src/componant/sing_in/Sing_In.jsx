import React, { useState } from 'react';
import '../sing_in/Sing_In.css' 
import { FaEye, FaEyeSlash } from "react-icons/fa";
import fetchData from '../../func/fetch';
import useAuth from '../../hooks/useAuth';


export default function Sing_In() {
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { updateAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    let { data, message, error_status } = await fetchData(
        'auth/login/',
      {
        username: formData.email,
        password: formData.password
      },
      'Failed to sign in'
    );

    setIsLoading(false);

    if(error_status) return setError(message);

    if(data.token) updateAuth(true, data.token);
  };

  return (
    <div className='Sing_In'>
      <div className="small_container">
        <div className="header">
          <h2>Welcome To Renting System</h2>
        </div>
        <div className="header_link">
          <a href="Sign">Sign In</a>
          <a href="New_account">Register </a>
          {/* <a href="resetPassword">ResetPassword </a> */}
        </div>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '1rem'}}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="mail">
              <label htmlFor="email"> User Name:</label>
              <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="pass">
              <label htmlFor="password"> Password:</label>
              <input type={showPassword ? "text" : "password"} name="password" id="password" value={formData.password} onChange={handleChange} />
              <span className='eye' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="sing_in_button">
              <button disabled={isLoading}  type="submit" style={isLoading ? { background: '#9ad9b5' } : {}}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
            <p><a href="forget_password">Forget Your Password ?</a></p>
          </form>
          <div className="footer">
            <h4>Or Connect With</h4>
            <div className="connection">
              <div className="up">
                <p><span><i className="fa-brands fa-google"></i></span> Continue With Google</p>
              </div>
              <div className="up">
                <p><span><i className="fa-brands fa-facebook"></i></span> Continue With Facebook</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





// import React, { useState } from 'react'
// import Sing from './Sing_In.css'
// import {FaEye ,FaEyeSlash} from "react-icons/fa" 


// export default function Sing_In() { 
// const[showpassword,setshowpassword]=useState(true)

//   return (
    
//     <div className='Sing_In'>
//         <div className="small_container">
//             <div className="header">
//                 <h2>Welcome To Renting System</h2>
//             </div>
//             <div className="header_link">
//               <a href="Sign">Sing In</a>
//               <a href="New_account">Register </a>
//             </div>
//             <div className="form">
//               <form action="">

//               <div className="mail">
//               <label htmlFor="mail"> Email:</label>
//                   <input  type="email" name="" id="mail" />
                  
//               </div>

//                 <div className="pass">
//                   <label htmlFor="password "> Password:</label>
//                   <input  type={showpassword ? "text" : "password"} id="password" />
//                   <span className='eye' onClick={()=> setshowpassword(!showpassword)}>
//                     {showpassword ? <FaEyeSlash/> :<FaEye/>}
//                     </span>
//                 </div>
//                 <div className="sing_in_btn">
//                   <button className='sing_btn' type="submit">Sign In</button>
                  
//                 </div>
//                   <p><a href="forget_password">Forget Your Password ?</a></p>
                
//               </form>

//               <div className="footer">
//                 <h4>Or Connect With</h4>
//                 <div className="connection">
//                   <div className="up">
//                     <p><span><i className="fa-brands fa-google"></i></span> Continua With Google</p>
//                   </div>
//                   <div className="up">
//                     <p><span><i className="fa-brands fa-facebook"></i></span> Continua With Facebook</p>
//                   </div>
                  
//                 </div>
//               </div>
//             </div>
//         </div>
//     </div>
//   )
// }
