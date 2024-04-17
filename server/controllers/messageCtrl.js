import Conversation from "../modals/conversationModal.js";
import Message from "../modals/messageModal.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const sendMessage = async (req , res) => {
    try {
        const { message } = req.body;
        const { id : receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants : { $all : [senderId , receiverId] }
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants : [senderId , receiverId]
            })
        }

        const newMessage = new Message({
            senderId : senderId ,
            receiverId : receiverId ,
            message : message,
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id)
        }

        // await conversation.save()
        // await newMessage.save()

        // This will run in parallel
        await Promise.all([conversation.save() , newMessage.save()])

        // SOCKET FUNCTION
        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            // io.to(<socketId>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage" , newMessage)
        }

        res.status(201).json(newMessage)
        
    } catch (error) {
        console.log('Error in Send Message controller' , error.message)
        res.status(500).json({error : "Internal server Error"})
    }
}

const getMessages = async (req , res ) => {
    try {
        const { id : userToChatId } = req.params;
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants : { $all : [senderId , userToChatId] }
        }).populate("messages")

        if (!conversation) return res.status(200).json([])

        const messages = conversation.messages;

        return res.status(200).json(messages)

    } catch (error) {
        console.log('Error in getMessages controller' , error.message)
        res.status(500).json({error : "Internal server error"})
    }
}

export {sendMessage , getMessages}