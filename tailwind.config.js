/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkGreen: "#2E6F40",
        lightGreen: "#86efac",
        darkGrey: "#1f2937",
      },
      backgroundImage: {
        "teal-green": "linear-gradient(to bottom right, #ffffff, #86efac)",
      },
      fontFamily: {
        poppins: ["Poppins_400Regular", "sans-serif"],
        "poppins-medium": ["Poppins_500Medium", "sans-serif"],
        "poppins-semibold": ["Poppins_600SemiBold", "sans-serif"],
        "poppins-bold": ["Poppins_700Bold", "sans-serif"],

        // Italics
        "poppins-italic": ["Poppins_400Regular_Italic", "sans-serif"],
        "poppins-medium-italic": ["Poppins_500Medium_Italic", "sans-serif"],
        "poppins-semibold-italic": ["Poppins_600SemiBold_Italic", "sans-serif"],
        "poppins-bold-italic": ["Poppins_700Bold_Italic", "sans-serif"],
      },
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
};
