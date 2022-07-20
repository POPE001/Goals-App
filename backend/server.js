const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const goalRouter = require("./routes/goalRoutes");
const userRouter = require("./routes/userRoutes");
//The process.env property returns an object containing the user environment
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);

//Point to Frontend build folder for static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  //Point to index.html file in build folder
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("Please set application to production mode");
  });
}

app.use("*", (req, res) => {
  res.status(404).json({ msg: "requested URL can not be found" });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
