/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    'fontFamily': {
      'sans': ['Satoshi', 'sans-serif'],
      'mono': ['Fragment Mono', 'monospace'],
    },
    extend: {},
  },
  plugins: [],
}