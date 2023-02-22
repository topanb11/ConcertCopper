/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
			primary: "#FF8E72",
			secondary: "#EB9486",
			white: "#F7F7F7",
			dark: "#312F2F",
		}
  },
	fontFamily: {
		'ProximaNova': "ProximaNova"
	},
  plugins: [],
}