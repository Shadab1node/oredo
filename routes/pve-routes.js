
const{feedbackController}= require('../controller');
const express = require('express');
const router = express.Router();


router.post('/pfeedback',feedbackController.pfeedback);
router.post('/nfeedback',feedbackController.nfeedback)
router.get('/search',feedbackController.search)
router.post('/mailsend',feedbackController.mailsend)
router.post('/verifyOtp',feedbackController.verifyOtp)

module.exports = router;
