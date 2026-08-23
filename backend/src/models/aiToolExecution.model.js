import mongoose from "mongoose";
import {
  AIToolsExecutionStatusEnum,
  AvailableAIToolsExecutionStatus,
} from "../utils/constants.js";

const { Schema } = mongoose;

const aiToolExecutionSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "AIConversation",
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    toolName: {
      type: String,
      required: true,
      index: true,
    },

    input: {
      type: Schema.Types.Mixed,
      default: {},
    },

    output: {
      type: Schema.Types.Mixed,
    },

    status: {
      type: String,
      enum: AvailableAIToolsExecutionStatus,
      default: AIToolsExecutionStatusEnum.PENDING,
    },

    error: {
      type: String,
    },

    executionTimeMs: {
      type: Number,
    },

    requiresApproval: {
      type: Boolean,
      default: false,
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

aiToolExecutionSchema.index({
  conversationId: 1,
  createdAt: 1,
});

aiToolExecutionSchema.index({
  toolName: 1,
  status: 1,
});

export const AIToolExecution = mongoose.model(
  "AIToolExecution",
  aiToolExecutionSchema,
);
