import mongoose from "mongoose";
import {
  AvailableFuelTypes,
  AvailableTransmissionTypes,
  AvailableVehicleDocumentTypes,
  AvailableVehicleDocumentVerificationStatus,
  AvailableVehicleImageTypes,
  AvailableVehicleStatus,
  AvailableVehicleTypes,
  VehicleDocumentVerificationStatusEnum,
  VehicleStatusEnum,
} from "../utils/constants.js";

const { Schema } = mongoose;

const vehicleImageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: AvailableVehicleImageTypes,
      required: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: true },
);

const vehicleDocumentSchema = new Schema(
  {
    documentType: {
      type: String,
      enum: AvailableVehicleDocumentTypes,
      required: true,
    },

    documentNumber: {
      type: String,
      trim: true,
    },

    documentUrl: {
      type: String,
      required: true,
      trim: true,
    },

    issuedAt: Date,

    expiresAt: Date,

    verificationStatus: {
      type: String,
      enum: AvailableVehicleDocumentVerificationStatus,
      default: VehicleDocumentVerificationStatusEnum.PENDING,
    },

    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    verifiedAt: Date,

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

      extractedData: {
        registrationNumber: String,
        ownerName: String,
        expiryDate: Date,
      },
    },
  },
  { _id: true },
);

const vehicleSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    variant: {
      type: String,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
      min: 1900,
    },

    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    vin: {
      type: String,
      unique: true,
      sparse: true,
      uppercase: true,
      trim: true,
    },

    vehicleType: {
      type: String,
      enum: AvailableVehicleTypes,
      required: true,
      index: true,
    },

    fuelType: {
      type: String,
      enum: AvailableFuelTypes,
      required: true,
    },

    transmission: {
      type: String,
      enum: AvailableTransmissionTypes,
      required: true,
      index: true,
    },

    seats: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },

    color: {
      type: String,
      trim: true,
    },

    odometer: {
      type: Number,
      default: 0,
      min: 0,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    features: {
      type: [String],
      default: [],
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        required: true,
      },
    },

    images: {
      type: [vehicleImageSchema],
      default: [],
    },

    documents: {
      type: [vehicleDocumentSchema],
      default: [],
    },

    pricing: {
      dailyRate: {
        type: Number,
        required: true,
        min: 0,
      },

      extraKmRate: {
        type: Number,
        default: 0,
        min: 0,
      },

      extraHourRate: {
        type: Number,
        default: 0,
        min: 0,
      },

      securityDeposit: {
        type: Number,
        default: 0,
        min: 0,
      },

      deliveryFee: {
        type: Number,
        default: 0,
        min: 0,
      },

      currency: {
        type: String,
        default: "INR",
        uppercase: true,
      },
    },

    status: {
      type: String,
      enum: AvailableVehicleStatus,
      default: VehicleStatusEnum.DRAFT,
      index: true,
    },

    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    approvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

vehicleSchema.index({
  location: "2dsphere",
});

vehicleSchema.index({
  status: 1,
  vehicleType: 1,
  transmission: 1,
});

vehicleSchema.index({
  ownerId: 1,
  status: 1,
});

export const vehicleModel = mongoose.model("Vehicle", vehicleSchema);
