import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosinstance";

const uploadImage = async (imageFile) => {
  if (!imageFile) {
    return { imageUrl: "" };  // No image uploaded → return empty string
  }

  // 1️⃣ SIZE LIMIT  (optional but recommended)
  if (imageFile.size > 300 * 1024) {  // 300KB limit
    throw new Error("Image too large. Please upload image under 300KB.");
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 15000, // 15 sec timeout (fixes Render cold start)
      }
    );

    return response.data; // { imageUrl: "https://..." }
  } catch (error) {
    console.error("Error uploading image:", error);

    // ⏳ Render cold start retry logic
    if (error.code === "ECONNABORTED" || error.response?.status >= 500) {
      console.log("Retrying image upload after cold start…");
      await new Promise((res) => setTimeout(res, 1200));

      const retry = await axiosInstance.post(
        API_PATHS.IMAGE.UPLOAD_IMAGE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return retry.data;
    }

    throw error;
  }
};

export default uploadImage;
