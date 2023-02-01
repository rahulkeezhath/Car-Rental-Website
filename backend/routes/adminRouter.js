const router = require('express').Router();
const {adminLogin,adminUsers} = require('../controllers/adminController')



router.post('/adminLogin',adminLogin)

// Users
router.get('/users',adminUsers)



module.exports = router