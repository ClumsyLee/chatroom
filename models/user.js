const crypto = require('crypto');
const mongoose = require('mongoose');

const ITERATIONS = 100000;
const KEYLEN = 512;
const DIGEST = 'sha512';

const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: Buffer,
    salt: Buffer,
});

userSchema.methods.calculateHash = function(password) {
    return crypto.pbkdf2Sync(
        password,
        this.salt,
        ITERATIONS,
        KEYLEN,
        DIGEST
    );
};

userSchema.methods.setup = function(username, password) {
    this.username = username;
    this.salt = crypto.randomBytes(16);
    this.passwordHash = this.calculateHash(password);
};

userSchema.methods.verify = function(password) {
    return this.calculateHash(password).equals(this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
