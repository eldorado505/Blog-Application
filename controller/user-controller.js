import User from "../model/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const signup = async(request, response) => {
    const user = request.body;
    console.log(user)
    try {
        user.password = await bcrypt.hash(user.password, 10);
        const newUser = User(user);
        await newUser.save();
        response.status(200).json({mssg: "signup successful"})
        console.log("signup successful")

        response.send();
    }
    catch(error) {
        response.status(500).json({mssg: "signup failed"})
        console.log("signup failed")
        response.send();
    }
}

const login = async(request, response) => {
    console.log(request.body)
    let user = await User.findOne({ username: request.body.username });
    // console.log(user)
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
        
            response.status(200).json({ accessToken: accessToken,name: user.name, username: user.username });
        
        } else {
            response.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        response.status(500).json({ msg: 'error while login the user' })
    }
}





export {login,signup} ;