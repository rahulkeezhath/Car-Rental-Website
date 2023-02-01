const router = require('express').Router();
const {userSignup, userLogin, otpVerification, getUserDetails} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')




router.post('/userSignup',userSignup)
router.post('/userLogin',userLogin)
router.post('/otp',otpVerification)
router.get('/getUser',protect,getUserDetails)




module.exports = router;