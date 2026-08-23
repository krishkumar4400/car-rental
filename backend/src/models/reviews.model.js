import mongoose from "mongoose";
import { AvailableReviewStatus, ReviewStatusEnum } from "../utils/constants.js";

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
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

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    status: {
      type: String,
      enum: AvailableReviewStatus,
      default: ReviewStatusEnum.PUBLISHED,
    },
  },
  {
    timestamps: true,
  },
);

reviewSchema.index({
  vehicleId: 1,
  createdAt: -1,
});

export const reviewModel = mongoose.model("Review", reviewSchema);
