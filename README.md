# Quick Bill – Bill Generator

A modern, responsive React + TypeScript web application with Express.js backend for generating and managing bills for Kavita's Kitchen. Built with Vite, Tailwind CSS, MongoDB, and includes authentication, bill generation, bill history, and image export capabilities.

## Features 📈

### Frontend

- **Category-based Item Management**: Browse items organized by categories (Namkeens, Sweets, Nasta Items, Sabzi, Others)
- **Dynamic Bill Generation**: Add/remove items to create custom bills with real-time total calculation
- **Customer Information**: Input and display customer name on bills
- **Bill Preview**: Live preview of the formatted bill receipt
- **Bill History**: View past bills, filter by month, and inspect bill details
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
- **Bill History API**: CRUD endpoints for retrieving, editing, and deleting past bills

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
| HTTP Client | Axios |
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
│       ├── .env                      # Backend environment variables (not committed)
│       ├── config/
│       ├── controllers/
│       │   ├── authControllers.js
│       │   ├── billControllers.js
│       │   ├── histryController.js
│       │   ├── itemControllers.js
│       │   └── statsController.js
│       ├── models/
│       │   ├── Admin.js
│       │   ├── billModel.js
│       │   └── ItemModel.js
│       ├── routes/
│       │   ├── authroutes.js
│       │   ├── billRoutes.js
│       │   ├── historyRoutes.js
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
    ├── .env                          # Frontend environment variables (not committed)
    ├── postcss.config.js
    ├── tailwind.config.cjs
    ├── tailwind.config.js
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── vercel.json
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
        │   ├── billHistory.ts
        │   ├── dashboardApi.ts
        │   └── productApi.ts
        ├── components/
        │   ├── history/
        │   │   └── historyMain.tsx
        │   ├── dashboard/
        │   ├── layout/
        │   ├── products/
        │   └── ...
        ├── pages/
        │   ├── AddItem.tsx
        │   ├── bill_history.tsx
        │   ├── bill_preview.tsx
        │   ├── dashboard.tsx
        │   ├── login_page.tsx
        │   ├── products.tsx
        │   └── register_page.tsx
        └── types/
            ├── bill.ts
            ├── dashboard.ts
            └── Item.ts
```

## Getting Started 🛠️

### Prerequisites

- Node.js v18 or higher
- MongoDB Atlas instance (or local MongoDB)
- Cloudinary account for image storage
- npm package manager

### Environment Variables

#### Backend (`Backend/my_app/.env`)

```env
MONGO_URI=your_mongodb_connection_string
ADMIN_SECRET=your_admin_registration_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
PORT=3000
```

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | Yes | MongoDB connection string |
| `ADMIN_SECRET` | Yes | Secret key required when registering a new admin |
| `CLOUDINARY_*` | Yes | Cloudinary credentials for product image uploads |
| `FRONTEND_URL` | No | Frontend URL used in backend config |
| `PORT` | No | Server port (defaults to `3000`) |

#### Frontend (`Frontend/.env`)

```env
VITE_API_URL=http://localhost:3000/api
```

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | Base URL for all API requests |

> **Important:** For local development, `VITE_API_URL` must point to your local backend (`http://localhost:3000/api`). Do not point it at a deployed URL unless that backend is running and up to date.
>
> After changing `.env`, restart the Vite dev server — env vars are loaded at startup only.

### Installation

1. **Frontend setup**

```bash
cd Frontend
npm install
```

2. **Backend setup**

```bash
cd Backend/my_app
npm install
```

### Running the Application

Start both services in separate terminals:

```bash
# Terminal 1 — Frontend (http://localhost:5173)
cd Frontend
npm run dev

# Terminal 2 — Backend (http://localhost:3000)
cd Backend/my_app
npm run dev
```

Verify the backend is running:

```bash
curl http://localhost:3000/api
curl http://localhost:3000/api/history
```

### Build for Production

```bash
cd Frontend
npm run build
```

This generates a `dist/` folder that can be deployed.

### Preview Production Build

```bash
cd Frontend
npm run preview
```

## API Endpoints 🔌

Base URL (local): `http://localhost:3000/api`

### Authentication

