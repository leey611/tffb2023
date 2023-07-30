/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'h1': 'clamp(1.5rem, 0.908rem + 3.158vw, 3.75rem)',
        'h2': 'clamp(1.25rem, 1.053rem + 1.053vw, 2rem)',
        'h3': 'clamp(0.875rem, 0.711rem + 0.877vw, 1.5rem)',
        'h4': 'clamp(0.75rem, 0.618rem + 0.702vw, 1.25rem)',
        'h5': 'clamp(0.75rem, 0.618rem + 0.702vw, 1.25rem)',
        'b1': 'clamp(0.75rem, 0.684rem + 0.351vw, 1rem)'
      },
      fontWeight: {
        'light': 100,
        'medium': 500,
        'semibold': 700,
        // Add more custom font weights as needed
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', "微軟正黑體", "PingFang", "STHeiti", "黑體-繁", "Noto Sans TC",'sans-serif'],
        special: ['Terminal Grotesque', 'Helvetica Neue', "微軟正黑體", "PingFang", "STHeiti", "黑體-繁", "Noto Sans TC", 'Arial', 'sans-serif'],
        // Add more custom font families as needed
      },
      colors: {
        'primary': '#D6366F',
        'secondary': '#0F2537',
        'tertiary': '#D8DF50',
        'material': '#FFE1E6',
      },
      maxWidth: {
        '1440': '1440px',
      },
      minWidth: {
        '300': '300px',
      },
    },
  },
  plugins: [],
}

