const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const fs = require('fs');

const partnerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        default:false
    },
    image: {
        filename: {
            type: String,
            default:false
        },
        filetype: {
            type: String,
            default:false
        },
        filesize: {
            type: String,
            default:false
        },
        link: {
            type: String,
            default:false
        }
    },
    aadharCard: {
        type: Number,
        default:false
    },
    panCard: {
        type: String,
        default:false
    },
    passport: {
        type: String,
        default:false
    },
    voterId: {
        type: String,
        default:false
    },
    drivingLicence: {
        type: String,
        default:false
    },
    vehicleNumber: {
        type: String,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    }

}, {
    timestamps: true
});

// hash password before saving to database
partnerSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password, salt)
        this.password = hashPassword
        next()
    } catch (error) {
        next(error);
    }
});
partnerSchema.pre('findOneAndDelete', async function (next) {
    const docToDelete = await this.model.findOne(this.getQuery());
    try {
        if(docToDelete.image.link){
        fs.unlink(`src/${docToDelete.image.link}`, (err) => {
            if (err) {
                console.log("previous image not found (when deleting)")
            } else {
                console.log(`successfully deleted previous image ${docToDelete.image.link}`);
            }
        });
    }
        next()
    } catch (error) {
        next(error);
    }
});
partnerSchema.pre('findOneAndUpdate', async function (next) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    try {
        if(docToUpdate.image.link){
        fs.unlink(`src/${docToUpdate.image.link}`, (err) => {
            if (err) {
                console.log("previous image not found (when deleting)")
            } else {
                console.log(`successfully deleted previous image ${docToUpdate.image.link}`);
            }
        });
    }
        next()
    } catch (error) {
        next(error);
    }
});

// validate Password
partnerSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}


module.exports = mongoose.model('Partner', partnerSchema);