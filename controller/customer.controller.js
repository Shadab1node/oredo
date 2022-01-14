const {customerEnt} = require('../entity');


module.exports={
    // add customer
    async addCustomer(req,res,next){
        try{
        const payload = req.body;
        const partnerId = req.payload.aud;
        const result = await customerEnt.addCustomer(payload,partnerId);
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

    // update customer
    async updateCustomer(req,res,next){
        try{
            const payload = req.body;
            const customerId = req.params.customerid;
            const result = await customerEnt.updateCustomer(payload,customerId);
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
    // get all customer of a partner
    async getAllPartnerCustomer(req,res,next){
        try{
            const partnerId = req.paylaod.aud;
            const result = await customerEnt.getAllPartnerCustomer(partnerId);
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

    // get single customer
    async getSingle(req,res,next){
        try{
            const customerId = req.params.customerid;
            const result = await customerEnt.getSingle(customerId);
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

    // permanent delete all customer of partner
    // async pmDeleteAll(req,res,next){
    //     try{
    //         const partnerId = req.params.partnerid;
    //         const result = await customerEnt.pmDeleteAll(partnerId);
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
   
    //permanent delete single customer
    async pmDeleteSingle(req,res,next){
        try{
            const customerId = req.params.customerid;
            const result = await customerEnt.pmDeleteSingle(customerId);
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
          
     // add feedback
     async addFeedback(req,res,next){
        try{
            const payload = req.body;
            const customerId = req.params.customerid;
            const partnerId = req.payload.aud;
            const result = await customerEnt.updateCustomer(payload,customerId,partnerId);
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

