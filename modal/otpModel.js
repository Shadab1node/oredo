var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const otpSchema = new Schema(
  { 
    email: {
         type: String,
          required: true,
         },
    otp: {
         type: String, 
         required: true
         },
         tokens: {
          type: String,
        },
    createdAt: 
    { 
        type: Date, 
        default: Date.now,
         index: { expires: 10000 },
    },
},
    {
    timestamps: true,
  });

var Otp = mongoose.model("otp", otpSchema);
module.exports = Otp;
