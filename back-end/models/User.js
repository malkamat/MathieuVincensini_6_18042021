const mongoose = require("mongoose")
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
const uniqueValidator = require('mongoose-unique-validator');
const dotenv = require("dotenv")

dotenv.config()


const userSchema =  mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
})

userSchema.plugin(uniqueValidator)

userSchema.plugin(mongooseFieldEncryption, { fields: ["email"], secret: process.env.MONGOOSE_ENCRYPTION_KEY, saltGenerator: function (secret) {
    return "1234567890123456"; // should ideally use the secret to return a string of length 16
  }, });




module.exports = mongoose.model("User", userSchema)