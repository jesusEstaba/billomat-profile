const mongoose = require('mongoose');
const User = require('../models/User');

function all() {
    return User.find().exec();
}

function findOrNull(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    return User.findById(id).exec();
}

function save(user) {
    return (new User(user)).save();
}

function update(entity, properties) {
    const user = entity;
    let updated = false;

    if (properties.name != null) {
        updated = true;
        user.name = properties.name;
    }

    if (properties.age != null) {
        updated = true;
        user.age = properties.age;
    }

    if (properties.bio != null) {
        updated = true;
        user.bio = properties.bio;
    }

    if (properties.image != null) {
        updated = true;
        user.image = properties.image;
    }

    if (updated) {
        user.save();
    }
}

function remove(user) {
    user.remove();
}

module.exports = {
    all,
    findOrNull,
    save,
    update,
    remove,
};
