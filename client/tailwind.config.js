/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite/plugin"
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {},
  },
  plugins: [flowbitePlugin],
};
