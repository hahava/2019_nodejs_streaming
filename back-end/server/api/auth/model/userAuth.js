import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT = 10;

const userAuthSchema = new Schema({
  userId: String,
  hashPassword: String,
});

userAuthSchema.methods.setPassword = async function(password) {
  const hashPassword = await bcrypt.hash(password, SALT);
  this.hashPassword = hashPassword;
};

userAuthSchema.methods.checkPassword = async function(password) {
  const result = await bcrypt.compare(password, this.hashPassword);
  return result;
};

userAuthSchema.statics.findByUsername = function(userId) {
  return this.findOne({ userId });
};

const UserAuth = mongoose.model('UserAuth', userAuthSchema);
export default UserAuth;
