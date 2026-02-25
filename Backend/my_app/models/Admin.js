const mongoose = require('mongoose')


const adminShema = new mongoose.Schema({
    email:String,
    password:String
});

module.exports = mongoose.model('Admin',adminShema)