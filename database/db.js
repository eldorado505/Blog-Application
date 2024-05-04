import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const connection = async(connectionString) => {
    // const username = process.env.DB_USERNAME
    // const password = process.env.DB_PASSWORD
    // console.log(username)
    // console.log(password)


    try {
        await mongoose.connect(connectionString, {useNewUrlParser: true})
        console.log("DB connection successful")
    }
    catch(error) {
        console.log("DB Connection failed")
    }
}

export default connection