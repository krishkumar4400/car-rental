import mongoose from "mongoose";
import {
  AvailableBusinessTypes,
  AvailableBusinessVerificationStatus,
  BusinessTypeEnum,
  BusinessVerificationStatusEnum,
} from "../utils/constants.js";

const { Schema } = mongoose;

const ownerProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    businessName: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    businessType: {
      type: String,
      enum: AvailableBusinessTypes,
      default: BusinessTypeEnum.INDIVIDUAL,
    },

    taxId: {
      type: String,
      trim: true,
    },

    verificationStatus: {
      type: String,
      enum: AvailableBusinessVerificationStatus,
      default: BusinessVerificationStatusEnum.PENDING,
      index: true,
    },

    verifiedAt: {
      type: Date,
    },

    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export const ownerProfileModel = mongoose.model(
  "OwnerProfile",
  ownerProfileSchema,
);
