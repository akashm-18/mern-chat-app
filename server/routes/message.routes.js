import express from 'express'
import { getMessages, sendMessage } from '../controllers/messageCtrl.js'
import protectRoute from '../middleware/protectRoute.js'

const router = express()

router.get('/:id' , protectRoute , getMessages)
router.post('/send/:id' , protectRoute , sendMessage)


export default router