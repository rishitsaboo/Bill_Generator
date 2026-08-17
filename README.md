# Quick Bill — Food Billing & Ordering App

Quick Bill is a full-stack application for a food business. It provides an admin workspace for product management, bill generation, history, orders, and sales reporting, plus a customer menu, cart, and checkout experience.

## Highlights

- Admin login and registration protected by a registration secret
- Product catalogue with categories, pricing, units, availability, best-seller flags, and Cloudinary image uploads
- Quick bill creation and downloadable receipt image
- Bill history: view, edit, delete, and add items to an existing bill
- Dashboard reporting for daily and monthly sales, daily sales trends, category revenue, and top-selling items
- Top-selling-item tooltips show both quantity sold and total sales amount
- Customer-facing menu with category filtering, cart, checkout, and order confirmation
- Admin order management with status updates (`Pending` through `Completed` or `Cancelled`)
- Responsive React UI styled with Tailwind CSS

## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, React Router, Tailwind CSS, Axios, Recharts |
| Backend | Node.js, Express 5, MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Media | Multer, Cloudinary |
| Receipts & UI | html2canvas, lucide-react, react-hot-toast |

## Project Structure

```text
bill_generater/
├── Frontend/                 # React + TypeScript application
│   ├── src/
│   │   ├── api/              # Axios API clients
│   │   ├── components/       # Admin, customer, dashboard, and shared UI
│   │   ├── context/          # Cart state
│   │   ├── pages/            # Route-level pages
│   │   └── types/            # TypeScript models
│   ├── public/               # Icons and static images
│   └── vercel.json           # SPA rewrite configuration
└── Backend/my_app/           # Express + MongoDB API
    ├── config/               # Cloudinary configuration
    ├── controllers/          # Request handlers
    ├── middleware/           # JWT/admin authorization
    ├── models/               # Admin, Item, Bill, and Order schemas
    ├── routes/               # API route definitions
    └── scripts/              # Development seed data/scripts
```

## Prerequisites

- Node.js 18+
- npm
- A MongoDB database (Atlas or self-hosted)
- A Cloudinary account for product image uploads

## Environment Variables

Create `Backend/my_app/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=use_a_long_random_secret
ADMIN_SECRET=secret_required_to_register_an_admin
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
PORT=3000
```

Create `Frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

Restart the Vite development server after changing a `VITE_*` variable.

## Install and Run

Install the two applications independently:

```bash
cd Frontend
npm install

cd ../Backend/my_app
npm install
```

Start the API in one terminal:

```bash
cd Backend/my_app
npm run dev
```

Start the frontend in another terminal:

```bash
cd Frontend
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). The API runs on port `3000` by default.

## Application Routes

### Customer routes

| Route | Purpose |
| --- | --- |
| `/menu` | Browse products and add them to the cart |
| `/checkout` | Enter customer details and place an order |
| `/order-success` | Order confirmation |

### Admin routes

Admin pages require a valid JWT stored as `auth_token` in browser local storage.

| Route | Purpose |
| --- | --- |
| `/login` | Admin sign-in |
| `/register` | Admin registration |
| `/dashboard` | Sales analytics |
| `/bill-generator` | Create a bill and receipt |
| `/products` | Product management |
| `/add-item` | Add a product |
| `/bill-history` | Manage previous bills |
| `/orders` | Manage customer orders |
| `/admin/orders/:id` | View one order |

## API Reference

Base URL: `http://localhost:3000/api`

Routes marked **Admin** require `Authorization: Bearer <token>`.

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/auth/register` | Register an admin; requires `adminKey` in the body |
| `POST` | `/auth/login` | Sign in and receive a JWT |

### Admin product management

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/items` | List products (**Admin**) |
| `GET` | `/items/category/:categoryName` | List a category (**Admin**) |
| `POST` | `/add-item` | Add a product and image (**Admin**, `multipart/form-data`) |
| `PUT` | `/update-price/:id` | Update name, price, unit, or best-seller flag (**Admin**) |
| `DELETE` | `/delete-item/:id` | Delete a product (**Admin**) |

### Public customer menu

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/menu/items` | List all menu items |
| `GET` | `/menu/items/category/:categoryName` | List one menu category |
| `GET` | `/menu/items/:id` | Get one menu item |

### Bills and bill history

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/bills` | Create a bill (**Admin**) |
| `POST` | `/generate-bill` | Alias for creating a bill (**Admin**) |
| `GET` | `/history` | List bills (**Admin**) |
| `GET` | `/history/:id` | Get a bill (**Admin**) |
| `PUT` | `/history/:id` | Update a bill (**Admin**) |
| `DELETE` | `/history/:id` | Delete a bill (**Admin**) |
| `POST` | `/history/:id/items` | Add an item to a bill (**Admin**) |

### Customer orders

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/orders` | Place a customer order |
| `GET` | `/orders` | List orders (**Admin**) |
| `GET` | `/orders/:id` | Get an order (**Admin**) |
| `PUT` | `/orders/:id/status` | Update order status (**Admin**) |
| `DELETE` | `/orders/:id` | Delete an order (**Admin**) |

### Dashboard statistics

| Method | Endpoint | Query parameters | Description |
| --- | --- | --- | --- |
| `GET` | `/stats/dashboard` | `year`, `month`, `date`, optional `category` | Daily/monthly totals, sales trend, category revenue, and top sellers |
| `GET` | `/stats/dashboard/top-sellers` | `year`, `month`, optional `category` | Five products ranked by quantity sold, including `totalSales` |

## Core Data Models

### Item

`name`, `category`, `price`, `image`, `unit`, optional `ingredients`, `description`, `isAvailable`, and `isBestSeller`.

Supported units: `plate`, `piece`, and `per/kg`.

### Bill and Order

Both contain customer details, line items, a total amount, timestamps, and a status. Each stored line item includes the product name, category, price, quantity, unit, and line total. Orders use these statuses:

```text
Pending → Accepted → Preparing → Ready → Completed
                              ↘ Cancelled
```

## Dashboard Metrics

Dashboard data is grouped by the selected calendar month and uses the `Asia/Kolkata` timezone for the daily sales trend. The top-sellers response includes:

```json
{
  "name": "Kachori Chaat",
  "totalQuantity": 35,
  "totalSales": 1750
}
```

The chart visualizes quantity sold; its tooltip presents both quantity and total sales in Indian rupees.

## Build for Production

```bash
cd Frontend
npm run build
npm run preview
```

Deploy `Frontend` as a static single-page application (the included `vercel.json` handles route rewrites on Vercel). Deploy `Backend/my_app` to a Node.js host with all required environment variables set. Add the deployed frontend domain to `allowedOrigins` in `Backend/my_app/index.js` when needed.

## Troubleshooting

- **The frontend cannot reach the API:** confirm the backend is running, `VITE_API_URL` points to the API base URL, and restart Vite after environment changes.
- **CORS is blocked:** add the frontend origin to `allowedOrigins` in `Backend/my_app/index.js`.
- **Image upload fails:** verify all three Cloudinary credentials and submit the product image as the `image` form field.
- **Admin request returns 401/403:** sign in again and ensure the request contains the stored JWT.
- **Sales amount in the top-sellers tooltip is zero:** restart or redeploy the backend after changes to the statistics controller; the endpoint must return `totalSales` for each item.

## License

Proprietary project for Kavita's Kitchen. All rights reserved.
