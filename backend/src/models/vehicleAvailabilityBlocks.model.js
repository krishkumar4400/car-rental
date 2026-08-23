import mongoose from "mongoose";
import { AvailableVehicleAvailabilityBlockReasons } from "../utils/constants.js";

const { Schema } = mongoose;

const vehicleAvailabilityBlockSchema = new Schema(
  {
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
      index: true,
    },

    startTime: {
      type: Date,
      required: true,
      index: true,
    },

    endTime: {
      type: Date,
      required: true,
      index: true,
    },

    reason: {
      type: String,
      enum: AvailableVehicleAvailabilityBlockReasons,
      required: true,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  },
);

vehicleAvailabilityBlockSchema.index({
  vehicleId: 1,
  startTime: 1,
  endTime: 1,
});

export const vehicleAvailabilityBlockModel = mongoose.model(
  "VehicleAvailabilityBlock",
  vehicleAvailabilityBlockSchema,
);
