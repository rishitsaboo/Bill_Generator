/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brandBrown: '#5e2c13',   // ← your custom color added here
      },
    },
  },
  safelist: [
    { pattern: /text-\[.*\]/ }, // allow arbitrary text colors
  ],
  plugins: [],
};