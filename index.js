const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { connect } = require("mongoose");
const { success, error } = require("consola");
// Bring the app constants
const { DB, PORT } = require("./config");

const app = express();

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// User Router MiddleWare
app.use("/api/users", require("./routes/users"));

const startApp = async () => {
  try {
    await connect(DB, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    success({
      message: `Successfully connected with the Database \n ${DB}`,
      badge: true,
    });

    app.listen(PORT, () =>
      success({ message: `Server started on port ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `Unable to connect with Database\n ${err}`,
      badge: true,
    });
    startApp();
  }
};

startApp();
