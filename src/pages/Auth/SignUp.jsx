import React, { useState, useContext } from 'react';
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from '../../utils/axiosinstance';
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";
import { LuCamera } from "react-icons/lu"; 

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [profileFile, setProfileFile] = useState(null); 
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImgUrl = "";

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!validateEmail(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    try {
      if (profileFile) {
        const imgUploadRes = await uploadImage(profileFile);
        profileImgUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post("/api/v1/auth/signup", {
        fullName: fullName.trim(),
        email: email.trim(),
        password: password.trim(),
        profileImage: profileImgUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }

    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
  <div className="flex justify-center items-start w-full min-h-screen px-4 py-4">

    <div className="bg-white shadow-md rounded-xl p-4 
                    w-full max-w-sm md:max-w-md 
                    border border-gray-100">

      <h3 className="text-lg font-bold text-[#040c78] text-center mb-1">
        Create an Account
      </h3>

      <p className="text-[10px] text-gray-600 text-center mb-2">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp} className="space-y-2">

        {/* SMALLER HEIGHT PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-1 relative">
          <label
            htmlFor="profilePic"
            className="cursor-pointer flex items-center justify-center 
                       w-20 h-20 rounded-full border border-blue-400
                       bg-gradient-to-br from-blue-50 to-white shadow-sm 
                       transition-all duration-200 hover:scale-105"
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile Preview"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <LuCamera size={18} />
                <span className="text-[9px] mt-0.5">Upload</span>
              </div>
            )}
          </label>

          <input
            id="profilePic"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setProfileFile(file);
                const reader = new FileReader();
                reader.onload = () => setProfilePic(reader.result);
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>

        {/* INPUTS SMALLER HEIGHT */}
        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="John Doe"
          type="text"
          className="py-1 text-sm"
        />

        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@gmail.com"
          type="text"
          className="py-1 text-sm"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="********"
          type="password"
          showEyeIcon={false}
          className="py-1 text-sm"
        />

        {error && (
          <p className="text-red-500 text-[10px] text-center -mt-1">{error}</p>
        )}

        {/* SMALLER HEIGHT BUTTON */}
        <button
          type="submit"
          className="btn-primary w-full py-1.5 text-sm mt-2 shadow hover:shadow-md"
        >
          SIGN UP
        </button>

        <p className="text-[10px] text-center text-gray-700 mt-1">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  </div>
</AuthLayout>

  );
};

export default SignUp;
