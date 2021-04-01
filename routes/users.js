const router = require("express").Router();
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
  serializeBlog,
} = require("../utils/Auth");

const Blog = require("../models/Blog");
const { default: consolaGlobalInstance } = require("consola");
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
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

// Super Admin Login Route
router.post("/login-super-admin", async (req, res) => {
  await userLogin(req.body, "superadmin", res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// Users Protected Route

// Create blog by user
router.post(
  "/user-protectd",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    // console.log(req);
    let content = new Blog({
      title: req.body.title,
      description: req.body.description,
      user_id: req.user._id,
    });
    try {
      await content.save();
      res.json(content);
    } catch (e) {
      res.render(`Error saving blog: ${err}`);
    }
    // return res.json("Hello User");
  }
);

// Get All blogs created by user
router.get(
  "/user-protectd",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    // console.log(req.user);

    try {
      let content = await Blog.find().sort({
        createdAt: "desc",
      });
      res.json(content);
    } catch (e) {
      res.render(`Error Rendering blog: ${err}`);
    }
    return res.json("Hello User");
  }
);

// Get All blogs created by user having status true
router.get(
  "/user-protectd-final",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    // console.log(req.user);

    try {
      let content = await Blog.find({ status_user: true }).sort({
        createdAt: "desc",
      });
      res.json(content);
    } catch (e) {
      res.render(`Error Rendering blog: ${err}`);
    }
    return res.json("Hello User");
  }
);

// Get  blogs created by user having status_admin false
router.get(
  "/admin-status",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    // console.log(req);

    try {
      let content = await Blog.find({ status_admin: false }).sort({
        createdAt: "desc",
      });
      res.json(content);
    } catch (e) {
      res.render(`Error Rendering blog: ${e}`);
    }
    // return res.json("Hello User");
  }
);

// Update  admin_status  having status_admin false
router.put(
  "/admin-status",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    await Blog.findOne({ _id: req.body._id }, function (err, foundObject) {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        if (!foundObject) {
          res.status(404).render("Object with provided id not found");
        } else {
          foundObject.status_admin = true;

          foundObject.save(function (err, updatedObject) {
            if (err) {
              console.log(err);
              res.status(500).send(err);
            } else {
              res.send(updatedObject);
            }
          });
        }
      }
    });
  }
  // return res.json("Hello User");
);

// Get  blogs created by user having status_employee false
router.get(
  "/employee-status",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    // console.log(req);

    try {
      let content = await Blog.find({
        status_admin: true,
        status_employee: false,
      }).sort({
        createdAt: "desc",
      });
      res.json(content);
    } catch (e) {
      res.render(`Error Rendering blog: ${e}`);
    }
    // return res.json("Hello User");
  }
);

// Update  employee_status  having status_employee false
router.put(
  "/employee-status",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    await Blog.findOne({ _id: req.body._id }, function (err, foundObject) {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        if (!foundObject) {
          res.status(404).render("Object with provided id not found");
        } else {
          foundObject.status_employee = true;
          foundObject.status_user = true;

          foundObject.save(function (err, updatedObject) {
            if (err) {
              console.log(err);
              res.status(500).send(err);
            } else {
              res.send(updatedObject);
            }
          });
        }
      }
    });
  }
  // return res.json("Hello User");
);

// Admin Protected Route
router.get(
  "/admin-protectd",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-protectd",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    return res.json("Hello Super Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-and-admin-protectd",
  userAuth,
  checkRole(["superadmin", "admin"]),
  async (req, res) => {
    return res.json("Super admin and Admin");
  }
);

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
