const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    bio: String,
    emailAddress: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: String,
    metaData: {
        admin: {type: Boolean, default: false},
        accountStatus: {
            active: {type: Boolean, required: true, default: true},
            strike: {type: Boolean, required: true, default: false}
        },
        userCreated: {type: Date, default: Date.now }
    } 
})

const UserProfile = mongoose.model('UserProfile', userSchema);

module.exports = {
    UserProfile
};