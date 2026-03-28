import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { Schema } = mongoose;

const DEFAULT_SALT_ROUNDS = 10;
const TOKEN_EXPIRES_IN = '7d';

const getSaltRounds = () => {
  const parsed = Number.parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
  if (Number.isNaN(parsed) || parsed < 4) {
    return DEFAULT_SALT_ROUNDS;
  }

  return parsed;
};

const userAuthSchema = new Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  hashPassword: {
    type: String,
    required: true,
    select: false,
  },
});

userAuthSchema.methods.setPassword = async function(password) {
  if (!password) {
    throw new Error('Password is required');
  }

  const hashPassword = await bcrypt.hash(password, getSaltRounds());
  this.hashPassword = hashPassword;
};

userAuthSchema.methods.checkPassword = async function(password) {
  if (!password || !this.hashPassword) {
    return false;
  }

  return bcrypt.compare(password, this.hashPassword);
};

userAuthSchema.statics.findByUserId = function(userId) {
  if (!userId) {
    return null;
  }

  return this.findOne({ userId: userId.trim() })
    .select('+hashPassword');
};

userAuthSchema.methods.generateToken = function() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign(
    { userId: this.userId },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_EXPIRES_IN },
  );
};

const UserAuth = mongoose.model('UserAuth', userAuthSchema);
export default UserAuth;
