const mongoose = require('mongoose');

let db = mongoose.connection;
mongoose.connect(
    'mongodb://192.168.0.65:27017/JADdb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);

module.exports = mongoose;