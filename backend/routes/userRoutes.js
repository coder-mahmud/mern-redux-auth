import express from 'express'
import { authUser,registerUser,logOutUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'
const router = express.Router()
import { protect } from '../middlewares/authMiddleware.js'


router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logOutUser)
router.route('/profile').get(protect,getUserProfile).put(protect, updateUserProfile);


export default router