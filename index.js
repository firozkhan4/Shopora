import express from "express"
import process from "process"
import db from "./models/index.js"

import authRoute from "./auth/route/authRoute.js"
import { HttpStatus } from "microutilpkg"


const app = express()
const PORT = process.env.PORT || 8000
const { sequelize } = db

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


app.get("/", (req, res) => {
  res.send("Hello World!")
})


app.use("/auth", authRoute);

app.use((req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({ message: "Route not found" })
})

app.use((err, req, res, next) => {
  if (err.isOperational)
    res.status(err.statusCode).json({ message: err.message });
  else {
    console.error(err.stack);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
