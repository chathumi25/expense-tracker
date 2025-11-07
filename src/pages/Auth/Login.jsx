import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axios from "axios";
import { BASE_URL, API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }
    setError("");

    try {
      const response = await axios.post(
        `${BASE_URL}${API_PATHS.AUTH.LOGIN}`,
        { email, password }
      );

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out;
        }

        /* 🚫 Hide default browser password reveal icons */
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear,
        input[type="password"]::-webkit-contacts-auto-fill-button,
        input[type="password"]::-webkit-credentials-auto-fill-button {
          display: none !important;
        }
      `}</style>

      <div className="animate-fadeIn lg:w-[75%] md:w-[80%] w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-blue-100">
        <h3 className="text-2xl font-bold text-[#040c78] mb-2 tracking-wide">
          Welcome Back 
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Please enter your credentials to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="rmcn@gmail.com"
            type="text"
            className="mb-4"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="********"
            type="password"
          />

          {error && (
            <p className="text-red-500 text-xs font-medium mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="btn-primary mt-6 shadow-lg hover:shadow-blue-400/30"
          >
            LOGIN
          </button>

          <p className="text-sm text-gray-700 mt-5 text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
