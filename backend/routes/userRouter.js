const router = require('express').Router();
const {userSignup, userLogin, otpVerification} = require('../controllers/userController')





router.post('/userSignup',userSignup)
router.post('/userLogin',userLogin)
router.post('/otp',otpVerification)




module.exports = router;