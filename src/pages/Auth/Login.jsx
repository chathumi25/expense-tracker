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
    if (!validateEmail(email)) return setError("Please enter valid email.");
    if (!password) return setError("Please enter password.");
    setError("");

    try {
      let response;
try {
  response = await axios.post(
    `${BASE_URL}${API_PATHS.AUTH.LOGIN}`,
    { email, password }
  );
} catch (err) {
  console.log("Backend cold, retrying...");
  await new Promise(r => setTimeout(r, 1500));
  response = await axios.post(
    `${BASE_URL}${API_PATHS.AUTH.LOGIN}`,
    { email, password }
  );
}

      

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);

        //  Merge local profileImage if exists
        const localProfileImage = localStorage.getItem('profileImage');
        const mergedUser = localProfileImage
          ? { ...user, profileImage: localProfileImage }
          : user;

        updateUser(mergedUser);
        localStorage.setItem("user", JSON.stringify(mergedUser));

        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) setError(error.response.data.message);
      else setError("Something went wrong. Try again.");
    }
  };

  return (
    <AuthLayout>
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
            placeholder="user@gmail.com"
            type="text"
            className="mb-4"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="*********"
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

          <p className="text-[10px] text-gray-700 mt-5 text-center">
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
