const router = require('express').Router();
const {userSignup, userLogin, otpVerification, getUserDetails, updateUserProfile, getCars} = require('../controllers/userController');






//  Login&Signup
router.post('/userSignup',userSignup)
router.post('/userLogin',userLogin)

// OTP
router.post('/otp',otpVerification)

// User Details
router.get('/getUser/:data_id',getUserDetails)
router.put('/updateUser',updateUserProfile)

// Get Car
router.get('/cars',getCars)








module.exports = router;