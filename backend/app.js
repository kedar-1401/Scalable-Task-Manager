

const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");
const errormiddleware=require('./middlewares/errorMiddleware') 
// const clienr=require('../frontend')


const MongoDB=require('./utils/db')
MongoDB();


// var corsOptions = {
//   origin: 'http://localhost:3000',
//   methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//   credentials: true,
// }

app.use(express.json());

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.resolve(__dirname, "../frontend/build")));
//   app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/build/index.html")));
// }

app.use(errormiddleware);
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
