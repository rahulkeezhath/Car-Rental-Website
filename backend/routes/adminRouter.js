const router = require('express').Router();
const {adminLogin,adminUsers,blockUser,unblockUser, AddCars} = require('../controllers/adminController');
const { auth } = require('../middleware/authMiddleware');




router.post('/adminLogin',adminLogin)

// Users
router.get('/users',adminUsers)
router.put('/blockUser/:id',blockUser)
router.put('/unblockUser/:id',unblockUser)
router.post('/addCars',AddCars)




module.exports = router