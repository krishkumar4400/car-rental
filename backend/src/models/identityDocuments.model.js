import mongoose from "mongoose";
import {
  AvailableIdentityDocumentTypes,
  AvailableIdentityDocumentVerificationStatus,
  IdentityDocumentVerificationStatusEnum,
} from "../utils/constants.js";

const { Schema } = mongoose;

const identityDocumentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    documentType: {
      type: String,
      enum: AvailableIdentityDocumentTypes,
      required: true,
    },

    documentNumber: {
      type: String,
      required: true,
      trim: true,
    },

    documentUrl: {
      type: String,
      required: true,
      trim: true,
    },

    issuedAt: {
      type: Date,
    },

    expiresAt: {
      type: Date,
    },

    verificationStatus: {
      type: String,
      enum: AvailableIdentityDocumentVerificationStatus,
      default: IdentityDocumentVerificationStatusEnum.PENDING,
      index: true,
    },

    // AI/OCR extracted information
    extractedData: {
      name: String,
      dateOfBirth: Date,
      licenseNumber: String,
      issuingAuthority: String,
    },

    aiVerification: {
      processed: {
        type: Boolean,
        default: false,
      },

      confidence: {
        type: Number,
        min: 0,
        max: 1,
      },

      flags: {
        type: [String],
        default: [],
      },
    },

    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    verifiedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

identityDocumentSchema.index({
  userId: 1,
  documentType: 1,
});

export const identityDocumentModel = mongoose.model(
  "IdentityDocument",
  identityDocumentSchema,
);
