import express from "express"
import app from "./app.js"
import connectDB from "./db/index.js"
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})

// Define the port from environment variables or use a default value
const PORT = process.env.PORT || 8000

app.get("/", (req, res) => {
  res.send("Hello World!")
})


// Start the server only after successful database connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}).catch((err) => {
  console.log("Database connection failed", err)
})





