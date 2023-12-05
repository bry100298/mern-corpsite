import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import { stat } from "fs";

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDBV");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

// app.get("/test", (req, res) => {
//   res.json({
//     message: "Hello World!",
//   });
// });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    sucess: false,
    statusCode,
    message,
  });
});
