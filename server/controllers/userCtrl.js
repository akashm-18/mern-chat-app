import User from "../modals/userModal.js"

const getUsersForSidebar = async (req , res) => {
    try {
        
        const loggedInUser = req.user._id
        const filteredUsers = await User.find({ _id : { $ne : loggedInUser } }).select("-password")
        console.log("checking the github repo")
        res.status(200).json(filteredUsers)

    } catch (error) {

        console.log("Error in the getusers controller" , error.message)
        res.status(500).json({ error : error.message || "Internal server error" })
    }
}

export {getUsersForSidebar};