const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMognoose = require('passport-local-mongoose');

const UserSchema = new Schema ({
    email: {
        type: String,
        require: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMognoose);

module.exports = mongoose.model('User', UserSchema);
