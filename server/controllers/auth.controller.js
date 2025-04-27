import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs";


export const signup = async (req, res) => {
    try {
        const { name, email, phone, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({
                error: 'Password do not match!'
            })
        }

        const user = await User.findOne({
            phone, email
        })
        if (user) {
            return res.status(400).json({
                error: 'User already exist!'
            })
        }

        // HASH PASSWORD HERE 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
           name,
            email,
            phone,
            password: hashedPassword
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name, 
                email: newUser.email,
                phone: newUser.phone
            })
        } else {
            res.status(400).json({
                error: 'Invalid user data!'
            })
        }

    } catch (err) {
        console.error(err)
        res.status(404).json({
            error: 'Something went wrong!'
        })
    }
}

export const signin = async (req, res) => {
    try {


        const { email, phone, password } = req.body
        const user = await User.findOne({
            email,
            phone,
        })
        const isPasswordMatch = await bcrypt.compare(password, user?.password || "")
        if (!user || !isPasswordMatch) {
            return res.status(400).json({
                error: 'Invalid email , phone or password!'
            })
        }
        generateTokenAndSetCookie(user._id, res) 
        res.status(200).json({
            message: "Logged in successfully!",
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
        })
    } catch (err) {
        console.error(err)
        res.status(404).json({
            error: 'Something went wrong!'
        })
    }
}

export const signout = (req, res) => {
    res.cookie("token", "", { maxAge: 0 })
    res.status(200).json({
        message: "Logged out successfully!"
    })
}