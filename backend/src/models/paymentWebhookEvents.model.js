import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentWebhookEventSchema = new Schema(
  {
    provider: {
      type: String,
      required: true,
      enum: ["RAZORPAY"],
    },

    eventId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    eventType: {
      type: String,
      required: true,
    },

    payload: {
      type: Schema.Types.Mixed,
      required: true,
    },

    processed: {
      type: Boolean,
      default: false,
      index: true,
    },

    processedAt: {
      type: Date,
    },

    processingError: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const paymentWebhookEventModel = mongoose.model(
  "PaymentWebhookEvent",
  paymentWebhookEventSchema,
);
