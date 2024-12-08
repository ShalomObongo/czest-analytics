<div align="center">
  <img src="public/globe.svg" alt="Czest Analytics Logo" width="120" />
  
  # ✨ CZest Analytics
  
  <p>
    A sophisticated Next.js application revolutionizing business management with real-time analytics, 
    intelligent inventory tracking, and seamless delivery management across multiple store locations.
  </p>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#%EF%B8%8F-tech-stack">Tech Stack</a> •
    <a href="#-architecture">Architecture</a>
  </p>
</div>

---

## 🎯 Overview

Calm and Zest Analytics transforms business operations with its elegant dark-themed interface and powerful Google Sheets integration. Built with modern web technologies, it offers a comprehensive solution for managing multiple store locations, tracking inventory, and analyzing business performance in real-time.

## 🌟 Features

### 📦 Inventory Management
- **Multi-Store Operations**: Seamlessly manage inventory across multiple locations
- **Smart Categorization**: Efficient organization of products with intelligent category management
- **Real-time Monitoring**: Live stock level tracking with intelligent alerts
- **Automated Reordering**: Smart threshold-based reorder notifications

### 🚚 Delivery System
- **Live Tracking**: Real-time delivery status monitoring (In Transit, Delivered, Pending)
- **Driver Dashboard**: Comprehensive driver management and assignment system
- **Smart ETA**: Intelligent arrival time estimation
- **Visual Status**: Intuitive status indicators using Lucide React icons

### 📊 Analytics & Reporting
- **Dynamic Dashboards**: Interactive analytics with radar charts and performance metrics
- **Store Comparison**: Cross-location performance analysis with visual insights
- **Revenue Tracking**: Real-time sales and expense monitoring
- **Trend Analysis**: Visual trend indicators for business metrics

### 🛠 Technical Excellence
- **Modern Stack**: 
  - Next.js 13+ with App Router
  - Radix UI for accessible components
  - Tailwind CSS for styling
  - Lucide React for iconography
- **Authentication**: 
  - NextAuth.js with session management
  - Secure credential handling
  - Protected API routes
- **UI Components**:
  - Responsive Geist-powered interface
  - Dynamic data tables with advanced filtering
  - Custom-crafted dark theme
  - Handpicked Lucide icons

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 15.0.0
npm >= 7.0.0 or yarn >= 1.22.0
Google Cloud Platform account
```

### Environment Setup

Create `.env.local`:

```env
GOOGLE_SHEETS_PRIVATE_KEY=your_private_key
GOOGLE_SHEETS_CLIENT_EMAIL=your_client_email
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### Quick Start

```bash
# Clone repository
git clone https://github.com/ShalomObongo/czest-analytics.git

# Install dependencies
npm install

# Launch development server
npm run dev
```

## 🏗 Architecture

### Component Structure
```
src/
├── app/
│   ├── (auth)/
│   │   └── login/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── inventory/
│   │   ├── analytics/
│   │   └── settings/
│   └── api/
├── components/
│   ├── ui/
│   └── dashboard/
│       ├── inventory/
│       └── analytics/
```

### Product Categories
- **Refill Bottles**: 20L, 10L, 5L containers
- **New Bottles**: Full Crate, 500ml Pack, 1L Pack
- **Dispensers**: Hot & Cold, Normal, Stand
- **Accessories**: Water Pump, Parts, Caps

### Store Locations
- Kilimani
- South C
- Obama
- Homa Bay

## 🎨 UI Components

### Dashboard Elements
- **Store Overview**: Real-time performance metrics
- **Transaction Input**: Natural language command processing
- **Inventory Management**: 
  - Stock Management Interface
  - Delivery Tracking System
- **Analytics**: 
  - Store Comparison Charts
  - Revenue Analytics
  - Performance Metrics

## 🔒 Security & Performance

### Authentication
- NextAuth.js powered security
- Session-based authentication
- Protected API routes

### Performance Optimization
- Static and dynamic rendering strategies
- Intelligent data caching
- Optimized asset delivery
- Type-safe operations with TypeScript

## 📚 Documentation

Detailed documentation for components and API endpoints is available in the `/docs` directory.

## 🤝 Contributing

This is a private project. Please contact project maintainers for contribution guidelines.

## 📝 License

Private and proprietary. All rights reserved.

---

<div align="center">
  <sub>Built by Shalom</sub>
</div>
