var user = require("../controllers/User.controller");

module.exports = (app) => {
    app.get("/", user.defaultApi);
    app.post("/encryption", user.encryption);
    app.post("/decryption", user.decryption);
};
