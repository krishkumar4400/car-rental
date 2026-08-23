import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import {
  AddressTypeEnum,
  AvailableAddressTypes,
  AvailableUserAccountStatus,
  AvailableUserRoles,
  UserAccountStatusEnum,
  UserRolesEnum,
} from "../utils/constants.js";

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    type: {
      type: String,
      enum: AvailableAddressTypes,
      default: AddressTypeEnum.HOME,
    },

    label: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    addressLine1: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    addressLine2: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      default: "India",
      trim: true,
    },

    postalCode: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        default: undefined,
      },
    },
  },
  { _id: true },
);

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      index: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.CUSTOMER,
      index: true,
    },

    status: {
      type: String,
      enum: AvailableUserAccountStatus,
      default: UserAccountStatusEnum.PENDING_VERIFICATION,
      index: true,
    },

    profile: {
      firstName: {
        type: String,
        trim: true,
        maxlength: 100,
      },

      lastName: {
        type: String,
        trim: true,
        maxlength: 100,
      },

      dateOfBirth: {
        type: Date,
      },

      profileImageUrl: {
        type: String,
        trim: true,
      },
    },

    verification: {
      emailVerified: {
        type: Boolean,
        default: false,
      },

      phoneVerified: {
        type: Boolean,
        default: false,
      },

      emailVerificationToken: {
        type: String,
      },
      emailVerificationTokenExpiry: {
        type: Date,
      },
    },

    addresses: {
      type: [addressSchema],
      default: [],
    },

    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({
  "addresses.location": "2dsphere",
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      userId: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRY,
    },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      userId: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_SECRET_EXPIRY,
    },
  );
};

userSchema.methods.generateTemporaryToken = async function () {
  const unHashedToken = crypto.randomBytes(20).toString();
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");
  const tokenExpiry = 20 * 60 * 1000;

  return {
    unHashedToken,
    hashedToken,
    tokenExpiry,
  };
};

export const userModel = mongoose.model("User", userSchema);
