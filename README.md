# Car Rental

A marketplace/booking system where customers can search available cars, they can compare prices and can reserve/book a car and after payment they can use car for rental period.

## 1. Features

### customer

- login/signup
- logout
- Forgot password
- Profile management
- Phone/email verification
- browse cars
- search car (location, pickup, return)
- book a car

### car owner

- add a car
- manage car - availability/unavailable, remove
- manage bookings

### Customer

Authentication
Profile
License upload
AI-assisted search
Vehicle discovery
Filters
Availability
Booking
Payment
Cancellation
Pickup/return
Inspection visibility
Reviews

### Fleet Owner

Owner onboarding
Vehicle CRUD
Vehicle documents
Vehicle approval
Pricing
Availability
Booking management
Inspection
Fleet dashboard
Revenue/utilization analytics

### Admin

User management
Vehicle approval
Document verification
Booking management
Payment/refund management
Risk review
Dispute management
Platform analytics

### AI

🧠 Natural-language vehicle search
📄 AI document extraction
👁️ Damage detection
🛡️ Risk scoring
🔧 Maintenance recommendations
🤖 Fleet Operations Copilot

### Engineering depth

🔒 RBAC
🔥 Concurrency-safe booking
💳 Payment webhooks
🔁 Idempotency
📦 Transactional booking workflow
📝 Audit logs
🔔 Event-driven notifications
📊 Analytics
🗃️ Object storage
⚡ Redis caching
🧪 Testing
🐳 Docker
🚀 CI/CD
☁️ AWS deployment

## 2. Core Entities

### 2.1 customer

### 2.1 fleet owner

### 2.1 admin

### 2.1 vehicle

Vehicle
├── Brand
├── Model
├── Variant
├── Year
├── Registration number
├── Fuel type
├── Transmission
├── Seats
├── Color
├── Mileage
├── Description
├── Features
├── Images
├── Location
└── Status

Vehicle status:
DRAFT
PENDING_APPROVAL
ACTIVE
BOOKED
MAINTENANCE
SUSPENDED
INACTIVE

Admin approval ke baad:
PENDING_APPROVAL
        ↓
      ACTIVE

Customer:
Pickup location
Pickup date/time
Return date/time

then:
Search
 ↓
Filter
 ↓
Availability check
 ↓
Pricing calculation
 ↓
Results

Filters:
Price
Brand
Vehicle type
Seats
Transmission
Fuel
Rating
Features

1. 🔥 Double Booking Prevention

2. 💰 Pricing Engine
Base daily price
        +
Rental duration
        +
Extra km
        +
Delivery fee
        +
Taxes
        +
Discount
        +
Security deposit

example:
₹2,500 × 3 days
= ₹7,500

Delivery = ₹300
Tax      = ₹1,404

Rental total = ₹9,204

Deposit = ₹5,000

1. 📈 V1 Dynamic Pricing — Lite

## Booking Lifecycle

PENDING_PAYMENT
      ↓
CONFIRMED
      ↓
READY_FOR_PICKUP
      ↓
ACTIVE
      ↓
RETURN_PENDING
      ↓
RETURNED
      ↓
COMPLETED

Other branches:
PENDING_PAYMENT → PAYMENT_FAILED

CONFIRMED → CANCELLED

ACTIVE → INCIDENT

ACTIVE → EXTENSION_REQUESTED

## Payment

Create booking
      ↓
Create payment
      ↓
Payment gateway
      ↓
Webhook
      ↓
Verify payment
      ↓
Confirm booking

## 19. 📊 Owner Dashboard

┌─────────────────────────────────┐
│ Fleet Overview                  │
├─────────────────────────────────┤
│ Total Cars             24       │
│ Available              8        │
│ Active Rentals         11        │
│ Maintenance             3       │
├─────────────────────────────────┤
│ Revenue                 ₹8.4L    │
│ Utilization             76%      │
│ Avg Rental Value        ₹3,240   │
└─────────────────────────────────┘

Charts:

Revenue
Bookings
Utilization
Vehicle performance
Cancellation rate

AI section:
🤖 AI Insights

• 3 vehicles are underutilized
• SUV demand increased this weekend
• Vehicle #103 needs maintenance
• Average booking value increased 12%

 1. 🧑‍💼 Admin Dashboard

