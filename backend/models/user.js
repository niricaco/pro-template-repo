const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true }, //empty is not enough
    content: { type: String }, //empty string is enough
    isDone: { type: Boolean, default: false },
});

const dashboardSchema = new mongoose.Schema({
    title: { type: String, required: true }, //empty is not enough
    todos: [todoSchema], // empty list is default?
});

const userSchema = new mongoose.Schema({
    username: { type: String }, //empty string is not enough
    /*googleId: { type: String, unique: true, required: true }, //empty is not enough, maybe validation !!!unique*/
    providers: {
        google: { type: String, unique: true },
        facebook: { type: String, unique: true }
    },
    //password: { type: String, required: true },
    dashboards: [dashboardSchema], // empty list is default?
});

const User = mongoose.model('User', userSchema);

module.exports = User;