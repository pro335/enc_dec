var mongoose = require('mongoose');

const uri = process.env.NODE_ENV === 'production' 
  ? "mongodb_clouding_url"
  : "mongodb://localhost:27017/oilApp";

module.exports = () => {
  mongoose.set('useUnifiedTopology', true);
  return mongoose.connect(uri,{useNewUrlParser: true})
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
};