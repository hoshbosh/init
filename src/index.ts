import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import mongoose from "mongoose"
import router from "./router/index"
import "dotenv/config"

console.log(process.env.USER)
console.log(process.env.PASSWORD)
const url=`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.1pzgbh8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
console.log(url)
const app=express()

app.use(cors({
    credentials:true,
    origin: 'http://localhost:3050'
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/', router())
const server=http.createServer(app)
server.listen(8080, ()=>{
    console.log('listening on 8080')
})
mongoose.Promise=Promise
mongoose.connect(url)
mongoose.connection.on('error', (error: Error)=>{console.log(error)})