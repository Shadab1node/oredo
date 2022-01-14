const { Customer } = require('../modal');

module.exports = {
    //add
    async addCustomer(payload,partnerId) {
        //const isExist = await Customer.findOne({ email: payload.email });
      //  if (!isExist) {
            const customer = new Customer(payload);
            customer.partnerId.push(partnerId);
            await customer.save();
            if (customer) {
                return { success: true, status: 201, message: "customer added successfully", data: customer };
            } else {
                return { success: false, status: 400, message: "something went wrong" };
            }
       // } else {
         //   return { success: false, status: 400, message: "This Email is already registered please try another email or recover your account" };
       // }

    },

    // update
    async updateCustomer(payload,customerId) {
        const customer = await Customer.findOneAndUpdate({ _id:customerId, isDeleted: false },payload,{new:true});
        if (customer) {
            return { success: true, status: 201, message: "customer updated successfully", data: customer };
            } else {
                return { success: false, status: 400, message: "something went wrong" };
            }
    },

    // get all customer of a partner
    async getAllPartnerCustomer(partnerId){
        const customers = await Customer.find({partnerId:partnerId}, { __v: 0});
        if (customers) {
            return { success: true, status: 201, message: "get all customer data successfully", data: customers };
        } else {
            return { success: false, status: 400, message: "something went wrong" };
        }
    },

    // get single customer
    async getSingle(customerId) {
        const customer = await Customer.findOne({ _id: customerId, isDeleted: false }, { __v: 0});
        if (customer) {
            return { success: true, status: 201, message: "get single customer data successfully", data: customer };
        } else {
            return { success: false, status: 400, message: "something went wrong" };
        }
    },

    

    // pm delete single customer
    async pmDeleteSingle(customerId) {
        const customer = await Customer.findOneAndDelete({ _id: customerId });
        if (customer) {
            return { success: true, status: 201, message: "delete one customer success", data: customer };
        } else {
            return { success: false, status: 400, message: "something went wrong" };
        }
    },

    // add feedback
    async updateCustomer(payload,customerId,partnerId) {
        const customer = await Customer.findOne({ _id:customerId});
        if (customer) {
            const feedbacks = {
                feedback:payload.feedback,
                positive:payload.positive,
                by:partnerId
            }
            customer.feedbacks.push(feedbacks);
            await customer.save();
            return { success: true, status: 201, message: "feedback added  successfully", data: customer };
            } else {
                return { success: false, status: 400, message: "customer not found" };
            }
    },
}