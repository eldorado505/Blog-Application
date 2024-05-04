import express from 'express'
import connection from './database/db.js'
import Router from './routes/router.js'
import path from "path"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"

dotenv.config()

const app = express()
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use('/',Router)
// app.use(bodyParser.urlencoded({extended:false}))
// const __dirname = path.resolve();
// if(process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"))
// }

const PORT = process.env.PORT || 8000;
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const connectionString = process.env.MONGODB_URI || `mongodb+srv://${username}:${password}@blogapplication.h5et3nm.mongodb.net/?retryWrites=true&w=majority&appName=BlogApplication`
app.listen(PORT,()=>{console.log("Server is up")})
connection(connectionString); 