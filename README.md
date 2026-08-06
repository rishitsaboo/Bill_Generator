# Quick Bill – Bill Generator

A complete billing and admin dashboard application for a food business, built with React + TypeScript on the frontend and Express.js + MongoDB on the backend.

The project is designed for quick bill creation, inventory management, analytics, and bill history tracking.

## Features

- Bill generation with category-based product selection
- Custom item entry for on-the-fly billing
- Export bill receipt as JPEG using `html2canvas`
- Product CRUD with item image uploads via Cloudinary
- JWT-based admin authentication
- Dashboard analytics with trend and category charts
- Bill history with list, detail, edit, delete, and add-item support
- Responsive UI powered by Tailwind CSS

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router DOM 7
- Axios
- html2canvas
- dom-to-image-more
- html2pdf.js
- recharts
- lucide-react
- react-hot-toast

### Backend

- Node.js
- Express.js 5
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- multer + multer-storage-cloudinary
- dotenv
- cors

## Repository Structure

```
bill_generater/
├── Backend/
│   └── my_app/
│       ├── index.js
│       ├── package.json
│       ├── .env
│       ├── config/
│       │   └── cloudinary.js
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── scripts/
└── Frontend/
    ├── index.html
    ├── package.json
    ├── .env
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── vite.config.ts
    ├── public/
    └── src/
        ├── App.tsx
        ├── api/
        ├── components/
        ├── pages/
        └── types/
```

## Getting Started

### Prerequisites

- Node.js v18 or higher
- MongoDB Atlas / MongoDB cloud cluster
- Cloudinary account
- npm installed

### Backend Environment Variables

Create `Backend/my_app/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_SECRET=your_admin_registration_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
PORT=3000
```

### Frontend Environment Variables

Create `Frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

> Restart the frontend dev server after changing `.env`.

## MongoDB & Mongoose

The backend connects to MongoDB using Mongoose in `Backend/my_app/index.js`.

- `MONGO_URI` is required in `Backend/my_app/.env`.
- Mongoose manages the schema definitions and validation for `Item`, `Bill`, and `Admin` models.
- Collections are defined in `Backend/my_app/models/ItemModel.js`, `Backend/my_app/models/billModel.js`, and `Backend/my_app/models/Admin.js`.
- Mongoose handles object mapping between MongoDB documents and backend JavaScript objects, making queries and updates easier.
- If MongoDB is unavailable or `MONGO_URI` is invalid, the backend fails to start and logs an error.

## Installation

```bash
cd Frontend
npm install

cd ../Backend/my_app
npm install
```

## Run Locally

```bash
# Frontend
cd Frontend
npm run dev

# Backend
cd Backend/my_app
npm run dev
```

Open `http://localhost:5173` in your browser.

## Frontend Routes

- `/login` — Login page
- `/register` — Admin registration
- `/bill-generator` — Bill generation page
- `/dashboard` — Analytics dashboard
- `/products` — Product inventory management
- `/add-item` — Add new item
- `/bill-history` — Bill history and details

## API Endpoints

Base URL: `http://localhost:3000/api`

### Authentication

- `POST /api/auth/register` — Register admin
- `POST /api/auth/login` — Login admin

### Item Management

- `GET /api/items` — Get all items
- `GET /api/items/category/:categoryName` — Get items by category
- `POST /api/add-item` — Add new item with image upload
- `PUT /api/update-price/:id` — Update item data
- `DELETE /api/delete-item/:id` — Delete item

### Billing

- `POST /api/bills` — Create bill
- `POST /api/generate-bill` — Create bill alias

### Bill History

- `GET /api/history` — List bills
- `GET /api/history/:id` — Get bill detail
- `PUT /api/history/:id` — Update bill
- `DELETE /api/history/:id` — Delete bill
- `POST /api/history/:id/items` — Add item to existing bill

### Statistics

- `GET /api/stats/dashboard` — Dashboard metrics
- `GET /api/stats/dashboard/top-sellers` — Top seller list

## Data Models

### Item

- `name`: String
- `category`: String
- `price`: Number
- `image`: String
- `unit`: `plate` | `piece` | `per/kg`

### Bill

- `customerName`: String
- `date`: Date
- `items`: Array of items
- `totalAmount`: Number

## Notes

- The bill generator saves bills to MongoDB before exporting a JPG receipt.
- Frontend stores JWT token in `localStorage` under `auth_token`.
- Item units are supported and preserved in bills.

## Troubleshooting

### API errors

- Confirm backend is running on `http://localhost:3000`
- Confirm `VITE_API_URL` points to `http://localhost:3000/api`
- Restart frontend after env changes

### CORS errors

Update `allowedOrigins` in `Backend/my_app/index.js` if your frontend origin differs.

## Deployment

### Frontend

```bash
cd Frontend
npm run build
npm run preview
```

### Backend

Deploy `Backend/my_app` to a Node host, set environment variables, and ensure `FRONTEND_URL` is configured.

## License

Proprietary project for Kavita's Kitchen. All rights reserved.

## License 📄

Proprietary project for Kavita's Kitchen. All rights reserved. No open source license.
