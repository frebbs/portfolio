const mongoose = require('../db/mongoConnection');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    bio: String,
    emailAddress: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    metaData: {
        accountStatus: {
            active: {type: Boolean, required: true, default: true},
            strike: {type: Boolean, required: true, default: false}
        },
        userCreated: {type: Date, default: Date.now }
    } ,
    security: {
        admin: {type: Boolean, default: false},
        password: {type: String, required: true, select: false}
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'UserPost'
    }]
})

const UserProfile = mongoose.model('UserProfile', userSchema);

module.exports = {
    UserProfile
};