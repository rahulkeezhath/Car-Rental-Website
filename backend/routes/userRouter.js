const router = require('express').Router();
const {userSignup, userLogin, otpVerification, getUserDetails, updateUserProfile, getCars, getCar} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware')





//  Login&Signup
router.post('/userSignup',userSignup)
router.post('/userLogin',userLogin)

// OTP
router.post('/otp',otpVerification)

// User Details
router.get('/getUser/:data_id',getUserDetails)
router.put('/updateUser',protect,updateUserProfile)

// Get Car
router.get('/cars',getCars)
router.get('/car', getCar)








module.exports = router;