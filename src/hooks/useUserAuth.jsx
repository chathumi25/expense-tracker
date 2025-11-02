import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"; // ✅ ensure this matches file name exactly
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "../context/userContext";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");

        //  Prevent call if no token
        if (!token) {
          console.warn("No token found, redirecting to login.");
          clearUser?.();
          navigate("/login");
          return;
        }

        //  Attach token to request header
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        clearUser?.();
        navigate("/login");
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);
};
