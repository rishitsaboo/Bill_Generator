# Quick Bill - Bill Generator

A modern, responsive React + TypeScript web application with Express.js backend for generating and managing bills for Kavita's Kitchen. Built with Vite, Tailwind CSS, MongoDB, and includes authentication, bill generation, and image export capabilities.

## Features

### Frontend
- **Category-based Item Management**: Browse items organized by categories (Namkeens, Sweets, Nasta Items, Sabzi, Others)
- **Dynamic Bill Generation**: Add/remove items to create custom bills with real-time total calculation
- **Customer Information**: Input and display customer name on bills
- **Bill Preview**: Live preview of the formatted bill receipt
- **Download as Image**: Export bills as high-quality JPEG images using html2canvas
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **User Authentication**: Login and registration system with React Router

### Backend
- **RESTful API**: Express.js backend with structured API endpoints
- **User Authentication**: JWT-based authentication with bcryptjs password hashing
- **MongoDB Integration**: Data persistence with Mongoose ODM
- **Cloud Storage**: Cloudinary integration for image uploads
- **Admin Management**: Admin panel for managing bills, items, and statistics

## Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 with PostCSS
- **Routing**: React Router DOM 7
- **Image Capture**: html2canvas for bill export, dom-to-image-more for additional image handling
- **PDF Generation**: html2pdf.js for potential PDF exports
- **Icons**: Lucide React for UI icons
- **Linting**: ESLint with TypeScript support

### Backend
- **Runtime**: Node.js with Express.js 5
- **Database**: MongoDB 7 with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) with bcryptjs
- **File Upload**: Multer with Cloudinary storage
- **Development**: Nodemon for auto-restart

## Project Structure

```
bill_generater/
├── Frontend/                         # React Frontend Application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── bill_preview.tsx     # Main bill generator component
│   │   │   └── login_page.tsx       # Login page component
│   │   ├── components/
│   │   │   ├── AddItemModalt.tsx    # Modal for adding items to bill
│   │   │   ├── login.tsx            # Login form component
│   │   │   ├── Register.tsx         # Registration form component
│   │   │   └── right_side.tsx      # Right side bill preview component
│   │   ├── App.tsx                 # Root app component with routing
│   │   ├── main.tsx                # Entry point
│   │   ├── index.css               # Tailwind directives
│   │   └── App.css                 # Global styles
│   ├── public/
│   │   └── images/                 # Product images, logos, and QR codes
│   │       ├── Namkeens/           # Namkeen product images
│   │       ├── Nasta_Items/        # Nasta item images
│   │       ├── right_side/         # Logo and QR code images
│   │       ├── Sabzi/              # Sabzi product images
│   │       └── Sweets/            # Sweets product images
│   ├── index.html                  # HTML template
│   ├── vite.config.ts              # Vite configuration
│   ├── tailwind.config.cjs         # Tailwind CSS configuration (CommonJS)
│   ├── tailwind.config.js          # Tailwind CSS configuration (ESM)
│   ├── postcss.config.js           # PostCSS configuration
│   ├── tsconfig.json               # TypeScript configuration
│   └── package.json                # Frontend dependencies
│
├── Backend/                         # Express.js Backend Application
│   └── my_app/
│       ├── config/                  # Configuration files
│       ├── controllers/            # Request handlers
│       │   ├── authControllers.js  # Authentication logic
│       │   ├── billControllers.js # Bill management logic
│       │   ├── itemControllers.js  # Item CRUD operations
│       │   └── statsController.js  # Statistics and analytics
│       ├── models/                  # Mongoose models
│       │   ├── Admin.js            # Admin user model
│       │   ├── billModel.js        # Bill document model
│       │   └── ItemModel.js        # Item product model
│       ├── routes/                  # API route definitions
│       │   ├── authroutes.js       # Authentication routes
│       │   ├── billRoutes.js       # Bill management routes
│       │   ├── itemRoutes.js       # Item CRUD routes
│       │   └── statsRoutes.js      # Statistics routes
│       ├── index.js                 # Express app entry point
│       ├── package.json            # Backend dependencies
│       └── .env                     # Environment variables
│
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas cloud instance)
- **Cloudinary** account (for image storage)
- npm or yarn

### Environment Variables

Create a `.env` file in `Backend/my_app/` with the following:

```
env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend Installation

