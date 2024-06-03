import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import "./login.css"


function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password
    };
    console.log(import.meta.env.VITE_API+"login");
    await axios.post(import.meta.env.VITE_API+"login", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success('Login Successful!');
          navigate("/");
          setTimeout(()=>{
        
            window.location.reload();
    
          },1000)
          // window.location.reload();
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err + " login");
          toast.error("Error: " + err.response.data.msg);
        }
      });
  };

  return (
    <div className='contain'>
      <div className="formWrapper">
        <Link to='/' className='closeButton'>✕</Link>
        <h3 className='title'>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='inputGroup'>
            <label className='label'>Email:</label>
            <input
              type="email"
              placeholder='Enter your Email'
              className='input' style={{ borderColor: errors.email ? 'red' : '#ccc'}}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className='error'>{errors.email.message}</p>}
          </div>
          <div className='inputGroup'>
            <label className='label'>Password:</label>
            <input
              type="password"
              placeholder='Enter your password'
              className='input' style={{ borderColor: errors.password ? 'red' : '#ccc'}}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className='error'>{errors.password.message}</p>}
          </div>
          <button type="submit" className='submitButton'>Login</button>
        </form>
        <p className='loginPrompt'>
          Don't have an account? <Link to='/signup' className='loginLink'> &nbsp; Register</Link>
        </p>
      </div>
    </div>
  );
}


export default Login;
