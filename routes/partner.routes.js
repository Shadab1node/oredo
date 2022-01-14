const express = require('express');
const router = express.Router();
const{partnerController}= require('../controller');
const {upload_image} = require('../middleware/fileupload')
const{verifyAccessToken}=require('../middleware/validate')

router.post('/register',partnerController.register);
router.post('/login',partnerController.login);
router.get('/allpartner',partnerController.getAll);
router.get('/single/:partnerid',partnerController.getSingle);
router.patch('/resetpassword',verifyAccessToken,partnerController.resetPassword);

//router.patch('/edit/:partnerid',partnerController.edit);
// router.delete('/deleteall',partnerController.deleteAll);
// router.delete('/deletesingle/:partnerid',partnerController.deleteSingle);
// router.patch('restoreall',partnerController.restoreAll);
// router.patch('restoresingle/:partnerid',partnerController.restoreSingle);

router.delete("/pmdeleteall", partnerController.pmDeleteAll);
router.delete('/pmdeletesingle/:partnerid',partnerController.pmDeleteSingle);

router.post('/uploaddocuments/:partnerid',upload_image.single('image'),partnerController.uploadDocuments);
router.patch('/updatedocuments/:partnerid',upload_image.single('image'),partnerController.updateDocuments)
router.post('/searchpartner',partnerController.searchPartner);

module.exports = router;