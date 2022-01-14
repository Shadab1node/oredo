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
    pvefeedbacks:[String],
    stars: Number
}, {
    timestamps: true
});

var pfeedback = mongoose.model("pfeedback", feedbackSchema);
module.exports = pfeedback;