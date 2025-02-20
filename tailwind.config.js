/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
        "ubuntu-bold": ["Ubuntu-Bold", "sans-serif"],
        "ubuntu-bolditalic": ["Ubuntu-BoldItalic", "sans-serif"],
        "ubuntu-italic": ["Ubuntu-Italic", "sans-serif"],
        "ubuntu-light": ["Ubuntu-Light", "sans-serif"],
        "ubuntu-lightitalic": ["Ubuntu-LightItalic", "sans-serif"],
        "ubuntu-medium": ["Ubuntu-Medium", "sans-serif"],
        "ubuntu-mediumitalic": ["Ubuntu-MediumItalic", "sans-serif"],
        "ubuntu-regular": ["Ubuntu-Regular", "sans-serif"],
      },
      colors: {
        "primary-dark": {
          100:"#003155",
          200: "#03528C",
          300: "#0073B7",
          400: "#0289d7",
          500: "#00a1fe"},
        "primary-light": "#006bb8",
        "button-blue": "#c4e0fb"
      }
    },
  },
  plugins: [],
}