Admin:

Users
Owners
Vehicles
Bookings
Payments
Refunds
Documents
Inspections
Disputes
Risk alerts

Metrics:
GMV
Platform revenue
Active rentals
Fleet size
Utilization
Cancellation rate
Failed payments
Risk cases

1. 🔔 Notifications

Email
In-app

Booking confirmed
Payment successful
Pickup reminder
Return reminder
Booking cancelled
Document rejected
Vehicle approved
Damage detected
Payment refunded

## Customer journey

Landing Page
     ↓
Search
     ↓
Results
     ↓
Vehicle Details
     ↓
Select Dates
     ↓
Price Breakdown
     ↓
Identity Check
     ↓
Payment
     ↓
Booking Confirmation
     ↓
Pickup
     ↓
Inspection
     ↓
Rental
     ↓
Return
     ↓
Post Inspection
     ↓
Deposit Settlement
     ↓
Review

## Entities

User
 ├── CustomerProfile
 └── OwnerProfile

Vehicle
 ├── VehicleImage
 ├── VehicleDocument
 ├── VehiclePricing
 └── VehicleAvailability

Booking
 ├── BookingItem
 ├── Payment
 ├── Refund
 └── BookingStatusHistory

Inspection
 ├── InspectionImage
 └── Damage

Review

Notification

RiskAssessment

AIConversation
AIMessage
AIToolExecution

MaintenanceRecord

## Core Modules

```text
Authentication
       ↓
User Management
       ↓
Vehicle Management
       ↓
Fleet Management
       ↓
Search & Availability
       ↓
Pricing Engine
       ↓
Booking Engine
       ↓
Payment System
       ↓
Inspection System
       ↓
Rental Lifecycle
       ↓
Damage Management
       ↓
Deposit Management
       ↓
Payout System
       ↓
Review & Rating
       ↓
Notification System
       ↓
Support System
       ↓
Admin & Analytics
```

```text
Car Rental Platform
+
Real-time availability
+
Double-booking prevention
+
Dynamic pricing
+
Payment webhook architecture
+
Security deposit
+
Vehicle inspections
+
Damage detection
+
Fraud/risk scoring
+
Automated owner payouts
+
Rental extension
+
Maintenance scheduling
+
Notifications
+
Analytics
+
AI assistant
```

## V1

Customer + Fleet Owner + Admin

Authentication
Vehicle listing
Search/filter
Availability
Booking
Pricing
Payment
Booking lifecycle
Pickup/return
Inspection
Deposit
Reviews
Notifications
Admin dashboard

A car rental platform where customers can discover and book vehicles, while fleet owners can manage vehicles, bookings, pricing, inspections, and operations—with an AI layer for intelligent search, document processing, risk analysis, and operational assistance.

### Customer

Register/login
Manage profile
Upload driving license
Search cars
Filter/sort
View car
Check availability
Book
Pay
View booking
Cancel
Pickup
Return
View inspection
Review

### Fleet Owner

Register
Add vehicle
Upload vehicle documents
Manage pricing
Manage availability
View bookings
Approve/manage rental operations
Perform inspections
View revenue
View utilization
View AI recommendations

### Admin

Manage customers
Manage fleet owners
Approve vehicles
Verify documents
Manage bookings
Manage disputes
Manage payments
Suspend accounts/vehicles
Platform analytics

### Authentication & Identity

Customer and owner:

Authentication & Identity

Customer and owner:

Register
Login
Logout
Refresh token
Password reset
Email/phone verification
Role-based authorization

Profile:

Name
Phone
Email
DOB
Address
Profile image

Customer documents:
Driving License
Government ID

V1 mein document verification initially:
UPLOAD
 ↓
AI/OCR extraction
 ↓
PENDING
 ↓
ADMIN APPROVAL

## V1 Database Architecture

```text
                    PostgreSQL
                        │
        ┌───────────────┼────────────────┐
        │               │                │
     Identity         Fleet           Rental
        │               │                │
     Users          Vehicles        Bookings
     Profiles       Documents       Payments
     Addresses      Pricing         Inspections
                    Availability     Damages
                                    Reviews
        │
        ├──────────── AI / Intelligence
        │
        │      Risk Assessments
        │      AI Conversations
        │      AI Messages
        │      AI Tool Executions
        │
        ├──────── Operations
        │
        │      Maintenance
        │      Notifications
        │      Support Tickets
        │
        └──────── Platform
               Audit Logs
               Refunds
               Payouts
```

