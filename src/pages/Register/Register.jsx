



import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../Login/Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { register } from '../../utils/api/usersApi';

export default function Register() {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      username: '',
      password: '',
      email: '',
      role: 'User',  
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3).max(10).required('Name is required'),
      surname: Yup.string().min(3).max(10).required('Surname is required'),
      username: Yup.string().min(4).max(10).required('Username is required'),
      password: Yup.string().min(3).max(10).required('Password is required'),
      email: Yup.string().min(5).max(30).email('Invalid email address').required('Email is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await register(values);
        console.log("Registration successful", response);
        resetForm();
        navigate('/auth/login'); // Navigate to the login page after successful registration
      } catch (error) {
        console.error("Registration failed", error);
        setErrorMessage(error.message || 'error');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className='loginContainer'>
      <div className='leftLogin'>
        <h1>Winku</h1>
        <p>Winku is free to use for as long as you want with two active projects.</p>
        <div className="imgBord">
          <img src="https://wpkixx.com/html/winku/images/wink.png" alt="" />
        </div>
        <p>Follow Us on</p>
      </div>
      <div className="rightLogin">
        <div className='loginBlok'>
          <h1>Register</h1>
          <span>Don’t use Winku Yet?<a href=""> Take the tour </a>or <a href="">Join now</a></span>

          <form onSubmit={formik.handleSubmit}>
            <input
              placeholder='Name'
              name="name"
              type="text"
              className='loginInput'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}

            <input
              placeholder='Surname'
              name="surname"
              type="text"
              className='loginInput'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.surname}
            />
            {formik.touched.surname && formik.errors.surname ? (
              <div className="error">{formik.errors.surname}</div>
            ) : null}

            <input
              placeholder="User Name"
              name="username"
              type="text"
              className='loginInput'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}

            <input
              placeholder="Password"
              name="password"
              type="password"
              className='loginInput'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}

            <input
              placeholder="Email@"
              name='email'
              type="text"
              className='loginInput'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}

            <input
              placeholder="User"
              name="role"
              type="text"
              className='loginInputUser'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
            />
  {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
            <div className='loginCheck'>
              <input className="remember" type="checkbox" />
              <span className='text-xs'>Accept Terms & Conditions?</span>
              <div className='forgot hover:underline decoration-sky-500/30 text-xs'> <NavLink to='/auth/login'> Already have an account</NavLink></div>
            </div>
            <div className="buttons">
              <button className="loginButton" type='submit' disabled={formik.isSubmitting}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}



















// import React from 'react'
// import '../Login/Login.css'
// import { NavLink } from 'react-router-dom';
// import { register } from '../../utils/api/usersApi';


// export default function Register() {
//   const onRegister = async (event) => {
//     event.preventDefault();
//     const { target } = event;
//     const formData = new FormData(target);
//     //   register({
//     //     name: formData.get("name"),
//     //     surname: formData.get("surname"),
//     //     username: formData.get("username"),
//     //     password: formData.get("password"),
//     //     email: formData.get("email")
//     //   });
//     // }

//     const user = {
//       name: formData.get("name"),
//       surname: formData.get("surname"),
//       username: formData.get("username"),
//       password: formData.get("password"),
//       role:formData.get("User"),
//       email: formData.get("email"),
//       // position: formData.get("position"),
//     };

//     try {
//       const response = await register(user);
//       console.log("Registration successful", response);
//     } catch (error) {
//       console.error("Registration failed", error);
//     }
//   };




//   return (
//     <div className='loginContainer'>
//       <div className='leftLogin'>
//         <h1>Winku</h1>
//         <p>Winku is free to use for as long as you want with two active projects.</p>
//         <div className="imgBord">
//           <img src="https://wpkixx.com/html/winku/images/wink.png" alt="" />

//         </div>

//         <p>Follow Us on</p>
//       </div>
//       <div className="rightLogin">
//         <div className='loginBlok'>
//           <h1>Register</h1>
//           <span>Don’t use Winku Yet?<a href=""> Take the tour </a>or <a href="">Join now</a></span>

//           <form onSubmit={onRegister} >
//             <input placeholder='Name' name="name" type="text" className='loginInput' />

//             <input placeholder='Surname' name="surname" type="text" className='loginInput' />
//             <input placeholder="User Name" name="username" type="text" className='loginInput' />
//             <input placeholder="Password" name="password" type="text" className='loginInput' />
//             {/* <input placeholder="Position" name="position" type="text" className='loginInput' /> */}
//             <input placeholder="User" name="User" type="text" className='loginInput' />


//             {/* <label>
//               <span className='text-xs'><input className='remember' type="radio" name='aa' /> Male</span>
//               <span className='text-xs'><input className='remember' type="radio" name='aa' /> Female</span>
//             </label> */}
//             <input placeholder="Email@" name='email' type="text" className='loginInput' />
//             <div className='loginCheck'>
//               <input className="remember" type="checkbox" />
//               <span className='text-xs'>Accept Terms & Conditions?</span>
//               {/* <p>Always Remember Me.</p> */}
//               <div className='forgot hover:underline decoration-sky-500/30 text-xs'> <NavLink to='/auth/login'> Already have an account</NavLink></div>
//             </div>
//             <div className="buttons">
//               <button className="loginButton " type='submit'>Register</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }


