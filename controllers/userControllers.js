const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const registerUser = asyncHandler(async (req, res) => {
  //registers a user
  const { name, email, password, pic, contactNo, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    contactNo,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      contactNo: user.contactNo,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  //authenticates a user
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      contactNo: user.contactNo,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  // get a specific profile
  const id = req.user._id;
  const user = await User.findById(id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      contactNo: user.contactNo,
      role: user.role,
    });
  } else {
    res.status(403);
    throw new Error("User not found");
  }
});

const getUser = asyncHandler(async (req, res) => {
  //get one user by Id
  const id = req.params.id;
  const user = await User.findById(id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      contactNo: user.contactNo,
      role: user.role,
    });
  } else {
    res.status(403);
    throw new Error("User not found");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  //gets all users
  const users = await User.find();
  if (users.length > 0) {
    res.json(users);
  } else {
    res.status(200);
    res.send("No not found");
  }
});

const getAllStudents = asyncHandler(async (req, res) => {
  //gets all students
  const users = await User.find({ role: "STUDENT" });

  if (users.length > 0) {
    res.json(users);
  } else {
    res.status(200);
    res.send("No not found");
  }
});

const getAllSupervisors = asyncHandler(async (req, res) => {
  //gets all Supervisors
  const users = await User.find({ role: "SUPERVISOR" });

  if (users.length > 0) {
    res.json(users);
  } else {
    res.status(200);
    res.send("No not found");
  }
});

const getAllCoSupervisors = asyncHandler(async (req, res) => {
  //gets all Co-Supervisors
  const users = await User.find({ role: "COSUPERVISOR" });

  if (users.length > 0) {
    res.json(users);
  } else {
    res.status(200);
    res.send("No not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  //updates user details
  const id = req.params.id;
  const { name, email, contactNo } = req.body;
  try {
    await User.findByIdAndUpdate(id, {
      name,
      email,
      contactNo,
    });
  } catch (err) {
    console.log(err);
  }
});

const updateUserRole = asyncHandler(async (req, res) => {
  //updates user role
  const id = req.params.id;
  const { role } = req.body;
  try {
    await User.findByIdAndUpdate(id, {
      role,
    });
  } catch (err) {
    console.log(err);
  }
});

const updateUserHasGroup = asyncHandler(async (req, res) => {
  //updates if user has a group or not
  const id = req.params.id;
  const { hasGroup } = req.body;
  try {
    await User.findByIdAndUpdate(id, {
      hasGroup,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  getUser,
  updateUser,
  updateUserRole,
  allUsers,
  registerUser,
  authUser,
  getUserProfile,
  getAllUsers,
  getAllStudents,
  updateUserHasGroup,
  getAllSupervisors,
  getAllCoSupervisors,
};