### 1. users

```sql
users
────────────────────────────
id                  UUID PK
email               VARCHAR UNIQUE
phone               VARCHAR UNIQUE
password_hash       TEXT
role                ENUM
status              ENUM
email_verified      BOOLEAN
phone_verified      BOOLEAN
last_login_at       TIMESTAMP
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

Role:
CUSTOMER
FLEET_OWNER
ADMIN

Status:
ACTIVE
SUSPENDED
BLOCKED
PENDING_VERIFICATION

### 2. customer_profiles

```sql
customer_profiles
────────────────────────────
id                  UUID PK
user_id             UUID FK → users
first_name          VARCHAR
last_name           VARCHAR
date_of_birth       DATE
profile_image_url   TEXT
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

RelationShip:
User
  │
  └── CustomerProfile

### 3. owner_profiles

```sql
owner_profiles
────────────────────────────
id                  UUID PK
user_id             UUID FK → users
business_name       VARCHAR
business_type       ENUM
tax_id              VARCHAR
verification_status ENUM
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

business_type:
INDIVIDUAL
BUSINESS

### 4. address

```sql
addresses
────────────────────────────
id                  UUID PK
user_id             UUID FK
type                ENUM
address_line_1      TEXT
address_line_2      TEXT
city                VARCHAR
state               VARCHAR
country             VARCHAR
postal_code         VARCHAR
latitude            DECIMAL
longitude           DECIMAL
created_at          TIMESTAMP
```

Type:

HOME
BUSINESS
OTHER

### 5. identity_documents

```sql
identity_documents
────────────────────────────
id                  UUID PK
user_id             UUID FK
document_type       ENUM
document_number     VARCHAR
document_url        TEXT
issued_at           DATE
expires_at          DATE
verification_status ENUM
verified_by         UUID FK → users
verified_at         TIMESTAMP
created_at          TIMESTAMP
```

Document type:

DRIVING_LICENSE
GOVERNMENT_ID

Status:

PENDING
VERIFIED
REJECTED
EXPIRED

### 6. vehicles

```sql
vehicles
────────────────────────────
id                  UUID PK
owner_id            UUID FK → users
brand               VARCHAR
model               VARCHAR
variant             VARCHAR
year                INTEGER
registration_number VARCHAR UNIQUE
vin                 VARCHAR UNIQUE
vehicle_type        ENUM
fuel_type           ENUM
transmission        ENUM
seats               INTEGER
color               VARCHAR
odometer            INTEGER
description         TEXT
status              ENUM
latitude            DECIMAL
longitude           DECIMAL
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

Vehicle type:

HATCHBACK
SEDAN
SUV
MUV
LUXURY

Fuel:

PETROL
DIESEL
ELECTRIC
HYBRID
CNG

Transmission:

MANUAL
AUTOMATIC

Status:

DRAFT
PENDING_APPROVAL
ACTIVE
BOOKED
MAINTENANCE
SUSPENDED
INACTIVE

### 7. vehicle_images

one vehicle will will have multiple images

```sql
vehicle_images
────────────────────────────
id              UUID PK
vehicle_id      UUID FK
image_url       TEXT
image_type      ENUM
display_order   INTEGER
created_at      TIMESTAMP
```

Image type:

FRONT
REAR
LEFT
RIGHT
INTERIOR
OTHER

### 8. vehicle_documents

```sql
vehicle_documents
────────────────────────────
id                  UUID PK
vehicle_id          UUID FK
document_type       ENUM
document_number     VARCHAR
document_url        TEXT
issued_at           DATE
expires_at          DATE
verification_status ENUM
verified_by         UUID FK
verified_at         TIMESTAMP
created_at          TIMESTAMP
```

Types:

REGISTRATION
INSURANCE
PUC
PERMIT

### 9. vehicle_pricing

