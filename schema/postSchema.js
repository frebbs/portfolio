const mongoose = require('../db/mongoConnection');

const Schema = mongoose.Schema;

let postSchema = new Schema({
    title: String,
    body: String,
    postImg: String,
    createdOn: {type: Date, default: Date.now },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile'
    }
})


const UserPost = mongoose.model('UserPost', postSchema);

module.exports = {
    UserPost
};