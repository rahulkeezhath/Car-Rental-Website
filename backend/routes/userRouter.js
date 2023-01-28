const router = require('express').Router();
const {userSignup} = require('../controllers/userController/signupController')
const {userLogin} = require('../controllers/userController/loginController')
const {otpVerification} = require('../controllers/userController/otpController')



router.post('/userSignup',userSignup)
router.post('/userLogin',userLogin)
router.post('/otp',otpVerification)



module.exports = router;