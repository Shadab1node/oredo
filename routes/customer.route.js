const express = require('express');
const router = express.Router();
const{customerController}= require('../controller');
const{verifyAccessToken}=require('../middleware/validate')


router.post('/add',verifyAccessToken,customerController.addCustomer);
router.get('/allcustomer',verifyAccessToken,customerController.getAllPartnerCustomer);
router.get('/single/:customerid',customerController.getSingle);
router.patch('/update/:customerid',customerController.updateCustomer)
//router.delete("/pmdeleteall/:partnerid", customerController.pmDeleteAll);
router.delete('/pmdeletesingle/:customerid',customerController.pmDeleteSingle);
router.post('/addfeedback/:customerid',verifyAccessToken,customerController.addFeedback)


module.exports = router;