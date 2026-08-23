import mongoose from "mongoose";
import {
  AvailableNotificationChannels,
  AvailableNotificationStatus,
  AvailableNotificationTypes,
  NotificationChannelEnum,
  NotificationStatusEnum,
} from "../utils/constants.js";

const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: AvailableNotificationTypes,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    channel: {
      type: String,
      enum: AvailableNotificationChannels,
      default: NotificationChannelEnum.IN_APP,
    },

    status: {
      type: String,
      enum: AvailableNotificationStatus,
      default: NotificationStatusEnum.PENDING,
      index: true,
    },

    readAt: {
      type: Date,
    },

    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
);

notificationSchema.index({
  userId: 1,
  status: 1,
  createdAt: -1,
});

export const notificationModel = mongoose.model(
  "Notification",
  notificationSchema,
);
