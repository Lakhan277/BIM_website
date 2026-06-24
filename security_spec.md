# Security Specification - Apex BIM Solutions

This document defines the Attribute-Based Access Control (ABAC) and Zero-Trust security rules designed for Apex BIM Solutions' Firestore database.

## 1. Data Invariants
- **User Profile**: Every user profile under `/users/{userId}` must belong to the user with `uid == userId`. No user can set or modify their own `role` field; only system-assigned or default roles are supported.
- **Consultations**: Users can only see or write their own consultations. The `userId` of a consultation must match the authenticated user's `uid`. Only an `admin` user can modify the `status` field.
- **Messages**: Users can only read and write messages for consultations they own. Admins can read and write messages for all consultations. Message fields must be strictly typed, and timestamps must use `request.time`.

## 2. The "Dirty Dozen" Malicious Payloads

### Payload 1: Privilege Escalation (User Registration)
- **Target Path**: `/users/attacker_uid`
- **Payload**: `{ "uid": "attacker_uid", "email": "attacker@gmail.com", "role": "admin" }`
- **Result**: `PERMISSION_DENIED` (User cannot register themselves with an admin role).

### Payload 2: Privilege Escalation (User Update)
- **Target Path**: `/users/attacker_uid`
- **Payload**: `{ "role": "admin" }` (Updating `role` key of existing profile).
- **Result**: `PERMISSION_DENIED` (Modifying role is restricted).

### Payload 3: User Cross-Read
- **Target Path**: `/users/victim_uid`
- **Operation**: `get` by `attacker_uid`
- **Result**: `PERMISSION_DENIED` (Users cannot read other user's private/profile data).

### Payload 4: Consultation Identity Spoofing
- **Target Path**: `/consultations/new_consultation_id`
- **Payload**: `{ "id": "new_consultation_id", "userId": "victim_uid", "fullName": "Attacker", "companyName": "Attacker Corp", "email": "attacker@corp.com", "phoneNumber": "12345", "projectType": "Architectural BIM", "message": "Spoof ID", "status": "pending", "createdAt": "request.time", "updatedAt": "request.time" }`
- **Result**: `PERMISSION_DENIED` (UserId in payload does not match request.auth.uid).

### Payload 5: State Shortcut on Creation
- **Target Path**: `/consultations/new_consultation_id`
- **Payload**: `{ "id": "new_consultation_id", "userId": "attacker_uid", "fullName": "Attacker", "companyName": "Attacker Corp", "email": "attacker@corp.com", "phoneNumber": "12345", "projectType": "Architectural BIM", "message": "Shortcut State", "status": "completed", "createdAt": "request.time", "updatedAt": "request.time" }`
- **Result**: `PERMISSION_DENIED` (New consultations must start with "pending" status).

### Payload 6: Client-Side Status Overwrite
- **Target Path**: `/consultations/existing_consultation_id`
- **Payload**: `{ "status": "completed" }` (Submitted by standard client)
- **Result**: `PERMISSION_DENIED` (Only administrators can change consultation status).

### Payload 7: Consultation Cross-Write
- **Target Path**: `/consultations/victim_consultation_id`
- **Payload**: `{ "message": "Injected text" }` (Submitted by non-owner, non-admin)
- **Result**: `PERMISSION_DENIED` (Write access denied for other users' resources).

### Payload 8: Resource Poisoning (Size Abuse)
- **Target Path**: `/consultations/new_consultation_id`
- **Payload**: `{ "id": "new_consultation_id", "userId": "attacker_uid", "fullName": "A" * 2000, "companyName": "Attacker Corp", ... }`
- **Result**: `PERMISSION_DENIED` (String fields exceed strict size bounds, e.g. .size() <= 128).

### Payload 9: Client Timestamp Spoofing (Create)
- **Target Path**: `/consultations/new_consultation_id`
- **Payload**: `{ ..., "createdAt": "2020-01-01T00:00:00Z" }` (Manipulated timestamp)
- **Result**: `PERMISSION_DENIED` (createdAt must match request.time).

### Payload 10: Client Timestamp Spoofing (Update)
- **Target Path**: `/consultations/existing_consultation_id`
- **Payload**: `{ "message": "Update message", "updatedAt": "2020-01-01T00:00:00Z" }`
- **Result**: `PERMISSION_DENIED` (updatedAt must match request.time).

### Payload 11: Cross-Chat Injection
- **Target Path**: `/consultations/victim_consultation_id/messages/msg_123`
- **Payload**: `{ "id": "msg_123", "authorId": "attacker_uid", "authorName": "Attacker", "authorRole": "client", "message": "Injected message", "createdAt": "request.time" }`
- **Result**: `PERMISSION_DENIED` (Cannot write to a message subcollection if the user is not the owner or an admin of the parent consultation).

### Payload 12: Ghost Field Injection
- **Target Path**: `/consultations/existing_consultation_id`
- **Payload**: `{ "message": "Approved message", "ghostField": "malicious_value" }`
- **Result**: `PERMISSION_DENIED` (Update payload contains unapproved/un-affected keys).

## 3. The Test Runner Structure
Below is a verification script plan that tests these behaviors:
```typescript
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';

// Verification unit test blueprint for CI pipeline:
// - Verifies client-side isolation
// - Verifies admin state changes
// - Verifies size constraint checks
// - Verifies timestamp validation rules
```
