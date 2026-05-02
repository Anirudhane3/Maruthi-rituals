/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        gold: '#FFD700',
        maroon: '#800000',
        'deep-maroon': '#5C0000',
        'light-saffron': '#FFEECC',
        'cream': '#FFF8F0',
        // Divine Dark Mode Colors
        'divine-dark': '#1a0d0d',   // Deep spiritual maroon-charcoal (not black)
        'incense-grey': '#2a1b1b',  // Warm incense-toned grey for cards
        'diya-gold': '#FFE270',     // Soft glowing gold for text and highlights
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-left': 'slideLeft 0.8s ease-out forwards',
        'slide-right': 'slideRight 0.8s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 153, 51, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 153, 51, 0.8)' },
        },
      },
      backgroundImage: {
        'gradient-spiritual': 'linear-gradient(135deg, #800000 0%, #FF9933 50%, #FFD700 100%)',
        'gradient-hero': 'linear-gradient(to bottom, rgba(92, 0, 0, 0.85), rgba(128, 0, 0, 0.7), rgba(255, 153, 51, 0.4))',
      },
    },
  },
  plugins: [],
}
