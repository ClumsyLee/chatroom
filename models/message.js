const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    username: String,
    createdAt: Date,
    body: String,
});

module.exports = mongoose.model('Message', messageSchema);