```sql
vehicle_pricing
────────────────────────────
id                  UUID PK
vehicle_id          UUID FK
base_daily_rate     DECIMAL
extra_km_rate       DECIMAL
extra_hour_rate     DECIMAL
security_deposit    DECIMAL
delivery_fee        DECIMAL
currency            VARCHAR
effective_from      TIMESTAMP
effective_until     TIMESTAMP
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

### 10. pricing_rules

```sql
pricing_rules
────────────────────────────
id                  UUID PK
name                VARCHAR
rule_type           ENUM
multiplier          DECIMAL
priority            INTEGER
is_active           BOOLEAN
conditions          JSONB
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

### 11. 📅 vehicle_availability_blocks

Maintenance / owner blocking / unavailable periods.

```sql
vehicle_availability_blocks
────────────────────────────
id              UUID PK
vehicle_id      UUID FK
start_time      TIMESTAMP
end_time        TIMESTAMP
reason          ENUM
notes           TEXT
created_at      TIMESTAMP
```

Reason:

MAINTENANCE
OWNER_BLOCK
DOCUMENT_EXPIRY
OTHER

### 12. bookings

```sql
bookings
────────────────────────────
id                  UUID PK
booking_number      VARCHAR UNIQUE
customer_id         UUID FK → users
vehicle_id          UUID FK → vehicles

pickup_location_id  UUID FK → addresses
return_location_id  UUID FK → addresses

start_time          TIMESTAMP
end_time            TIMESTAMP

status              ENUM

base_amount         DECIMAL
discount_amount     DECIMAL
tax_amount          DECIMAL
delivery_fee        DECIMAL
total_amount        DECIMAL
security_deposit    DECIMAL

currency             VARCHAR

cancelled_at        TIMESTAMP
cancellation_reason TEXT

created_at          TIMESTAMP
updated_at          TIMESTAMP
```

### 13. 🔄 Booking Status

PENDING_PAYMENT
      │
      ↓
CONFIRMED
      │
      ↓
READY_FOR_PICKUP
      │
      ↓
ACTIVE
      │
      ↓
RETURN_PENDING
      │
      ↓
RETURNED
      │
      ↓
COMPLETED

### 14. booking_status_history

```sql
booking_status_history
────────────────────────────
id              UUID PK
booking_id      UUID FK
from_status     ENUM
to_status       ENUM
changed_by      UUID FK
reason          TEXT
created_at      TIMESTAMP
```

example:
PENDING_PAYMENT
        ↓
CONFIRMED
        ↓
READY_FOR_PICKUP
        ↓
ACTIVE
        ↓
RETURNED
        ↓
COMPLETED

### 15. 💳 payments

```sql
payments
────────────────────────────
id                  UUID PK
booking_id          UUID FK
provider            VARCHAR
provider_payment_id VARCHAR
amount              DECIMAL
currency            VARCHAR
status              ENUM
payment_method      VARCHAR
paid_at             TIMESTAMP
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

status:
PENDING
AUTHORIZED
SUCCEEDED
FAILED
REFUNDED
PARTIALLY_REFUNDED

### 16. payment_webhook_events

```sql
payment_webhook_events
────────────────────────────
id                  UUID PK
provider            VARCHAR
event_id            VARCHAR UNIQUE
event_type          VARCHAR
payload             JSONB
processed           BOOLEAN
processed_at        TIMESTAMP
created_at          TIMESTAMP
```

### 22. ⭐ reviews

```sql
reviews
────────────────────────────
id              UUID PK
booking_id      UUID FK UNIQUE
customer_id     UUID FK
vehicle_id      UUID FK
rating          INTEGER
comment         TEXT
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### 27. 🔔 notifications

```sql
notifications
────────────────────────────
id              UUID PK
user_id         UUID FK
type            ENUM
title           VARCHAR
message         TEXT
channel         ENUM
status          ENUM
read_at         TIMESTAMP
created_at      TIMESTAMP
```

Channel:

IN_APP
EMAIL
SMS
PUSH

## Relationship Map

