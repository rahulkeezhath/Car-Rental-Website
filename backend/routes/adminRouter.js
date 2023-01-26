const router = require('express').Router();
const {adminLogin} = require('../controllers/adminController/adminLoginController')


router.post('/adminLogin',adminLogin)


module.exports = router