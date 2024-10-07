
const { required } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type:String,required:true},  
  aadharCard: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
  email:{type:String,required:true}
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
