import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app= express()

//This configuuration for cors 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//This configuuration for json limit 
app.use(express.json({limit: '16kb'}))

//This configuuration for url encoder 
app.use(express.urlencoded({extended: true, limit: '16kb'}))

//This configuation for file uploader images in temporary store
app.use(express.static("public"))

app.use(cookieParser)

export {app}