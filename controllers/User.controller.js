var mongoose = require('mongoose');
const User = mongoose.model('User');
var Config = require('../config/config');

exports.defaultApi = async (req, res) => {
    let message = {
        method: "post",
        routes: ["/encryption", "/decryption"],
        param: "password & salt value of 32 digits(4byte)."
    }
    return res.json({ success: true, message: message});
}

exports.encryption = async (req, res) =>  {
    let newUser = new User(req.body);
    let salt = newUser.salt;
    if( salt === undefined || salt === null) {
        console.log("Missing salt variable.");
        res.json({success: false, result: "Missing salt variable." });
    } else if( salt.length !== 32 ) {
        console.log("Missing salt variable.");
        res.json({success: false, result: `Please confirm salt variable. The length should be 32 digits. But length is ${salt.length}.` });
    } else {
        let enc = newUser.encrypt(req.body.password, salt);
        console.log("Encryption: ", enc);
        res.json({success: true, encryption: enc});
    }
};

exports.decryption = async (req, res) =>  {  
    let newUser = new User(req.body);
    let salt = newUser.salt;
    if( salt === undefined || salt === null) {
        console.log("Missing salt variable.");
        res.json({success: false, result: "Missing salt variable." });
    } else if( salt.length !== 32 ) {
        console.log("Salt variable error!!!");
        res.json({success: false, result: `Please confirm salt variable. The length should be 32 digits. But length is ${salt.length}.` });
    } else {
        let dec = newUser.decrypt(req.body.password, salt);
        console.log("Decryption: ", dec);
        res.json({success: true, decryption: dec});
    }
};
