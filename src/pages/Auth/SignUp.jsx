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
      <div className="flex justify-center items-center w-full h-full py-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md md:max-w-lg lg:max-w-xl border border-gray-100">
          <h3 className="text-2xl font-bold text-[#040c78] mb-2 tracking-wide text-center">
            Create an Account
          </h3>
          <p className="text-sm text-gray-600 text-center mt-2 mb-5">
            Join us today by entering your details below.
          </p>

          <form onSubmit={handleSignUp} className="space-y-4">
            
            {/*  Stylish Upload Section */}
            <div className="flex flex-col items-center mb-3 relative">
              <label
                htmlFor="profilePic"
                className="relative cursor-pointer flex items-center justify-center w-28 h-28 rounded-full border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-white shadow-md hover:shadow-blue-300/50 transition-all duration-300 ease-in-out hover:scale-105"
              >
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <LuCamera size={26} className="mb-1 opacity-70" />
                    <span className="text-xs font-medium">Upload</span>
                  </div>
                )}

                {/*  small camera overlay in bottom-right */}
                {profilePic && (
                  <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-1.5 shadow-md hover:bg-blue-600 transition">
                    <LuCamera size={16} color="#fff" />
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

            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@gmail.com"
              type="text"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="********"
              type="password"
              showEyeIcon={false}
            />

            {error && (
              <p className="text-red-500 text-xs text-center -mt-1">{error}</p>
            )}

            <button
              type="submit"
              className="btn-primary mt-6 shadow-lg hover:shadow-blue-400/30"
            >
              SIGN UP
            </button>

            <p className="text-sm text-gray-700 text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline"
              >
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
