const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  getUserProfile,
  getAllUsers,
  getUser,
  updateUser,
  getAllStudents,
  updateUserHasGroup,
  getAllSupervisors,
  getAllCoSupervisors,
  updateUserRole,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.get("/profile", getUserProfile);
router.get("/all", getAllUsers);
router.get("/students", getAllStudents);
router.get("/supervisors", getAllSupervisors);
router.get("/cosupervisors", getAllCoSupervisors);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.put("/role/:id", updateUserRole);
router.put("/groupSet/:id", updateUserHasGroup);

module.exports = router;
