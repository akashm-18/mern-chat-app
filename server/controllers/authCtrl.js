import User from "../modals/userModal.js";
import bcrypt from 'bcryptjs'
import generateTokenAndCookie from "../utilis/generateToken.js";

const signup = async (req , res) => {
    try {
        const { fullName , username , password , confirmpassword , gender } = req.body;

        if (password !== confirmpassword) {
        return res.status(400).json({error : "Passwords don't match"})    
        }

        const alreadyUser = await User.findOne({username})
        if (alreadyUser) {
            return res.status(400).json({error : "Username already exists"})
        }

        const hashedPassword = await bcrypt.hashSync(password , 10)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = await new User({
            fullName ,
            username ,
            password : hashedPassword ,
            gender,
            profilePic : gender === 'male' ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            generateTokenAndCookie(newUser._id , res)
            await newUser.save()
            res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                username : newUser.username,
                profilePic : newUser.profilePic,
            })
        }
        else {
            return res.status(400).json({error : "Invalid user data"})
        }

    } catch (error) {
        console.log("Error in signup controller" , error.message)
        return res.status(500).json({error : "Internal server Error"})
    }
}


const login = async (req , res) => {
    try {
        const {username , password} = req.body
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compareSync(password , user?.password || "")

        if (!user) {
            return res.status(404).json({error : "user not found"})
        }

        if (!isPasswordCorrect) {
            return res.status(400).json({error : "password wrong"})
        }

        generateTokenAndCookie(user._id , res)

        res.status(200).json({
            _id : user._id,
            fullName : user.fullName,
            username : user.username,
            profilePic : user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller" , error.message)
        res.status(500).json({error : "Internal server error"})
    }
}


const logout = (req,res) => {
    try {
        res.cookie('token' , "" , {maxAge : 0})
        return res.status(200).json({message : "Logout successFully"})
    } catch (error) {
        console.log("Error in Logout controller" , error.message)
        return res.status(500).json({error : "Internal server error"})
    }
}

export {login , logout , signup };