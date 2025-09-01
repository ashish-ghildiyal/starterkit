import express from "express"
import app from "./app.js"
import connectDB from "./db/index.js"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"
dotenv.config({
    path: "./.env"
})

// Define the port from environment variables or use a default value
const PORT = process.env.PORT || 8000

// Mount user-related routes at the /api/v1 path
app.use("/api/v1", userRoutes)



// Start the server only after successful database connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}).catch((err) => {
  console.log("Database connection failed", err)
})





