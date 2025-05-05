import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// JSON and URL Encoded config
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))

// Static file serving
app.use(express.static("public"))

// ✅ Fix here
app.use(cookieParser())  // <--- Add parentheses

// Routes import
import userRouter from './routes/user.routes.js'

// Routes declaration
app.use("/api/v1/users", userRouter)

export { app }
