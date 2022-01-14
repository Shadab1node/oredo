const express = require('express')
const router = express.Router();
const{adminController}= require('../controller');
const {upload_image} = require('../middleware/fileupload');

router.post('/register',adminController.register );
router.post('/login',adminController.login );
router.post('/verifydocuments/:partnerid',adminController.verifyDocuments );

router.get('/allpartner',adminController.getAll);
router.get('/single/:adminid',adminController.getSingle);

router.delete("/pmdeleteall", adminController.pmDeleteAll);
router.delete('/pmdeletesingle/:adminid',adminController.pmDeleteSingle);

router.post('/uploaddocuments/:adminid',upload_image.single('image'),adminController.uploadDocuments);
router.patch('/updatedocuments/:adminid',upload_image.single('image'),adminController.updateDocuments)





module.exports = router;