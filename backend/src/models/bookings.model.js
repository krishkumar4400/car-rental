import mongoose from "mongoose";
import {
  AvailableBookingStatus,
  AvailableSecurityDeposit,
  BookingStatusEnum,
  SecurityDepositEnum,
} from "../utils/constants.js";

const { Schema } = mongoose;

const locationSnapshotSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    addressLine1: {
      type: String,
      required: true,
      trim: true,
    },

    addressLine2: {
      type: String,
      trim: true,
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
    },

    postalCode: {
      type: String,
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
      },
    },
  },
  { _id: false },
);

const pricingSnapshotSchema = new Schema(
  {
    dailyRate: {
      type: Number,
      required: true,
    },

    extraKmRate: {
      type: Number,
      default: 0,
    },

    extraHourRate: {
      type: Number,
      default: 0,
    },

    deliveryFee: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      required: true,
    },

    pricingRulesApplied: {
      type: [String],
      default: [],
    },
  },
  { _id: false },
);

const statusHistorySchema = new Schema(
  {
    fromStatus: {
      type: String,
    },

    toStatus: {
      type: String,
      required: true,
    },

    changedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reason: {
      type: String,
      trim: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true },
);

const bookingSchema = new Schema(
  {
    bookingNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
      index: true,
    },

    pickupLocation: {
      type: locationSnapshotSchema,
      required: true,
    },

    returnLocation: {
      type: locationSnapshotSchema,
      required: true,
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

    status: {
      type: String,
      enum: AvailableBookingStatus,
      default: BookingStatusEnum.PENDING_PAYMENT,
      index: true,
    },

    pricingSnapshot: {
      type: pricingSnapshotSchema,
      required: true,
    },

    baseAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    discountAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    taxAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    deliveryFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    securityDeposit: {
      amount: {
        type: Number,
        default: 0,
        min: 0,
      },

      status: {
        type: String,
        enum: AvailableSecurityDeposit,
        default: SecurityDepositEnum.NOT_REQUIRED,
      },

      deductedAmount: {
        type: Number,
        default: 0,
        min: 0,
      },

      refundedAmount: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },

    cancellation: {
      cancelledAt: Date,

      cancelledBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },

      reason: {
        type: String,
        trim: true,
      },
    },

    statusHistory: {
      type: [statusHistorySchema],
      default: [],
    },

    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

bookingSchema.index({
  vehicleId: 1,
  startTime: 1,
  endTime: 1,
});

bookingSchema.index({
  customerId: 1,
  createdAt: -1,
});

bookingSchema.index({
  vehicleId: 1,
  status: 1,
});

export const bookingModel = mongoose.model("Booking", bookingSchema);
