import mongoose from "mongoose";
import {
  AvailablePaymentStatus,
  AvailableRefundStatus,
  PaymentStatusEnum,
  RefundStatusEnum,
} from "../utils/constants.js";

const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true,
    },

    provider: {
      type: String,
      required: true,
      enum: ["RAZORPAY"],
    },

    providerPaymentId: {
      type: String,
      index: true,
      sparse: true,
    },

    providerOrderId: {
      type: String,
      index: true,
      sparse: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },

    status: {
      type: String,
      enum: AvailablePaymentStatus,
      default: PaymentStatusEnum.PENDING,
      index: true,
    },

    paymentMethod: {
      type: String,
      trim: true,
    },

    refund: {
      amount: {
        type: Number,
        default: 0,
        min: 0,
      },

      status: {
        type: String,
        enum: AvailableRefundStatus,
        default: RefundStatusEnum.NOT_REQUESTED,
      },

      providerRefundId: {
        type: String,
      },

      reason: {
        type: String,
        trim: true,
      },

      refundedAt: {
        type: Date,
      },
    },

    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

paymentSchema.index({
  provider: 1,
  providerPaymentId: 1,
});

export const paymentModel = mongoose.model("Payment", paymentSchema);
