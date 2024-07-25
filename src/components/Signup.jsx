import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Login from './Login';
import axios from 'axios';
import toast from 'react-hot-toast';
import './login.css'
function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      username: data.name,
      email: data.email,
      password: data.password
    };
    
    await axios.post(import.meta.env.VITE_API+"signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success('Signup Successful!');
          navigate("/");
          setTimeout(() => {

            window.location.reload();

          }, 1000)
          // window.location.reload();
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err + " signup");
          toast.error("Error: " + err.response.data.msg);
        }
      });
  };

  return (
    <div className='contain'>
      <div className='formWrapper'>
        <Link to='/' className='closeButton'>✕</Link>
        <h3 className='title'>Register</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='inputGroup'>
            <label className='label'>UserName:</label>
            <input
              type="text"
              placeholder='Enter your FullName'
              className='input' style={{ borderColor: errors.name ? 'red' : '#ccc' }}
              {...register("name", { required: "UserName is not filled" })}
            />
            {errors.name && <p className='error'>{errors.name.message}</p>}
          </div>
          <div className='inputGroup'>
            <label className='label'>Email:</label>
            <input
              type="email"
              placeholder='Enter your Email'
              className='input' style={{ borderColor: errors.email ? 'red' : '#ccc' }}
              {...register("email", { required: "Email is not filled" })}
            />
            {errors.email && <p className='error'>{errors.email.message}</p>}
          </div>
          <div className='inputGroup'>
            <label className='label'>Password:</label>
            <input
              type="password"
              placeholder='Enter your password'
              className='input' style={{ borderColor: errors.password ? 'red' : '#ccc' }}
              {...register("password", { required: "Password is not filled" })}
            />
            {errors.password && <p className='error'>{errors.password.message}</p>}
          </div>
          <button type="submit" className='submitButton'>Register</button>
        </form>
        <p className='loginPrompt'>
          Already have an account? <Link to='/login' className='loginLink' > &nbsp; Login</Link>

        </p>
      </div>
    </div>
  );
}
export default SignUp;
