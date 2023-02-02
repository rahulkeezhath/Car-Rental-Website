const router = require('express').Router();
const {userSignup, userLogin, otpVerification, getUserDetails, updateUserProfile} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');





router.post('/userSignup',userSignup)
router.post('/userLogin',userLogin)
router.post('/otp',otpVerification)
router.get('/getUser',protect,getUserDetails)
router.post('/profile',updateUserProfile)





module.exports = router;