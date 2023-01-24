const router = require('express').Router();
const {userSignup} = require('../controllers/userController/signupController')
const {userLogin} = require('../controllers/userController/loginController')



router.post('/userSignup',userSignup)
router.post('/userLogin',userLogin)



module.exports = router;