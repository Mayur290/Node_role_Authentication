const User = require("../models/User");
const { Schema, model } = require("mongoose");

const Blog = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user_id: {
      type: String,
      required: true,
    },
    status_user: {
      type: Boolean,
      default: false,
    },
    status_employee: {
      type: Boolean,
      default: false,
    },
    status_admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("blogs", Blog);
