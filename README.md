# Quick Bill - Bill Generator

A modern, responsive React + TypeScript web application for generating and managing bills for Kavita's Kitchen. Built with Vite, Tailwind CSS, and html2canvas for seamless bill creation and export.

## Features

- **Category-based Item Management**: Browse items organized by categories (Namkeens, Sweets, Nasta Items, Sabzi, Others)
- **Dynamic Bill Generation**: Add/remove items to create custom bills with real-time total calculation
- **Customer Information**: Input and display customer name on bills
- **Bill Preview**: Live preview of the formatted bill receipt
- **Download as Image**: Export bills as high-quality JPEG images using html2canvas
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Modern Stack**: React 19, TypeScript, Vite 7, and Tailwind CSS 4

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 with PostCSS
- **Image Capture**: html2canvas for bill export, dom-to-image-more for additional image handling
- **PDF Generation**: html2pdf.js for potential PDF exports
- **Icons**: Lucide React for UI icons
- **Linting**: ESLint with TypeScript support
- **Development Server**: Vite HMR for instant refresh

## Project Structure

```
bill_generater/
├── src/
│   ├── pages/
│   │   └── bill_preview.tsx          # Main bill generator component
│   ├── components/
│   │   ├── AddItemModalt.tsx         # Modal for adding items to bill
│   │   └── right_side.tsx            # Right side bill preview component
│   ├── App.tsx                       # Root app component
│   ├── main.tsx                      # Entry point
│   ├── index.css                     # Tailwind directives
│   └── App.css                       # Global styles
├── public/
│   └── images/                       # Product images, logos, and QR codes
│       ├── Namkeens/
│       ├── Nasta_Items/
│       ├── right_side/
│       ├── Sabzi/
│       └── Sweets/
├── index.html                        # HTML template
├── vite.config.ts                    # Vite configuration
├── tailwind.config.cjs               # Tailwind CSS configuration (CommonJS)
├── tailwind.config.js                # Tailwind CSS configuration (ESM)
├── postcss.config.js                 # PostCSS configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd bill_generater
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or next available port)

### Build for Production

```bash
npm run build
```

This generates optimized files in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

This builds the project and deploys it to GitHub Pages using gh-pages.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Usage

1. **Select Category**: Click on category buttons (Namkeens, Sweets, etc.) to filter items
2. **Add Items**: Click on any item card to open the add-to-bill modal
3. **Specify Quantity**: Choose quantity type (Kg, pieces) and enter the amount
4. **View Bill**: The bill preview updates in real-time on the right side
5. **Customer Name**: Enter customer name in the input field at the top of the bill preview
6. **Download Bill**: Click the "Download Bill" button to export the bill as a PNG image

## Key Components

### BillGenerator (bill_preview.tsx)

Main component that manages:
- Category selection and filtering
- Item catalog display
- Bill items state and calculations
- Modal interaction for adding items
- Bill preview rendering
- Image capture and download functionality

### AddItemModal (AddItemModalt.tsx)

Modal component for:
- Displaying item details
- Accepting quantity input (Kg/grams or pieces)
- Calculating total amount
- Adding item to bill

## Data Structure

```typescript
type Item = {
  id: string;
  name: string;
  image: string;
  amount: number;  // Price per unit
};

type AddedItem = Item & {
  qtyType: string;  // "Kg" or "Pcs"
  kg?: string;
  gram?: string;
  pcs?: string;
  total: number;    // Total amount for this item
};
```

## Configuration Files

- **vite.config.ts**: Configures Vite with React plugin and TypeScript support
- **tailwind.config.ts**: Tailwind CSS theme customization
- **postcss.config.js**: PostCSS with Tailwind plugin
- **tsconfig.json**: TypeScript compiler options

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- Hot Module Replacement (HMR) is enabled for instant updates during development
- TypeScript strict mode is configured for type safety
- ESLint configuration enforces code quality standards
- Tailwind CSS is configured with content purging for optimal production builds

## License

This project is proprietary. All rights reserved.

## Support

For issues or feature requests, please contact the development team.
