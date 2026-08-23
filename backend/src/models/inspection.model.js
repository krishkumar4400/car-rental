import mongoose from "mongoose";
import {
  AIProcessingStatusEnum,
  AvailableAIProcessingStatus,
  AvailableVehicleImageTypes,
  AvailableVehicleInspectionStatus,
  AvailableVehicleInspectionsTypes,
  VehicleInspectionStatusEnum,
} from "../utils/constants.js";

const { Schema } = mongoose;

const inspectionImageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: AvailableVehicleImageTypes,
      required: true,
    },

    aiProcessed: {
      type: Boolean,
      default: false,
    },

    aiProcessingStatus: {
      type: String,
      enum: AvailableAIProcessingStatus,
      default: AIProcessingStatusEnum.PENDING,
    },
  },
  { _id: true },
);

const inspectionSchema = new Schema(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
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
      enum: AvailableVehicleInspectionsTypes,
      required: true,
    },

    odometer: {
      type: Number,
      required: true,
      min: 0,
    },

    fuelLevel: {
      type: Number,
      min: 0,
      max: 100,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 3000,
    },

    inspectedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: AvailableVehicleInspectionStatus,
      default: VehicleInspectionStatusEnum.DRAFT,
    },

    images: {
      type: [inspectionImageSchema],
      default: [],
    },

    aiSummary: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

inspectionSchema.index({
  bookingId: 1,
  type: 1,
});

inspectionSchema.index({
  vehicleId: 1,
  createdAt: -1,
});

export const inspectionModel = mongoose.model("Inspection", inspectionSchema);
