const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { MDKey } = require("./config/keys");
const app = express();
app.use(express.json({ extended: true }));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/app", require("./routes/app.routes"));
async function start() {
  try {
    await mongoose.connect(MDKey, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(5000, () => {
      console.log("app start!!!");
    });
  } catch (e) {
    console.log("server error:", e);
    process.exit(1);
  }
}
start();
