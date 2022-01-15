const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: String,
    age: Number,
    bio: String,
    image: String,
});

module.exports = model('User', userSchema);
