# Quick Bill – Bill Generator

A modern, responsive React + TypeScript web application with Express.js backend for generating and managing bills for Kavita's Kitchen. Built with Vite, Tailwind CSS, MongoDB, and includes authentication, bill generation, and image export capabilities.

## Features

### Frontend

- **Category-based Item Management**: Browse items organized by categories (Namkeens, Sweets, Nasta Items, Sabzi, Others)
- **Dynamic Bill Generation**: Add/remove items to create custom bills with real-time total calculation
- **Customer Information**: Input and display customer name on bills
- **Bill Preview**: Live preview of the formatted bill receipt
- **Download as Image**: Export bills as high-quality JPEG images using html2canvas
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **User Authentication**: Login/registration system with protected routes using JWT tokens stored in localStorage
- **Dashboard Analytics**: Visual statistics including sales charts, pie charts, top-selling items bar chart
- **Products Management**: Full CRUD operations for managing product inventory

### Backend

- **RESTful API**: Express.js backend with structured API endpoints
- **User Authentication**: JWT-based authentication with bcryptjs password hashing
- **MongoDB Integration**: Data persistence with Mongoose ODM
- **Cloud Storage**: Cloudinary integration for image uploads
- **Admin Management**: Admin panel for managing bills, items, and statistics

## Tech Stack

### Frontend

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

### Backend

| Technology | Description |
|------------|-------------|
| Runtime | Node.js with Express.js 5 |
| Database | MongoDB 7 with Mongoose ODM |
| Authentication | JWT (jsonwebtoken) with bcryptjs |
| File Upload | Multer with Cloudinary storage |
| Development | Nodemon for auto-restart |

## Project Structure

```
bill_generater/
├── Frontend/                         # React Frontend Application
│   ├── src/
│   │   ├── api/                     # API modules
│   │   │   ├── authApi.ts           # Authentication API calls
│   │   │   ├── axios.ts             # Axios instance configuration
│   │   │   ├── dashboardApi.ts      # Dashboard analytics API
│   │   │   └── productApi.ts        # Product CRUD API calls
│   │   │
│   │   ├── components/
│   │   │   ├── AddItemModalt.tsx    # Modal for adding items to bill
│   │   │   ├── login.tsx            # Login form component
│   │   │   ├── Register.tsx         # Registration form component
│   │   │   ├── right_side.tsx       # Right side bill preview component
│   │   │   ├── dashboard/           # Dashboard components
│   │   │   │   ├── CategoryPieChart.tsx
│   │   │   │   ├── SalesChart.tsx
│   │   │   │   ├── StatCard.tsx
│   │   │   │   └── TopItemsBarChart.tsx
│   │   │   ├── layout/              # Layout components
│   │   │   │   ├── DashboardLayout.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   └── products/            # Product management components
│   │   │
│   │   ├── pages/
│   │   │   ├── bill_preview.tsx    # Main bill generator component
│   │   │   ├── login_page.tsx      # Login page component
│   │   │   ├── register_page.tsx    # Registration page component
│   │   │   ├── dashboard.tsx        # Dashboard analytics page
│   │   │   └── products.tsx         # Products management page
│   │   │
│   │   ├── types/
│   │   │   └── dashboard.ts         # TypeScript type definitions
│   │   │
│   │   ├── App.tsx                  # Root app routing
│   │   ├── main.tsx                 # Main entry point
│   │   ├── index.css                # Tailwind directives
│   │   └── App.css                  # Global styles
│   │
│   ├── public/images/               # Product images, logos, QR codes
│   │   ├── Login/
│   │   ├── Namkeens/
│   │   ├── Nasta_Items/
│   │   ├── right_side/
│   │   ├── Sabzi/
│   │   └── Sweets/
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   └── tsconfig.node.json
│
├── Backend/                          # Express.js Backend
│   └── my_app/
│       ├── config/
│       ├── controllers/
│       │   ├── authControllers.js   # Authentication logic
│       │   ├── billControllers.js  # Bill operations
│       │   ├── itemControllers.js  # Item operations
│       │   └── statsController.js  # Statistics
│       ├── models/
│       │   ├── Admin.js
│       │   ├── billModel.js
│       │   └── ItemModel.js
│       ├── routes/
│       │   ├── authroutes.js
│       │   ├── billRoutes.js
│       │   ├── itemRoutes.js
│       │   └── statsRoutes.js
│       ├── index.js                 # Entry point
│       ├── package.json
│       └── .env                     # Environment variables
│
├── .gitignore
└── README.md
```

## Getting Started

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

## API Endpoints

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

- `GET /api/stats` - Get dashboard statistics

## Usage

1. Login or register an account
2. Select a category to filter items
3. Add items to the bill
4. Select quantity type (full/half)
5. View the bill in real-time
6. Enter customer name
7. Download the bill as an image

## Data Models

### ItemModel

```
javascript
{
  name: String,
  category: String,
  image: String,
  amount: Number,
  createdAt: Date
}
```

### BillModel

```
javascript
{
  customerName: String,
  items: Array,
  qtyType: String,
  quantity: Number,
  total: Number,
  grandTotal: Number,
  createdAt: Date
}
```

## License

All rights reserved. Proprietary project.
