import express from 'express'
import initWebRoute from './routes/route'
import connectDB from './config/connectDB'
import cors from 'cors'
require('dotenv').config()

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))

app.use(express.json({
    limit: '50mb'
}))

initWebRoute(app)
connectDB()

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})