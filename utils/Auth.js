const User = require("../models/User");
const bcrypt = require("bcryptjs");
/* @DESC To Register the user ( Admin, Super_Admin, USer)*/

const userRegister = async (userDets, role, res) => {
  try {
    // Validate the username
    let usernameNotTaken = await validateUsername(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: `Username is already taken`,
        success: false,
      });
    }
    // Validate the email
    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already regitered`,
        success: false,
      });
    }

    // Get hashed password
    const hashedPassword = await bcrypt.hash(userDets.password, 12);

    // Create new User
    const newUser = new User({
      ...userDets,
      password: hashedPassword,
      role: role,
    });
    await newUser.save();
    return res.status(201).json({
      message: "User is Successfully registered! Please Login.",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Unable to create your account\n Error: ${err}`,
      success: false,
    });
  }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

module.exports = {
  userRegister,
};
