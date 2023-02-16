const router = require('express').Router();
const {adminLogin,
    adminUsers,blockUser,unblockUser,
    getPlace,addPlace,deletePlace,
    getBrands,addBrand,deleteBrand,
    adminCars,addCars,deleteCar,editCar,adminBookings} 
    = require('../controllers/adminController');





// Login
router.post('/adminLogin',adminLogin)

// Users
router.get('/users',adminUsers)
router.put('/blockUser/:id',blockUser)
router.put('/unblockUser/:id',unblockUser)


// Places
router.get('/getPlaces', getPlace )
router.post('/addPlace',addPlace )
router.delete('/deletePlace',deletePlace )


// Brands
router.get('/getBrands',getBrands)
router.post('/addBrand',addBrand)
router.delete('/deleteBrand',deleteBrand )

// Car
router.get('/cars', adminCars)
router.post('/addCars',addCars )
router.patch('/deleteCar',deleteCar )
router.put('/editCar',editCar )

//Bookings
router.get('/getBookings',adminBookings)

module.exports = router