import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

// Create an Express application
const app = express()

// Middleware to parse json with a limit of 16kb
app.use(express.json({ limit: "16kb" }))

// Parse application/x-www-form-urlencoded form data.
// This line is Express middleware that parses incoming request bodies 
// with URL-encoded payloads 
// (like from HTML forms) and makes the data available in req.body.
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// Serve static files from the "public" directory.
// This line tells your Express app to serve static files (like images, CSS files, 
// and JavaScript files) from a directory named "public". 
// Any files in that directory can be accessed directly via their URL.
app.use(express.static("public"))

// Middleware to parse cookies from the HTTP requests
app.use(cookieParser())


// sets up CORS (Cross-Origin Resource Sharing) in your Express application.
// CORS is a security feature that allows or 
// restricts resources on a web page to be requested from another domain outside
// of the domain from which the resource originated.
// Configure CORS to allow requests from a specific origin with credentials (like cookies)
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

export default app