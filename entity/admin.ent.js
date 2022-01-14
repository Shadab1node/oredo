const { Admin , Partner } = require('../modal');
const fs = require('fs')

module.exports = {
    //register
    async register(payload) {
        const isExist = await Admin.findOne({ email: payload.email });
        if (!isExist) {
            const admin = new Admin(payload);
            await admin.save();
            if (admin) {
                return { success: true, status: 201, message: "admin registerd successfully", data: admin };
            } else {
                return { success: false, status: 400, message: "something went wrong" };
            }
        } else {
            return { success: false, status: 400, message: "This Email is already registered please try another email or recover your account" };
        }

    },

    // login
    async login(payload) {
        const admin = await Admin.findOne({ email: payload.email, isDeleted: false });
        if (admin) {
            const verifyPassword = await Admin.isValidPassword(payload.password);
            if (verifyPassword) {
                return { success: true, status: 201, message: "admin login successfully", data: admin };
            } else {
                return { success: false, status: 400, message: "email or password is incorrect" };
            }
        } else {
            return { success: false, status: 400, message: "email or password is incorrect" };
        }
    },

    // get all admin
    async getAll() {
        const admins = await Admin.find({ isDeleted: false }, { __v: 0, password: 0 });
        if (admins) {
            return { success: true, status: 201, message: "get all admin data successfully", data: admins };
        } else {
            return { success: false, status: 400, message: "something went wrong" };
        }
    },

    // get single admin
    async getSingle(adminId) {
        const admin = await Admin.findOne({ _id: adminId, isDeleted: false }, { __v: 0, password: 0 });
        if (admin) {
            return { success: true, status: 201, message: "get single admin data successfully", data: admin };
        } else {
            return { success: false, status: 400, message: "something went wrong" };
        }
    },
     // verify documents
     async verifyDocuments(partnerId,isVerified) {
        const result = await Partner.findOneAndUpdate({ _id: partnerId}, {isVerified:isVerified}, { new: true });
        if (result) {
            return { success: true, status: 201, message: "documents uploaded", data:result };
        } else {
            return { success: false, status: 400, message: "user not found" };
        }
    },

    // pm delete all admin
    async pmDeleteAll() {
        const admins = await Admin.deleteMany({});
        if (admins) {
            return { success: true, status: 201, message: "delete all admin success", data: admins };
        } else {
            return { success: false, status: 400, message: "something went wrong" };
        }
    },

    // pm delete single admin
    async pmDeleteSingle(adminId) {
        const admin = await Admin.findOneAndDelete({ _id: adminId, isDeleted: false });
        if (admin) {
            return { success: true, status: 201, message: "delete one admin success", data: admin };
        } else {
            return { success: false, status: 400, message: "something went wrong" };
        }
    },

    // // reset password
    // async resetPassword(adminId,payload){
    //     const admin = await admin.findOne({_id:adminId,isDeleted:false});
    //     if(admin){
    //         admin.password = password
    //             return{success:true,status:201,message:"reset password success",data:admin};
    //         }else{
    //             return{success:false,status:400,message:"user not found"};
    //         }
    // },

    // upload documents
    async uploadDocuments(adminId, payload) {
        const admin = await Admin.findOneAndUpdate({ _id: adminId, isDeleted: false }, { ...payload }, { new: true });
        if (admin) {
            return { success: true, status: 201, message: "documents uploaded", data: admin };
        } else {
            return { success: false, status: 400, message: "user not found" };
        }
    },
    // upload documents
    async updateDocuments(adminId, payload) {
        const user = await Admin.findOne({ _id: adminId, isDeleted: false });
        if (payload.image) {
            fs.unlink(user.image.link, (err) => {
                if (err) {
                    console.log("previous image not found (when deleting)")
                } else { console.log(`successfully deleted previous image ${user.image.link}`); }
            });
        }
        const admin = await Admin.findOneAndUpdate({ _id: adminId, isDeleted: false }, { ...payload }, { new: true });
        if (admin) {
            return { success: true, status: 201, message: "documents updated", data: admin };
        } else {
            return { success: false, status: 400, message: "user not found" };
        }
    },


}