const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { 
    registerUser, 
    loginUser, 
    getUserInfo,
    updateProfileImage   // ✅ added
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware"); // ✅ fixed line

const router = express.Router();

router.post("/register", registerUser);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect , getUserInfo);
router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

// ✅ new route to update user’s profile image in MongoDB
router.put("/update-profile-image", protect, updateProfileImage);

module.exports = router;
