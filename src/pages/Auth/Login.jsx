import React, { useState } from "react";
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); 
  
  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)){
      setError("Please enter valid email address.");
      return;
    }
    if (!password){
      setError("Please enter the password.");
      return;
    }
    setError("");

//Login API Call
  }

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={({ target}) => setEmail(target.value)}
          label="Email Address"
          placeholder="jhone@gmail.com"
          type="text"
          className="mb-4"
        />

        <Input
          value={password}
          onChange={({ target}) => setPassword(target.value)}
          label="Password"
          placeholder="********"
          type="password"
        />
          
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          
          <button type="submit" className="btn-primary mt-6" >
            LOGIN
          </button>
          
          <p className="text-[13px] text-slate-800 mt-4">
            Don't have an account?{" "}
            <Link  to="/signup" 
            className="font-medium underline"
            style={{ color: "#0f1decff" }} // custom color
             >
               SignUp
            </Link>
          </p>
          
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
