const router = require('express').Router();
const {userSignup, userLogin, otpVerification, getUserDetails, updateUserProfile, getCars, getCar, bookCar, myBookings} = require('../controllers/userController');







//  Login&Signup
router.post('/userSignup',userSignup)
router.post('/userLogin',userLogin)

// OTP
router.post('/otp',otpVerification)

// User Details
router.get('/getUser/:data_id',getUserDetails)
router.put('/updateUser',updateUserProfile)

// Get Car
router.get('/cars', getCars)
router.get('/car', getCar)

// Booking Car
router.post('/bookCar', bookCar)
router.get('/myBookings', myBookings)








module.exports = router;