- `POST /api/auth/register` — Register a new admin (requires `adminKey` matching `ADMIN_SECRET`)
- `POST /api/auth/login` — Login and receive a JWT token

### Items

- `GET /api/items` — Get all items
- `GET /api/items/category/:categoryName` — Get items filtered by category
- `POST /api/add-item` — Create a new item (multipart form with optional image)
- `PUT /api/update-price/:id` — Update item price
- `DELETE /api/delete-item/:id` — Delete an item

### Bills

- `POST /api/bills` — Create a new bill
- `POST /api/generate-bill` — Create a new bill (alias used by Quick Bill page)

### Bill History

- `GET /api/history` — Get all bills (sorted by date, newest first)
- `GET /api/history/:id` — Get a single bill by ID
- `PUT /api/history/:id` — Update a bill
- `DELETE /api/history/:id` — Delete a bill
- `POST /api/history/:id/items` — Add an item to an existing bill

### Statistics

- `GET /api/stats/dashboard` — Dashboard statistics (trend, daily/monthly totals, category pie chart, top sellers)

## Usage 💳

1. Login or register an account
2. Select a category tab; items auto-load from the API
3. Use the search bar to filter items in that category
4. Click an item, choose quantity type (Kg/Pcs), and add it to the bill (add custom items under “Others”)
5. View totals live in the right-side preview
6. Click **Generate Bill (JPG)** to save the bill to the server and download an image
7. Open **Bill History** from the sidebar to view, filter, and inspect past bills
8. Use **Clear** to reset the form

## Troubleshooting

### `404` on `/api/history` during local development

1. Confirm the backend is running on port `3000`
2. Confirm `Frontend/.env` contains:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
3. Restart the frontend dev server after editing `.env`
4. Test directly: `http://localhost:3000/api/history` should return JSON

### CORS errors

The backend allows `http://localhost:5173` by default. If you use a different frontend port or domain, add it to the `allowedOrigins` array in `Backend/my_app/index.js`.

### Empty Bill History page

Check the browser Network tab — if the request goes to a deployed URL instead of `localhost:3000`, update `VITE_API_URL` and restart Vite.

## Data Models 💾

### ItemModel

```javascript
{
  name: String,
  category: String,
  image: String,
  price: Number,
  createdAt: Date
}
```

### BillModel

```javascript
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
  date: Date,
  createdAt: Date
}
```

## Screenshots 📸

![Bill Preview Demo](https://via.placeholder.com/1200x800/4F46E5/FFFFFF?text=Quick+Bill+-+Kavita%27s+Kitchen)
![Dashboard Analytics](https://via.placeholder.com/1200x400/10B981/FFFFFF?text=Sales+Dashboard)
![Products Management](https://via.placeholder.com/1200x600/3B82F6/FFFFFF?text=Items+%26+CRUD)
![Auth Pages](https://via.placeholder.com/1200x800/F59E0B/FFFFFF?text=Login+Register)

<<<<<<< HEAD
=======
> **Tip**: Take screenshots from the running app (`npm run dev` in Frontend/Backend). See `Frontend/public/images/` for product photos used in the app.
>>>>>>> 19eb5e7 (new feature added (Browse and manage monthly invoice records.))

## Deployment 🚀

### Frontend (Vercel / Netlify)

1. Build the app:
   ```bash
   cd Frontend && npm run build
   ```
2. Deploy the `dist/` folder to Vercel or Netlify
3. Set the environment variable in your hosting dashboard:
   ```env
   VITE_API_URL=https://your-backend.onrender.com/api
   ```
4. Redeploy after setting env vars so the build picks them up

### Backend (Render / Heroku)

1. Push code to GitHub
2. Create a Web Service on [Render.com](https://render.com) pointing to `Backend/my_app`
3. Set start command: `npm start`
4. Set environment variables:
   - `MONGO_URI`
   - `ADMIN_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `FRONTEND_URL` (your deployed frontend URL)
5. Deploy (auto on push if connected to GitHub)

> **Note:** After adding new API routes (such as `/api/history`), redeploy the backend so production matches your local code.

### Services

- **Database**: MongoDB Atlas (free M0 cluster)
- **Storage**: Cloudinary (free plan sufficient)

## License 📄

Proprietary project for Kavita's Kitchen. All rights reserved. No open source license.
