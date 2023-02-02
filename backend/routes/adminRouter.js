const router = require('express').Router();
const {adminLogin,adminUsers,blockUser,unblockUser} = require('../controllers/adminController');




router.post('/adminLogin',adminLogin)

// Users
router.get('/users',adminUsers)
router.put('/blockUser/:id',blockUser)
router.put('/unblockUser/:id',unblockUser)




module.exports = router