```text
                         USERS
                           │
            ┌──────────────┼──────────────┐
            ↓              ↓              ↓
     CUSTOMER_PROFILE  OWNER_PROFILE     ADMIN
            │              │
            │              ↓
            │          VEHICLES
            │              │
            │      ┌───────┼────────┐
            │      ↓       ↓        ↓
            │   IMAGES  DOCUMENTS PRICING
            │                         │
            │                  PRICING_RULES
            │
            ↓
        BOOKINGS
            │
    ┌───────┼─────────────┐
    ↓       ↓             ↓
 PAYMENTS  INSPECTIONS  STATUS_HISTORY
    │          │
    ↓          ├──── IMAGES
 REFUNDS       │
               └──── DAMAGES
                        │
                        ↓
                  RISK ASSESSMENT
                        
BOOKINGS
   │
   ├──── REVIEW
   ├──── PAYOUT
   └──── SUPPORT TICKET


USERS
  │
  └──── AI_CONVERSATIONS
            │
            ├──── AI_MESSAGES
            │
            └──── AI_TOOL_EXECUTIONS

VEHICLES
   │
   ├──── AVAILABILITY_BLOCKS
   └──── MAINTENANCE_RECORDS

USERS
   │
   └──── NOTIFICATIONS

EVERYTHING
   │
   └──── AUDIT_LOGS
```

## Indexing Strategy

users(email)
users(phone)

vehicles(owner_id)
vehicles(status)
vehicles(location)
vehicles(vehicle_type)

bookings(customer_id)
bookings(vehicle_id)
bookings(status)
bookings(start_time, end_time)

payments(booking_id)
payments(provider_payment_id)

inspections(booking_id)
damages(inspection_id)

risk_assessments(user_id)
risk_assessments(booking_id)

notifications(user_id, read_at)

audit_logs(entity_type, entity_id)

---

Search ke liye eventually PostgreSQL:

GIN
GiST
Full-text search
PostGIS

use kar sakte ho depending on exact location/search requirements.

```text
IDENTITY
├── users
├── customer_profiles
├── owner_profiles
├── addresses
└── identity_documents

FLEET
├── vehicles
├── vehicle_images
├── vehicle_documents
├── vehicle_pricing
├── pricing_rules
├── availability_blocks
└── maintenance_records

RENTAL
├── bookings
├── booking_status_history
├── payments
├── payment_webhook_events
├── refunds
├── payouts
├── inspections
├── inspection_images
├── damages
└── reviews

INTELLIGENCE
├── risk_assessments
├── ai_conversations
├── ai_messages
└── ai_tool_executions

OPERATIONS
├── notifications
└── support_tickets

PLATFORM
└── audit_logs
```

## 📦 Final V1 Models

models/
│
├── user.model.js
├── ownerProfile.model.js
├── identityDocument.model.js
│
├── vehicle.model.js
├── vehicleAvailabilityBlock.model.js
│
├── booking.model.js
├── payment.model.js
├── paymentWebhookEvent.model.js
│
├── inspection.model.js
├── damage.model.js
├── review.model.js
│
├── notification.model.js
│
├── aiConversation.model.js
├── aiMessage.model.js
├── aiToolExecution.model.js
│
└── auditLog.model.js

## 5. APIs

```text
PHASE 1  → Authentication & Users
PHASE 2  → Owner Onboarding
PHASE 3  → Vehicle Management
PHASE 4  → Vehicle Discovery
PHASE 5  → Availability
PHASE 6  → Booking
PHASE 7  → Payment
PHASE 8  → Rental Operations
PHASE 9  → Inspection & Damage
PHASE 10 → Reviews & Notifications
PHASE 11 → Admin
PHASE 12 → AI
PHASE 13 → Analytics
```

### 5.1 Authentication & Identity

#### 5.1.1 register POST /api/v1/auth/register

@Purpose
create account of Customer/owner.

@Request

```json
{
  "email": "user@example.com",
  "phone": "9876543210",
  "password": "StrongPassword123",
  "firstName": "Krish",
  "lastName": "Kumar",
  "role": "CUSTOMER"
}
```

@Response

```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "userId": "...",
    "email": "...",
    "role": "CUSTOMER"
  }
}
```

#### 5.1.1 register POST /api/v1/auth/login

@Purpose
Authenticate user.

@Request

```json
{
      "email": "user@example.com",
  "password": "StrongPassword123"
}
```

@Response

```json
{
      "accessToken": "...",
  "refreshToken": "...",
  "user": {
    "id": "...",
    "role": "CUSTOMER"
  }
}
```

#### 5.1.1 register POST /api/v1/auth/refresh
