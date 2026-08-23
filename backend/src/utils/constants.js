const UserRolesEnum = {
  CUSTOMER: "customer",
  FLEET_OWNER: "fleet_owner",
  ADMIN: "admin",
};

const AvailableUserRoles = Object.values(UserRolesEnum);

const UserAccountStatusEnum = {
  ACTIVE: "active",
  SUSPENDED: "suspended",
  BLOCKED: "blocked",
  PENDING_VERIFICATION: "pending_verification",
};

const AvailableUserAccountStatus = Object.values(UserAccountStatusEnum);

const BusinessTypeEnum = {
  INDIVIDUAL: "individual",
  BUSINESS: "business",
};

const AvailableBusinessTypes = Object.values(BusinessTypeEnum);

const AddressTypeEnum = {
  HOME: "home",
  BUSINESS: "business",
  OTHER: "other",
};

const AvailableAddressTypes = Object.values(AddressTypeEnum);

const IdentityDocumentTypeEnum = {
  DRIVING_LICENSE: "driving_licence",
  GOVERNMENT_ID: "government_id",
};

const AvailableIdentityDocumentTypes = Object.values(DocumentTypeEnum);

const IdentityDocumentVerificationStatusEnum = {
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
  EXPIRED: "expired",
};

const AvailableIdentityDocumentVerificationStatus = Object.values(
  IdentityDocumentTypeEnum,
);

const VehicleTypeEnum = {
  HATCHBACK: "hatchback",
  SEDAN: "sedan",
  SUV: "suv",
  MUV: "muv",
  LUXURY: "luxury",
};

const AvailableVehicleTypes = Object.values(VehicleTypeEnum);

const FuelTypesEnum = {
  PETROL: "petrol",
  DIESEL: "diesel",
  ELECTRIC: "electric",
  HYBRID: "hybrid",
  CNG: "cng",
};

const AvailableFuelTypes = Object.values(FuelTypesEnum);

const TransmissionTypesEnum = {
  MANUAL: "manual",
  AUTOMATIC: "automatic",
};

const AvailableTransmissionTypes = Object.values(TransmissionTypesEnum);

const VehicleStatusEnum = {
  DRAFT: "draft",
  PENDING_APPROVAL: "pending_approval",
  ACTIVE: "active",
  BOOKED: "booked",
  MAINTENANCE: "maintenance",
  SUSPENDED: "suspended",
  INACTIVE: "inactive",
};

const AvailableVehicleStatus = Object.values(VehicleStatusEnum);

const VehicleImageTypeEnum = {
  FRONT: "front",
  REAR: "rear",
  LEFT: "left",
  RIGHT: "right",
  INTERIOR: "interior",
  DASHBOARD: "dashboard",
  OTHER: "other",
};

const AvailableVehicleImageTypes = Object.values(VehicleImageTypeEnum);

const VehicleDocumentTypeEnum = {
  REGISTRATION: "registration",
  INSURANCE: "insurance",
  PUC: "puc",
  PERMIT: "permit",
};

const AvailableVehicleDocumentTypes = Object.values(VehicleDocumentTypeEnum);

const VehicleDocumentVerificationStatusEnum = {
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
  EXPIRED: "expired",
};

const AvailableVehicleDocumentVerificationStatus = Object.values(
  VehicleDocumentVerificationStatusEnum,
);

const VehicleAvailabilityBlockReasonEnum = {
  MAINTENANCE: "maintenance",
  OWNER_BLOCK: "owner_block",
  DOCUMENT_EXPIRY: "document_expiry",
  OTHER: "other",
};

const AvailableVehicleAvailabilityBlockReasons = Object.values(
  VehicleAvailabilityBlockReasonEnum,
);

