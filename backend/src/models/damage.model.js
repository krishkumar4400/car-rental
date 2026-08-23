import mongoose from "mongoose";
import {
  AvailableDamageSeverity,
  AvailableDamageStatus,
  AvailableDamageTypes,
  DamageStatusEnum,
} from "../utils/constants.js";

const { Schema } = mongoose;

const damageSchema = new Schema(
  {
    inspectionId: {
      type: Schema.Types.ObjectId,
      ref: "Inspection",
      required: true,
      index: true,
    },

    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: AvailableDamageTypes,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    severity: {
      type: String,
      enum: AvailableDamageSeverity,
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    aiDetected: {
      type: Boolean,
      default: false,
    },

    aiConfidence: {
      type: Number,
      min: 0,
      max: 1,
    },

    sourceImageId: {
      type: Schema.Types.ObjectId,
    },

    status: {
      type: String,
      enum: AvailableDamageStatus,
      default: DamageStatusEnum.DETECTED,
      index: true,
    },

    estimatedCost: {
      type: Number,
      min: 0,
    },

    confirmedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    confirmedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

damageSchema.index({
  inspectionId: 1,
  status: 1,
});

export const damageModel = mongoose.model("Damage", damageSchema);
