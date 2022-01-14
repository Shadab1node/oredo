const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    partnerId:[{
        type:Schema.Types.ObjectId,
        ref:'Partner'
    }],
    address: {
        type: String,
        default: undefined
    },
    aadharCard: {
        type: Number,
        default: undefined
    },
    panCard: {
        type: String,
        default:undefined
    },
    passport: {
        type: String,
        default: undefined
    },
    voterId: {
        type: String,
        default: undefined
    },
    drivingLicence: {
        type: String,
        default: undefined
    },
    vehicleNumber: {
        type: String,
        default: undefined
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    feedbacks:[{
      feedback:String,
      positive:Boolean,
      by:{
          type:Schema.Types.ObjectId,
          ref:'Partner'
      }  
    }]

}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);