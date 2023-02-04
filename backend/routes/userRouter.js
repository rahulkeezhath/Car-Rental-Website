const router = require('express').Router();
const {userSignup, userLogin, otpVerification, getUserDetails, updateUserProfile} = require('../controllers/userController');







router.post('/userSignup',userSignup)
router.post('/userLogin',userLogin)
router.post('/otp',otpVerification)
router.get('/getUser/:data_id',getUserDetails)
router.put('/updateUser',updateUserProfile)





module.exports = router;