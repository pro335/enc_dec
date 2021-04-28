var mongoose = require('mongoose');
jwt = require('jsonwebtoken');
crypto = require('crypto');
const IV_LENGTH = 16; // For AES, this is always 16

var UserSchema = new mongoose.Schema({
    password: {type: String, default: "" },
    salt: {type: String },
});

UserSchema.methods.encrypt = function(password, salt) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(salt), iv);
    let encrypted = cipher.update(password);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + 'g' + encrypted.toString('hex');
};

UserSchema.methods.decrypt = function(password, salt) {
    let textParts = password.split('g');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join('g'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(salt), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
   
    return decrypted.toString();
}

var User = mongoose.model('User', UserSchema);

module.exports = User;
