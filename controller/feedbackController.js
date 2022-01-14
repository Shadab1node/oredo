const Pfeedback=require("../modal/positivefeedback")
const Nfeedback=require('../modal/negativefeedback')
const Partner=require('../modal/partner.modal')
const Otp=require("../modal/otpModel")
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt");

exports.pfeedback=async (req,res)=>{
   try {
    const pfeedback=new Pfeedback()
    pfeedback.userId=req.body.userId;
    if(req.body.field1){
        pfeedback.pvefeedbacks.push(req.body.field1)
    }
    if(req.body.field2){
        pfeedback.pvefeedbacks.push(req.body.field2)
    }9
    if(req.body.field3){
        pfeedback.pvefeedbacks.push(req.body.field3)
    }
    if(req.body.field4){
        pfeedback.pvefeedbacks.push(req.body.field4)
    }
    if(req.body.field5){
        pfeedback.pvefeedbacks.push(req.body.field5)
    }
    if(req.body.field6){
        pfeedback.pvefeedbacks.push(req.body.field6)
    }
    pfeedback.stars = (5 / 6) * (pfeedback.pvefeedbacks.length)
    pfeedback.save();
    return res.status(200).json({msg:"positive feedback by partner",pfeedback})
   } catch (error) {
    return res.status(500).json({msg:"something went wrong"})
   }
}


exports.nfeedback=async (req,res)=>{
        try {
         const nfeedback=new Nfeedback()
         nfeedback.userId=req.body.userId;
         if(req.body.field1){
            nfeedback.nvefeedbacks.push(req.body.field1)
         }
         if(req.body.field2){
            nfeedback.nvefeedbacks.push(req.body.field2)
         }9
         if(req.body.field3){
            nfeedback.nvefeedbacks.push(req.body.field3)
         }
         if(req.body.field4){
            nfeedback.nvefeedbacks.push(req.body.field4)
         }
         if(req.body.field5){
            nfeedback.nvefeedbacks.push(req.body.field5)
         }
         if(req.body.field6){
            nfeedback.nvefeedbacks.push(req.body.field6)
         }
         if(req.body.field7){
            nfeedback.nvefeedbacks.push(req.body.field7)
         }
         if(req.body.field8){
            nfeedback.nvefeedbacks.push(req.body.field8)
         }
         if(req.body.field9){
            nfeedback.nvefeedbacks.push(req.body.field9)
         }
         if(req.body.field10){
            nfeedback.nvefeedbacks.push(req.body.field10)
         }
         if(req.body.field11){
            nfeedback.nvefeedbacks.push(req.body.field11)
         }
         if(req.body.field12){
            nfeedback.nvefeedbacks.push(req.body.field12)
         }
         if(req.body.field13){
            nfeedback.nvefeedbacks.push(req.body.field13)
         }
         nfeedback.stars = (5 / 13) * (nfeedback.nvefeedbacks.length)
         nfeedback.save();
         return res.status(200).json({msg:"negative feedback by partner",nfeedback})
        } catch (error) {
         return res.status(500).json({msg:"something went wrong"})
        }
     }

     exports.search = async (req, res) => {
      try {
        const {name,phone,aadharCard,panCard,voterId,drivingLicence,vehicleNumber} = req.body;
        const searchtext = await Partner.find({
           $text: { $search: name },
          $text: { $search: phone },
           $text: { $search: aadharCard },
          $text: { $search: panCard }
        });
        console.log(searchtext)
        return res.status(200).json(searchtext);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
      }
    };

    exports.mailsend = async (req, res) => {
      const { email } = req.body;
      if (email === "") {
        res.status(500).json({ msg: "Email is required" });
      } else {
        try {
          const checkUser = await Partner.findOne({ email });
          if (checkUser) {
            let otpData = new Otp({
              email,
              otp: otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false })
            });
    
            let optResponse = await otpData.save();
            mailer(email, otpData.code);
            return res.status(200).json({ msg: "OTP sended to your mail" });
          } else {
            return res.status(400).json({ errors: [{ msg: "Email not exist" }] });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json({ errors: error });
        }
      }
    };
    
    const mailer = (email, otp) => {
      var nodemailer = require("nodemailer");
      let mailTransporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
          user: "apikey",
          pass:
            "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",
        },
      });
      var mailOptions = {
        from: "node1flyweis@gmail.com",
        to: email,
        subject: "OTP for forgot password",
        text: otp,
      };
      mailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    };
    
    exports.verifyOtp = async (req, res) => {
      try {
       var { email, otp } = req.body;
     
       let newotp = await Otp.findOne({ email: email, otp: otp });
       if(!newotp){
         return res.status(400).json({errors: 'wrong otp'})
       }
       if (newotp) {
           var number = req.body.number;
           let user = await Partner.findOne({ email });
           console.log(user.email)
           const salt = await bcrypt.genSalt(10);
           const hash = await bcrypt.hash(req.body.password, salt);
           user.password = hash;
           await user.save();
         //   const token = createToken(user);
           const OTPDelete = await Otp.deleteOne({
            email:email
         });
           return res.status(200).json({ msg: "user login successfully",user });
      }
      } catch (error) {
        console.log(error)
       return res.status(400).json({ errors: [{ msg: "Token Expired" }] });
      }
       }