1. Navigate to the Frontend directory
   
```
bash
   cd Frontend
   
```

2. Install dependencies
   
```
bash
   npm install
   
```

3. Start the development server
   
```
bash
   npm run dev
   
```
   The app will be available at `http://localhost:5173` (or next available port)

### Backend Installation

1. Navigate to the Backend directory
   
```
bash
   cd Backend/my_app
   
```

2. Install dependencies
   
```
bash
   npm install
   
```

3. Start the development server
   
```
bash
   npm run dev
   
```
   The API will be available at `http://localhost:5000`

### Running Both Services

For development, you'll need to run both Frontend and Backend:
- Frontend: `cd Frontend && npm run dev`
- Backend: `cd Backend/my_app && npm run dev`

## Build for Production

### Frontend

```
bash
cd Frontend
npm run build
```

This generates optimized files in the `dist/` directory.

### Preview Production Build

```
bash
cd Frontend
npm run preview
```

### Deploy to GitHub Pages

```
bash
cd Frontend
npm run deploy
```

This builds the project and deploys it to GitHub Pages using gh-pages.

## Available Scripts

### Frontend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Backend
- `npm run dev` - Start development server with nodemon
- `npm run test` - Run tests (if configured)

## API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new admin user |
| POST | `/login` | Login and get JWT token |
| GET | `/me` | Get current user info |

### Item Routes (`/api/items`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all items |
| POST | `/` | Create new item (with image upload) |
| PUT | `/:id` | Update item details |
| DELETE | `/:id` | Delete item |

### Bill Routes (`/api/bills`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all bills |
| POST | `/` | Create new bill |
| GET | `/:id` | Get specific bill |
| DELETE | `/:id` | Delete bill |

### Stats Routes (`/api/stats`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get dashboard statistics |

## Usage

### Frontend Usage

1. **Login/Register**: Access the app and either login or register a new account
2. **Select Category**: Click on category buttons (Namkeens, Sweets, etc.) to filter items
3. **Add Items**: Click on any item card to open the add-to-bill modal
4. **Specify Quantity**: Choose quantity type (Kg, pieces) and enter the amount
5. **View Bill**: The bill preview updates in real-time on the right side
6. **Customer Name**: Enter customer name in the input field at the top of the bill preview
7. **Download Bill**: Click the "Download Bill" button to export the bill as a PNG image

### Backend API Usage

The backend provides RESTful APIs for:
- Managing user authentication
- CRUD operations for items
- Bill generation and management
- Dashboard statistics

## Data Models

### Item Model
```
javascript
{
  name: String,           // Item name
  category: String,       // Category (Namkeens, Sweets, etc.)
  image: String,          // Cloudinary image URL
  amount: Number,         // Price per unit
  createdAt: Date
}
```

### Bill Model
```
javascript
{
  customerName: String,   // Customer name
  items: [{
    item: ObjectId,       // Reference to Item
    qtyType: String,      // "Kg" or "Pcs"
    quantity: Number,     // Amount
    total: Number         // Line item total
  }],
  grandTotal: Number,     // Total bill amount
  createdAt: Date
}
```

### Admin Model
```
javascript
{
  username: String,       // Admin username
  password: String,       // Hashed password
  createdAt: Date
}
```

## Configuration Files

### Frontend
- **vite.config.ts**: Configures Vite with React plugin and TypeScript support
- **tailwind.config.ts**: Tailwind CSS theme customization
- **postcss.config.js**: PostCSS with Tailwind plugin
- **tsconfig.json**: TypeScript compiler options

### Backend
- **index.js**: Express app setup with middleware and routes
- **config/**: Environment and database configuration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- **Hot Module Replacement (HMR)** is enabled for instant updates during development
- **TypeScript strict mode** is configured for type safety
- **ESLint** configuration enforces code quality standards
- **Tailwind CSS** is configured with content purging for optimal production builds
- **JWT tokens** expire after 24 hours (configurable)
- **Cloudinary** handles all image uploads for items

## Project Demo

The project is deployed at: https://rishitsaboo.github.io/bill_generator

## License

This project is proprietary. All rights reserved.
