const express = require('express');
const { isAdminAuthenticated } = require('../auth/auth')
const { sendMessage, getAllMessages, replyToMessage } = require('../controller/messageController');

const router = express.Router();

router.post('/send', sendMessage)
router.get('/getall', isAdminAuthenticated, getAllMessages)
router.post('/reply', replyToMessage)

module.exports = router