const BookingStatusEnum = {
  PENDING_PAYMENT: "pending_payment",
  PAYMENT_FAILED: "payment_failed",
  CONFIRMED: "confirmed",
  READY_FOR_PICKUP: "ready_for_pickup",
  ACTIVE: "active",
  RETURN_PENDING: "return_pending",
  RETURNED: "returned",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

const AvailableBookingStatus = Object.values(BookingStatusEnum);

const SecurityDepositEnum = {
  NOT_REQUIRED: "not_required",
  PENDING: "pending",
  HELD: "held",
  PARTIALLY_DEDUCTED: "partially_deducted",
  REFUNDED: "refunded",
  FULLY_DEDUCTED: "fully_deducted",
};

const AvailableSecurityDeposit = Object.values(SecurityDepositEnum);

const PaymentStatusEnum = {
  PENDING: "pending",
  AUTHORIZED: "authorized",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
  REFUNDED: "refunded",
  PARTIALLY_REFUNDED: "partially_refunded",
};

const AvailablePaymentStatus = Object.values(PaymentStatusEnum);

const NotificationTypeEnum = {
  BOOKING_CONFIRMED: "booking_confirmed",
  BOOKING_CANCELLED: "booking_cancelled",
  PAYMENT_SUCCESS: "payment_success",
  PAYMENT_FAILED: "payment_failed",
  PICKUP_REMINDER: "pickup_reminder",
  RETURN_REMINDER: "return_reminder",
  DOCUMENT_VERIFIED: "document_verified",
  DOCUMENT_REJECTED: "document_rejected",
  VEHICLE_APPROVED: "vehicle_approved",
  DAMAGE_DETECTED: "damage_detected",
  REFUND_PROCESSED: "refund_processed",
  SYSTEM: "system",
};
const AvailableNotificationTypes = Object.values(NotificationTypeEnum);

const NotificationChannelEnum = {
  IN_APP: "in_app",
  EMAIL: "email",
  SMS: "sms",
  PUSH: "push",
};
const AvailableNotificationChannels = Object.values(NotificationChannelEnum);

const NotificationStatusEnum = {
  PENDING: "pending",
  SENT: "sent",
  READ: "read",
  FAILED: "failed",
};
const AvailableNotificationStatus = Object.values(NotificationStatusEnum);

const ReviewStatusEnum = {
  PUBLISHED: "published",
  HIDDEN: "hidden",
  FLAGGED: "flagged",
};
const AvailableReviewStatus = Object.values(ReviewStatusEnum);

const RefundStatusEnum = {
  NOT_REQUESTED: "not_requested",
  PENDING: "pending",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

const AvailableRefundStatus = Object.values(RefundStatusEnum);

const BusinessVerificationStatusEnum = {
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
};

const AvailableBusinessVerificationStatus = Object.values(
  BusinessVerificationStatusEnum,
);

const AIProcessingStatusEnum = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
};

const AvailableAIProcessingStatus = Object.values(AIProcessingStatusEnum);

const VehicleInspectionTypesEnum = {
  PRE_RENTAL: "pre_rental",
  POST_RENTAL: "post_rental",
};

const AvailableVehicleInspectionsTypes = Object.values(
  VehicleInspectionTypesEnum,
);

const VehicleInspectionStatusEnum = {
  DRAFT: "draft",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  UNDER_REVIEW: "under_review",
};
const AvailableVehicleInspectionStatus = Object.values(
  VehicleInspectionStatusEnum,
);

const DamageTypeEnum = {
  SCRATCH: "scratch",
  DENT: "dent",
  CRACK: "crack",
  BROKEN_PART: "broken_part",
  GLASS_DAMAGE: "glass_damage",
  TYRE_DAMAGE: "type_damage",
  OTHER: "other",
};

const AvailableDamageTypes = Object.values(DamageTypeEnum);

const DamageSeverity = {
  MINOR: "minor",
  MEDIUM: "medium",
  MAJOR: "major",
};

const AvailableDamageSeverity = Object.values(DamageSeverity);

const DamageStatusEnum = {
  DETECTED: "detected",
  UNDER_REVIEW: "under_review",
  CONFIRMED: "confirmed",
  REJECTED: "rejected",
  CHARGED: "charged",
};

const AvailableDamageStatus = Object.values(DamageStatusEnum);

const AIToolsExecutionStatusEnum = {
  PENDING: "pending",
  RUNNING: "running",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};
const AvailableAIToolsExecutionStatus = Object.values(
  AIToolsExecutionStatusEnum,
);

const MessageRoleEnum = {
  SYSTEM: "system",
  USER: "user",
  ASSISTANT: "assistant",
  TOOL: "tool",
};
const AvailableMessageRoles = Object.values(MessageRoleEnum);

const ConversationContextTypeEnum = {
  RENTAL_SEARCH: "rental_search",
  BOOKING: "booking",
  SUPPORT: "support",
  FLEET: "fleet",
  GENERAL: "general",
};
const AvailableConversationContextTypes = Object.values(
  ConversationContextTypeEnum,
);

const AIConversationStatus = {
  ACTIVE: "active",
  ARCHIVED: "archived",
};
const AvailableAIConversationStatus = Object.values(AIConversationStatus);

export {
  UserRolesEnum,
  AvailableUserRoles,
  UserAccountStatusEnum,
  AvailableUserAccountStatus,
  BusinessTypeEnum,
  AvailableBusinessTypes,
  AddressTypeEnum,
  AvailableAddressTypes,
  IdentityDocumentTypeEnum,
  AvailableIdentityDocumentTypes,
  IdentityDocumentVerificationStatusEnum,
  AvailableIdentityDocumentVerificationStatus,
  VehicleTypeEnum,
  AvailableVehicleTypes,
  FuelTypesEnum,
  AvailableFuelTypes,
  TransmissionTypesEnum,
  AvailableTransmissionTypes,
  VehicleStatusEnum,
  AvailableVehicleStatus,
  VehicleImageTypeEnum,
  AvailableVehicleImageTypes,
  VehicleDocumentTypeEnum,
  AvailableVehicleDocumentTypes,
  VehicleDocumentVerificationStatusEnum,
  AvailableVehicleDocumentVerificationStatus,
  VehicleAvailabilityBlockReasonEnum,
  AvailableVehicleAvailabilityBlockReasons,
  BookingStatusEnum,
  AvailableBookingStatus,
  PaymentStatusEnum,
  AvailablePaymentStatus,
  NotificationTypeEnum,
  AvailableNotificationTypes,
  NotificationChannelEnum,
  AvailableNotificationChannels,
  NotificationStatusEnum,
  AvailableNotificationStatus,
  ReviewStatusEnum,
  AvailableReviewStatus,
  RefundStatusEnum,
  AvailableRefundStatus,
  BusinessVerificationStatusEnum,
  AvailableBusinessVerificationStatus,
  AIProcessingStatusEnum,
  AvailableAIProcessingStatus,
  VehicleInspectionTypesEnum,
  AvailableVehicleInspectionsTypes,
  VehicleInspectionStatusEnum,
  AvailableVehicleInspectionStatus,
  DamageTypeEnum,
  AvailableDamageTypes,
  AvailableDamageTypes,
  AvailableDamageSeverity,
  DamageStatusEnum,
  AvailableDamageStatus,
  SecurityDepositEnum,
  AvailableSecurityDeposit,
  AIToolsExecutionStatusEnum,
  AvailableAIToolsExecutionStatus,
  MessageRoleEnum,
  AvailableMessageRoles,
  ConversationContextTypeEnum,
  AvailableConversationContextTypes,
  AIConversationStatus,
  AvailableAIConversationStatus,
};
