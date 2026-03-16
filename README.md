# Quick Bill – Bill Generator

A modern, responsive React + TypeScript web application with Express.js backend for generating and managing bills for Kavita's Kitchen. Built with Vite, Tailwind CSS, MongoDB, and includes authentication, bill generation, and image export capabilities.

## Table of Contents 📑

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Data Models](#data-models)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Recent Updates](#recent-updates)
- [License](#license)

## Features 📈

### Frontend

- **Category-based Item Management**: Browse items organized by categories (Namkeens, Sweets, Nasta Items, Sabzi, Others)
- **Dynamic Bill Generation**: Add/remove items to create custom bills with real-time total calculation
- **Customer Information**: Input and display customer name on bills
- **Bill Preview**: Live preview of the formatted bill receipt
- **Download as Image**: Export bills as high-quality JPEG images using html2canvas
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **User Authentication**: Login/registration system with protected routes using JWT tokens stored in localStorage
- **Dashboard Analytics**: Visual statistics including sales charts, pie charts (shows category labels), top-selling items bar chart
- **Products Management**: Full CRUD operations for managing product inventory

### Backend

- **RESTful API**: Express.js backend with structured API endpoints
- **User Authentication**: JWT-based authentication with bcryptjs password hashing
- **MongoDB Integration**: Data persistence with Mongoose ODM
- **Cloud Storage**: Cloudinary integration for image uploads
- **Admin Management**: Admin panel for managing bills, items, and statistics

## Tech Stack

### Frontend 🖥️

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

| Technology | Description |
|------------|-------------|
| Framework | React 19 with TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 with PostCSS |
| Routing | React Router DOM 7 |
| Image Capture | html2canvas for bill export, dom-to-image-more |
| PDF Generation | html2pdf.js for potential PDF exports |
| Icons | Lucide React for UI icons |
| Linting | ESLint with TypeScript support |

### Backend ⚙️

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)

| Technology | Description |
|------------|-------------|
| Runtime | Node.js with Express.js 5 |
| Database | MongoDB 7 with Mongoose ODM |
| Authentication | JWT (jsonwebtoken) with bcryptjs |
| File Upload | Multer with Cloudinary storage |
| Development | Nodemon for auto-restart |

## Project Structure 🗂️

```
bill_generater/
├── .gitignore
├── README.md
├── TODO.md                           # Task tracking for updates
├── Backend/                          # Express.js Backend API
│   └── my_app/
│       ├── index.js                  # Server entry point
│       ├── package.json
│       ├── config/
│       ├── controllers/
│       │   ├── authControllers.js
│       │   ├── billControllers.js
│       │   ├── itemControllers.js
│       │   └── statsController.js
│       ├── models/
│       │   ├── Admin.js
│       │   ├── billModel.js
│       │   └── ItemModel.js
│       ├── routes/
│       │   ├── authroutes.js
│       │   ├── billRoutes.js
│       │   ├── itemRoutes.js
│       │   └── statsRoutes.js
│       └── scripts/
│           ├── bill.json
│           ├── items.json
│           ├── seedbill.js
│           └── seedItems.js
└── Frontend/                         # React + TypeScript Frontend
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.cjs
    ├── tailwind.config.js
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── public/
    │   └── images/                    # Category-organized product photos
    │       ├── Login/                 # Auth backgrounds
    │       ├── Namkeens/
    │       ├── Nasta_Items/
    │       ├── right_side/            # Logos, QR
    │       ├── Sabzi/
    │       └── Sweets/
    └── src/
        ├── App.css
        ├── App.tsx
        ├── index.css
        ├── main.tsx
        ├── api/                       # API clients
        │   ├── authApi.ts
        │   ├── axios.ts
        │   ├── dashboardApi.ts
        │   └── productApi.ts
        ├── components/
        │   ├── AddItemModalt.tsx
        │   ├── AddItemModal.tsx
        │   ├── EditPriceModal.tsx
        │   ├── ItemRow.tsx
        │   ├── ItemTable.tsx
        │   ├── login.tsx
        │   ├── ProtectedRoute.tsx
        │   ├── Register.tsx
        │   ├── right_side.tsx
        │   ├── filter/
        │   │   └── CategoryFilter.tsx
        │   ├── dashboard/
        │   │   ├── CategoryPieChart.tsx
        │   │   ├── SalesChart.tsx
        │   │   ├── StatCard.tsx
        │   │   └── TopItemsBarChart.tsx
        │   ├── layout/
        │   │   ├── DashboardLayout.tsx
        │   │   ├── Navbar.tsx
        │   │   └── Sidebar.tsx
        │   └── products/
        │       ├── AddItemModal.tsx
        │       ├── EditPriceModal.tsx
        │       ├── ItemRow.tsx
        │       └── ItemTable.tsx
        ├── pages/
        │   ├── AddItem.tsx
        │   ├── bill_preview.tsx
        │   ├── dashboard.tsx
        │   ├── login_page.tsx
        │   ├── products.tsx
        │   └── register_page.tsx
        └── types/
            ├── dashboard.ts
            └── Item.ts
```

## Getting Started 🛠️

### Prerequisites

- Node.js v16 or higher
- MongoDB Atlas instance
- Cloudinary account for image storage
- npm or yarn package manager

### Environment Variables

Create a `.env` file in `Backend/my_app/` with the following:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Installation

1. **Frontend Setup**

```bash
cd Frontend
npm install
```

2. **Backend Setup**

```
bash
cd Backend/my_app
npm install
```

### Running the Application

1. **Start Frontend** (Available at http://localhost:5173)

```
bash
cd Frontend
npm run dev
```

2. **Start Backend** (Available at http://localhost:3000)

```
bash
cd Backend/my_app
npm run dev
```

3. **Run Both Services**

```
bash
# Terminal 1
cd Frontend && npm run dev

# Terminal 2
cd Backend/my_app && npm run dev
```

### Build for Production

```
bash
cd Frontend
npm run build
```

This generates a `dist` folder that can be deployed.

### Preview Production Build

```
bash
cd Frontend
npm run preview
```

## API Endpoints 🔌

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Items

- `GET /api/items` - Get all items
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### Bills

- `GET /api/bills` - Get all bills
- `POST /api/bills` - Create new bill
- `GET /api/bills/:id` - Get specific bill

### Statistics

- `GET /api/stats/dashboard` - Get dashboard statistics (trend, daily/monthly boxes, category pie, top sellers)

### Billing

- `POST /api/generate-bill` - Create a bill (used by Quick Bill page)

### Items (category)

- `GET /api/items/category/:categoryName` - Get items filtered by category (used by Quick Bill tabs)

## Usage 💳

1. Login or register an account
2. Select a category tab; items auto-load from the API
3. Use the search bar to filter items in that category
4. Click an item, choose quantity type (Kg/Pcs), and add it to the bill (add custom items under “Others”)
5. View totals live in the right-side preview
6. Click **Generate Bill (JPG)** to save the bill to the server and download an image
7. Use **Clear** to reset the form

## Data Models 💾

### ItemModel

```
javascript
{
  name: String,
  category: String,
  image: String,
  price: Number,
  createdAt: Date
}
```

### BillModel

```
javascript
{
  customerName: String,
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      total: Number,
      category: String,
      itemId: ObjectId | null
    }
  ],
  totalAmount: Number,
  createdAt: Date
}
```

## Screenshots 📸

![Bill Preview Demo](https://via.placeholder.com/1200x800/4F46E5/FFFFFF?text=Quick+Bill+-+Kavita%27s+Kitchen)
![Dashboard Analytics](https://via.placeholder.com/1200x400/10B981/FFFFFF?text=Sales+Dashboard)
![Products Management](https://via.placeholder.com/1200x600/3B82F6/FFFFFF?text=Items+%26+CRUD)
![Auth Pages](https://via.placeholder.com/1200x800/F59E0B/FFFFFF?text=Login+Register)

> **Tip**: Take screenshots from running app (`npm run dev` in Frontend/Backend). See `Frontend/public/images/` for product photos used in app.

## Deployment 🚀

### Frontend (Vercel/Netlify)
1. `cd Frontend && npm run build`
2. Deploy the `dist/` folder to Vercel/Netlify (drag-drop or CLI)
3. Update `src/api/axios.ts` baseURL to your deployed backend (e.g., `https://your-backend.onrender.com/api`)

### Backend (Render/Heroku)
1. Push code to GitHub
2. Create app on [Render.com](https://render.com) or Heroku
3. Set environment variables: `MONGODB_URI`, `JWT_SECRET`, all `CLOUDINARY_*`
4. Deploy (auto on push)

### Services
- **Database**: MongoDB Atlas (free M0 cluster)
- **Storage**: Cloudinary (free plan sufficient)


## License 📄

Proprietary project for Kavita's Kitchen. All rights reserved. No open source license.
