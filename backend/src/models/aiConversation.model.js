import mongoose from "mongoose";
import {
  AIConversationStatus,
  AvailableAIConversationStatus,
  AvailableConversationContextTypes,
  ConversationContextTypeEnum,
} from "../utils/constants.js";

const { Schema } = mongoose;

const aiConversationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    contextType: {
      type: String,
      enum: AvailableConversationContextTypes,
      default: ConversationContextTypeEnum.GENERAL,
    },

    contextId: {
      type: Schema.Types.ObjectId,
    },

    title: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    status: {
      type: String,
      enum: AvailableAIConversationStatus,
      default: AIConversationStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  },
);

aiConversationSchema.index({
  userId: 1,
  updatedAt: -1,
});

export const AIConversationModel = mongoose.model(
  "AIConversation",
  aiConversationSchema,
);
