const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoDB = process.env.MONGODB_URI

mongoose.connect(mongoDB).then(() => console.log("connected to MongoDb successfully")).catch((err) => console.log(err));

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 4,
        maxLength: 30,
        trim: true 
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required : true
    },
    balance: {
        type: Number,
        required : true
    }
})

const User = mongoose.model("PaytmUser", userSchema);
const Account = mongoose.model("PaytmAccount", accountSchema);

module.exports = {
    User, Account
};