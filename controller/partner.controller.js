const {partnerEnt} = require('../entity');


module.exports={
    // register partner
    async register(req,res,next){
        try{
        const payload = req.body;
        const result = await partnerEnt.register(payload);
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

    // login partner
    async login(req,res,next){
        try{
            const payload = req.body;
            const result = await partnerEnt.login(payload);
            if(result.success){
                res.status(result.status).json({
                    success:result.success,
                    message: result.message,
                    data:result.data,
                    accessToken:result.accessToken
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
    // get all partner
    async getAll(req,res,next){
        try{
            const result = await partnerEnt.getAll();
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

    // get single partner
    async getSingle(req,res,next){
        try{
            const partnerId = req.params.partnerid;
            const result = await partnerEnt.getSingle(partnerId);
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

    // permanent delete all partner
    async pmDeleteAll(req,res,next){
        try{
            const result = await partnerEnt.pmDeleteAll();
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
   
    //permanent delete single partner
    async pmDeleteSingle(req,res,next){
        try{
            const partnerId = req.params.partnerid;
            const result = await partnerEnt.pmDeleteSingle(partnerId);
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

     // reset password
     async resetPassword(req,res,next){
         try{
             const partnerId = req.payload.aud;
             let payload = req.body;
       const result = await partnerEnt.resetPassword(partnerId,payload);
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

    // upload documents
    async uploadDocuments(req,res,next){
        try{
            let payload = req.body;
            if(req.file){
              let image ={
                      filename: req.file.filename,
                      filetype: req.file.mimetype,
                      filesize: req.file.size,
                      link:'public/image/' + req.file.filename
                }
                payload.image= image;
             }
            const partnerId = req.params.partnerid;
            const result = await partnerEnt.uploadDocuments(partnerId,payload);
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
            if(req.file){
             let image={
                      filename: req.file.filename,
                      filetype: req.file.mimetype,
                      filesize: req.file.size,
                      link:'public/image/' + req.file.filename
                }
                payload.image= image;
             }
            const partnerId = req.params.partnerid;
            const result = await partnerEnt.updateDocuments(partnerId,payload);
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

    //searchpartner
    async searchPartner(req,res,next){
        try{
            const payload = req.body;
            const result = await partnerEnt.getSingle(payload);
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

