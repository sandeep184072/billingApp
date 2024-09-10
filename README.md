# Billing and Invoice Automation with Zapier.com Integration

## Project Overview
This project implements a billing and invoice automation platform for SaaS customers of TensorGo Technologies. It allows users to log in using Google OAuth, view their usage details, access billing information, and generate invoices based on cumulative usage. The platform is integrated with Zapier.com to automate the billing process based on usage data.

## Features
### Backend (Node.js)
- **Google OAuth** for user authentication.
- API Endpoints for:
  - Viewing SaaS usage details.
  - Viewing billing information.
  - Generating invoices.
- Integration with **Zapier.com** to trigger billing actions.

### Frontend (React)
- **Google OAuth integration** for user login.
- Display of **usage details** and **billing information**.
- Button to **generate invoices** and trigger billing workflows.

## Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (for local database setup)
- **Zapier account** (for webhook integration)
- **Google Cloud Console** (to set up OAuth credentials)

## Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-repository/billingApp.git
cd billingApp
```
### 2. Backend Setup
- Navigate to the backend directory:
```bash 
cd backend
```
- Install the dependencies:
```bash
npm install
```
- Create a .env file to store your environment variables:
```bash
touch .env
```
- Add the following environment variables to the .env file:
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MONGO_URI=mongodb://localhost:27017/tensorgo
ZAPIER_WEBHOOK_URL=your-zapier-webhook-url
SESSION_SECRET=your-session-secret
```
-Start the backend server:
```bash
node server.js
```
The backend server will run at http://localhost:5000.










