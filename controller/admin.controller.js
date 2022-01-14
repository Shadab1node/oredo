const {adminEnt} = require('../entity');


module.exports={
    // register admin
    async register(req,res,next){
        try{
        const payload = req.body;
        const result = await adminEnt.register(payload);
        if(result.success){
            res.status(result.status).json({
                success:result.success,
                message: result.message,
                data:result.data
            })
        }else{
            res.status(result.status).json({
                success:result.success,
                message: result.message
            })
        }
    }catch(e){
        next(e)
    }
    },

    // login admin
    async login(req,res,next){
        try{
            const payload = req.body;
            const result = await adminEnt.login(payload);
            if(result.success){
                res.status(result.status).json({
                    success:result.success,
                    message: result.message,
                    data:result.data
                })
            }else{
                res.status(result.status).json({
                    success:result.success,
                    message: result.message
                })
            }
        }catch(e){
            next(e)
        }
    },
    // get all admin
    async getAll(req,res,next){
        try{
            const result = await adminEnt.getAll();
            if(result.success){
                res.status(result.status).json({
                    success:result.success,
                    message: result.message,
                    data:result.data
                })
            }else{
                res.status(result.status).json({
                    success:result.success,
                    message: result.message
                })
            }
        }catch(e){
            next(e)
        }
    },


    async verifyDocuments(req,res,next){
        try{
            const isVerified = req.body.isVerified;
            const partnerId = req.params.partnerid;
            const result = await adminEnt.verifyDocuments(partnerId,isVerified);
            if(result.success){
                res.status(result.status).json({
                    success:result.success,
                    message: result.message,
                    data:result.data
                })
            }else{
                res.status(result.status).json({
                    success:result.success,
                    message: result.message
                })
            }
            
        }catch(e){
            next(e)
        }
    },

    // get single admin
    async getSingle(req,res,next){
        try{
            const adminId = req.params.adminid;
            const result = await adminEnt.getSingle(adminId);
            if(result.success){
                res.status(result.status).json({
                    success:result.success,
                    message: result.message,
                    data:result.data
                })
            }else{
                res.status(result.status).json({
                    success:result.success,
                    message: result.message
                })
            }
        }catch(e){
            next(e)
        }
    },

    // permanent delete all admin
    async pmDeleteAll(req,res,next){
        try{
            const result = await adminEnt.pmDeleteAll();
            if(result.success){
                res.status(result.status).json({
                    success:result.success,
                    message: result.message,
                    data:result.data
                })
            }else{
                res.status(result.status).json({
                    success:result.success,
                    message: result.message
                })
            }
        }catch(e){
            next(e)
        }
    },

    //permanent delete single admin
    async pmDeleteSingle(req,res,next){
        try{
            const adminId = req.params.adminid;
            const result = await adminEnt.pmDeleteSingle(adminId);
            if(result.success){
                res.status(result.status).json({
                    success:result.success,
                    message: result.message,
                    data:result.data
                })
            }else{
                res.status(result.status).json({
                    success:result.success,
                    message: result.message
                })
            }
        }catch(e){
            next(e)
        }
    },

    // // reset password
    // async resetPassword(req,res,next){
    //     try{
    //         const adminId = req.params.adminid;
    //         let payload = rew.body;
    //         const result = await adminEnt.resetPassword(adminId,payload);
    //         if(result.success){
    //             res.status(result.status).json({
    //                 success:result.success,
    //                 message: result.message,
    //                 data:result.data
    //             })
    //         }else{
    //             res.status(result.status).json({
    //                 success:result.success,
    //                 message: result.message
    //             })
    //         }
    //     }catch(e){
    //         next(e)
    //     }
    // },

    // upload documents
    async uploadDocuments(req,res,next){
        try{
            let payload = req.body;
            let image = {};
            if(req.file){
               image ={
                      filename: req.file.filename,
                      filetype: req.file.mimetype,
                      filesize: req.file.size,
                      link:'src/public/image/' + req.file.filename
                }
                payload.image= image;
             }
            const adminId = req.params.adminid;
            const result = await adminEnt.uploadDocuments(adminId,payload);
            if(result.success){
                res.status(result.status).json({
                    success:result.success,
                    message: result.message,
                    data:result.data
                })
            }else{
                res.status(result.status).json({
                    success:result.success,
                    message: result.message
                })
            }
        }catch(e){
            next(e)
        }
    },

    // update documents
    async updateDocuments(req,res,next){
        try{
            let payload = req.body;
            let image = {};
            if(req.file){
               image ={
                      filename: req.file.filename,
                      filetype: req.file.mimetype,
                      filesize: req.file.size,
                      link:'src/public/image/' + req.file.filename
                }
                payload.image= image;
             }
            const adminId = req.params.adminid;
            const result = await adminEnt.updateDocuments(adminId,payload);
            if(result.success){
                res.status(result.status).json({
                    success:result.success,
                    message: result.message,
                    data:result.data
                })
            }else{
                res.status(result.status).json({
                    success:result.success,
                    message: result.message
                })
            }
        }catch(e){
            next(e)
        }
    },

    
}

