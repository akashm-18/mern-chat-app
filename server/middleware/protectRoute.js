import jwt  from 'jsonwebtoken'
import User from '../modals/userModal.js';

const protectRoute = async (req , res , next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({error : "UnAuthorized : No token found"})
        }

        const decoded = jwt.verify(token , process.env.JWT_SECERET_KEY)

        if (!decoded) {
            return res.status(401).json({error : "UnAuthorized : Token doesnt Match"})
        }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(404).json({error : "User not Found"})
        }

        req.user = user;

        next()

    } catch (error) {
        console.log("Error in protect Route" , error.message)
        res.status(500).json({error : "Internal Server error"})
    }
}


export default protectRoute