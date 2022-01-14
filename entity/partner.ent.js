const { Partner } = require('../modal');
const fs = require('fs');
const{signAccessToken}=require('../middleware/validate')

module.exports = {
    //register
    async register(payload) {
        const isExist = await Partner.findOne({ email: payload.email });
        if (!isExist) {
            const partner = new Partner(payload);
            await partner.save();
            if (partner) {
                return { success: true, status: 201, message: "partner registerd successfully", data: partner };
            } else {
                return { success: false, status: 400, message: "something went wrong" };
            }
        } else {
            return { success: false, status: 400, message: "This Email is already registered please try another email or recover your account" };
        }
    },
    // login
    async login(payload) {
        const partner = await Partner.findOne({ email: payload.email});
        if (partner) {
            const verifyPassword = await partner.isValidPassword(payload.password);
            if (verifyPassword) {
                const accessToken = await signAccessToken(partner.id);
                console.log(partner.id)
                return { success: true, status: 201, message: "partner login successfully", data: partner,accessToken:accessToken };
            } else {
                return { success: false, status: 400, message: "email or password is incorrect" };
            }
        } else {
            return { success: false, status: 400, message: "email or password is incorrect" };
        }
    },

    // get all partner
    async getAll() {
        const partners = await Partner.find({ isDeleted: false }, { __v: 0, password: 0 });
        if (partners) {
            return { success: true, status: 201, message: "get all partner data successfully", data: partners };
        } else {
            return { success: false, status: 400, message: "something went wrong" };
        }
    },

    // get single partner
    async getSingle(partnerId) {
        const partner = await Partner.findOne({ _id: partnerId, isDeleted: false }, { __v: 0, password: 0 });
        if (partner) {
            return { success: true, status: 201, message: "get single partner data successfully", data: partner };
        } else {
            return { success: false, status: 400, message: "something went wrong" };
        }
    },

    // pm delete all partner
    async pmDeleteAll() {
        const partners = await Partner.deleteMany({});
        if (partners) {
            return { success: true, status: 201, message: "delete all partner success", data: partners };
        } else {
            return { success: false, status: 400, message: "something went wrong" };
        }
    },

    // pm delete single partner
    async pmDeleteSingle(partnerId) {
        const partner = await Partner.findOneAndDelete({ _id: partnerId, isDeleted: false });
        if (partner) {
            return { success: true, status: 201, message: "delete one partner success", data: partner };
        } else {
            return { success: false, status: 400, message: "something went wrong" };
        }
    },

    //reset password
     async resetPassword(partnerId,payload){
         if(payload.otp=="123123"){
         const partner = await Partner.findOneAndUpdate({_id:partnerId,isDeleted:false},{password:payload.password},{new:true});
         await partner.save();
         if(partner){
                 return{success:true,status:201,message:"reset password success",data:partner};
             }else{
                 return{success:false,status:400,message:"user not found"};
                }}else{
                 return{success:false,status:400,message:"otp does not match"};
             }
     },

    // upload documents
    async uploadDocuments(partnerId, payload) {
        const partner = await Partner.findOneAndUpdate({ _id: partnerId, isDeleted: false }, { ...payload }, { new: true });
        if (partner) {
            return { success: true, status: 201, message: "documents uploaded", data: partner };
        } else {
            return { success: false, status: 400, message: "user not found" };
        }
    },
    // update documents
    async updateDocuments(partnerId, payload) {
        const user = await Partner.findOne({ _id: partnerId, isDeleted: false });
        if (payload.image) {
            fs.unlink(user.image.link, (err) => {
                if (err) {
                    console.log("previous image not found (when deleting)")
                } else { console.log(`successfully deleted previous image ${user.image.link}`); }
            });
        }
        const partner = await Partner.findOneAndUpdate({ _id: partnerId, isDeleted: false }, { ...payload }, { new: true });
        if (partner) {
            return { success: true, status: 201, message: "documents updated", data: partner };
        } else {
            return { success: false, status: 400, message: "user not found" };
        }
    },
    // search partner
    async searchPartner(payload){
        const partner = await Partner.findOne(payload);
        if (partner) {
            return { success: true, status: 201, message: "get  partner data successfully", data: partner };
        } else {
            return { success: false, status: 400, message: "something went wrong" };
        }
    },


}