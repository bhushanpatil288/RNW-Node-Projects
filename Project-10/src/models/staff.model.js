const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const staffSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'First name is required'],
      maxlength: 45,
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, 'Last name is required'],
      maxlength: 45,
      trim: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: [true, 'Address is required'],
    },
    email: {
      type: String,
      maxlength: 50,
      trim: true,
      lowercase: true,
      default: null,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: [true, 'Store is required'],
    },
    active: {
      type: Boolean,
      default: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      maxlength: 16,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false, // Don't include password by default in queries
    },
    picture: {
      type: Buffer,
      default: null,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_update' },
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.picture;
        return ret;
      },
    },
  }
);

// Hash password before saving
staffSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
staffSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

staffSchema.index({ store: 1 });

module.exports = mongoose.model('Staff', staffSchema);
