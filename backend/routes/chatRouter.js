const router = require('express').Router();
const {createChat, getAllChats } = require('../controllers/chatController');


router.post('/',createChat)
router.get('/:userId',getAllChats)


module.exports = router;