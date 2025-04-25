 import jwt from 'jsonwebtoken'

 
 
 const generateTokenAndSetCookie = (userid , res) => {
    const JWT_SECRET = process.env.JWT_SECRET?.trim()

    try {
        const token = jwt.sign({userid} , JWT_SECRET , {expiresIn: '15d'}) 
        res.cookie("token", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
            httpOnly: true,
            secure: false,  
            sameSite: "Lax",  
        });
    } catch (err) {
        console.error('JWT ERROR ' , err)
    }
}

export default generateTokenAndSetCookie