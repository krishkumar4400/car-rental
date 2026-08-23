import mongoose from "mongoose";
import { AvailableMessageRoles } from "../utils/constants.js";

const { Schema } = mongoose;

const aiMessageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "AIConversation",
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: AvailableMessageRoles,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    model: {
      type: String,
    },

    tokenUsage: {
      promptTokens: {
        type: Number,
        default: 0,
      },

      completionTokens: {
        type: Number,
        default: 0,
      },

      totalTokens: {
        type: Number,
        default: 0,
      },
    },

    toolCallId: {
      type: String,
    },

    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
);

aiMessageSchema.index({
  conversationId: 1,
  createdAt: 1,
});

export const AIMessageModel = mongoose.model("AIMessage", aiMessageSchema);
