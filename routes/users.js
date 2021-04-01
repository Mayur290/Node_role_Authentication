const router = require("express").Router();
const { userRegister } = require("../utils/Auth");

// Users Registration Route
router.post("/register-user", async (req, res) => {
  // console.log(`In route req:`);
  // console.log(req.body);
  await userRegister(req.body, "user", res);
});

// Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// Super Admin Registration Route
router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

// Users Login Route
router.post("/login-user", async (req, res) => {});

// Admin Login Route
router.post("/login-admin", async (req, res) => {});

// Super Admin Login Route
router.post("/login-super-admin", async (req, res) => {});

// Profile Route
router.get("profile", async (req, res) => {});

// Users Protected Route
router.post("/user-protected", async (req, res) => {});

// Admin Protected Route
router.post("/admin-protected", async (req, res) => {});

// Super Admin Protected Route
router.post("/super-admin-protected", async (req, res) => {});

module.exports = router;

// In postman
// Header=> Content-Type: application/json
// Body=>
// {
//   "username": "register123",
//   "email": "m_hu_gyan@gmail.com",
//   "name": "May Mayo Puuo",
//   "password": "pesapesa"
// }
