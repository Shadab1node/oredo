const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    // partnerId:{
    //     type:Schema.Types.ObjectId,
    //     ref:'Partner'
    // },
   userId:{
       type:Schema.Types.ObjectId,
        ref:"Customer"
    },
    nvefeedbacks:[String],
    stars: Number
}, {
    timestamps: true
});

var nfeedback = mongoose.model("nfeedback", feedbackSchema);
module.exports = nfeedback;