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

    if (!fullName.trim()) { setError("Enter full name"); return; }
    if (!validateEmail(email.trim())) { setError("Enter valid email"); return; }
    if (!password.trim()) { setError("Enter password"); return; }

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
      if (err.response?.data?.message) setError(err.response.data.message);
      else setError("Something went wrong");
    }
  };

  return (
    <AuthLayout>
      <div className="height: 20px;"></div>
      {/* Mobile-friendly scrollable container */}
      <div className="flex justify-center items-start w-full min-h-screen px-3 ">
  <div className="bg-white shadow-md rounded-30 p-20 w-full max-w-s sm:max-w-m
                  border border-gray-100
                  max-h-[190vh] overflow-y-auto flex flex-col mb">


         <div className="padding-top: 200px;"></div>
         <div className="height: 20px;"></div>
         
          {/* Title */}
         <div className="h-10"></div> 
          <h3 className="text-sm sm:text-base font-semibold text-[#040c78] text-center mb-3">
            Create Account
          </h3>
          <p className="text-[8px] sm:text-[10px] text-gray-600 text-center mb-3">
            Enter your details below
          </p>

          <form onSubmit={handleSignUp} className="flex flex-col gap-2">

            {/* Profile Image */}
            <div className="flex flex-col items-center mb-1 relative">
              <label
                htmlFor="profilePic"
                className="cursor-pointer flex items-center justify-center 
                           w-10 h-10 sm:w-20 sm:h-20 rounded-full border border-blue-400
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
                    <LuCamera size={14} />
                    <span className="text-[6px] sm:text-[7px] mt-0">Upload</span>
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

            {/* Inputs */}
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Name"
              placeholder="John"
              type="text"
              style={{ height: "36px", fontSize: "13px" }}
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              placeholder="john@gmail.com"
              type="text"
              style={{ height: "36px", fontSize: "13px" }}
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="******"
              type="password"
              showEyeIcon={false}
              style={{ height: "36px", fontSize: "13px" }}
            />

            

            {error && (
              <p className="text-red-500 text-[10px] sm:text-[12px] text-center">{error}</p>
            )}

            <button
              type="submit"
              className="btn-primary w-full py-2 text-[12px] sm:text-sm shadow hover:shadow-md transition"
            >
              SIGN UP
            </button>

            <p className="text-[10px] sm:text-[12px] text-center text-gray-700 mt-0">
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
