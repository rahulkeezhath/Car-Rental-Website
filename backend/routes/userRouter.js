const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware')
const {userSignup, userLogin} = require('../controllers/userController')





router.post('/userSignup',userSignup)
router.post('/userLogin',userLogin)




module.exports = router;