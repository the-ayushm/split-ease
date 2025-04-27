import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import dotenv from 'dotenv'
dotenv.config() 


const protectRoute = async(req , res , next) => {
    try{
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                message: "Not authorized to access this site!"
            })
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({
                message: "Invalid or expired token!"
            }) 
        }
        const user = await User.findById(decoded.userid).select('-password')
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user; 
        next();
    }catch(err){
        console.error("Error in protectRoute: " , err.message)
        return res.status(401).json({
            message: "Authentication failed!"
        })
    }
}

export default protectRoute