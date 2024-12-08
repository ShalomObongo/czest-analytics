# Czest Analytics

A modern Next.js application for comprehensive water business management, featuring inventory tracking, delivery management, and real-time analytics across multiple store locations. Built with a beautiful dark-themed UI and powerful backend integration with Google Sheets.

## 🌟 Features

### Inventory Management
- **Multi-Store Management**: Track inventory across multiple locations (Kilimani, South C, Obama, Homa Bay)
- **Product Categories**: Organize products into categories (Refill Bottles, New Bottles, Dispensers, Accessories)
- **Stock Tracking**: Real-time monitoring of stock levels with automatic low stock alerts
- **Smart Reorder Points**: Automated notifications when inventory reaches reorder thresholds

### Delivery System
- **Real-time Delivery Tracking**: Monitor deliveries with status updates (In Transit, Delivered, Pending)
- **Driver Management**: Assign and track drivers for each delivery
- **ETA Monitoring**: Track estimated arrival times for all deliveries
- **Status Updates**: Visual indicators for delivery status with intuitive icons

### Analytics & Reporting
- **Real-time Analytics**: Instant insights into business performance
- **Smart Reports**: Generate detailed reports with a single click
- **Store-wise Analysis**: Compare performance across different store locations
- **Category-wise Tracking**: Monitor performance by product categories

### Technical Features
- **Google Sheets Integration**: 
  - Robust data persistence with Google Sheets API
  - Smart caching system with 1-minute TTL
  - Rate limiting and request throttling
  - Exponential backoff for API requests
- **Modern UI Components**:
  - Responsive dashboard layout
  - Interactive data tables with search and filtering
  - Beautiful dark theme with consistent styling
  - Custom icons and visual indicators

## 🚀 Getting Started

### Prerequisites

- Node.js (v15 or higher)
- npm or yarn
- Google Cloud Platform account with Sheets API enabled
- Google Service Account with appropriate permissions

### Environment Variables

Create a `.env.local` file in the root directory:

```env
GOOGLE_SHEETS_PRIVATE_KEY=your_private_key
GOOGLE_SHEETS_CLIENT_EMAIL=your_client_email
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/czest-analytics.git
cd czest-analytics
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework**: Next.js 15.0
- **Authentication**: NextAuth.js with session management
- **UI Components**: 
  - Radix UI for accessible components
  - Tailwind CSS for styling
  - Lucide React for icons
- **Data Management**:
  - Google Sheets API for data storage
  - Custom caching layer for performance
  - Rate limiting implementation
- **Form Handling**: React Hook Form with Zod validation
- **Type Safety**: Full TypeScript implementation
- **Date Handling**: date-fns for date manipulation
- **State Management**: React hooks and context

## 📊 Data Structure

### Store Management
Each store's data is organized in separate sheets with the following structure:
- **ID**: Unique identifier for each entry
- **Date**: Timestamp of the entry
- **Type**: Transaction type
- **Amount**: Transaction amount
- **Description**: Additional details
- **Category**: Transaction category

### Product Categories
- **Refill Bottles**: Water refill containers (20L, 10L, 5L)
- **New Bottles**: Fresh bottled water products
- **Dispensers**: Water dispensing equipment
- **Accessories**: Additional water-related products

## 🔒 Security Features

- **Authentication**: NextAuth.js with secure session management
- **API Security**: 
  - JWT-based authentication for Google Sheets API
  - Environment variable protection
  - Rate limiting and request throttling
- **Data Protection**:
  - Secure credential management
  - Request validation
  - Error handling with exponential backoff

## 🤝 Contributing

This is a private project. Contact the project maintainers for contribution guidelines.

## 📝 License

This project is private and proprietary. All rights reserved.
