📌 Subscription Tracker (Backend)

A backend service for managing user subscriptions with secure authentication and authorization.
Built using Node.js, Express.js, MongoDB, JWT, and Mongoose.

🚀 Features

User Authentication & Authorization
Register & Login with JWT token
Secure password hashing with bcrypt
Middleware-based role protection

Subscription Management
Create, update, and cancel subscriptions
Each subscription linked with a user
Track status (active, cancelled, expired)

User Workflow
User signs up / logs in → receives JWT token
Authenticated users can create subscriptions
Subscriptions stored & linked to UserModel
Only authorized users can update/cancel/delete their subscriptions
