/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        colors : {
          primary : '#6B8AFD',
          dark : '#3B3B3B',
          semiDark : '#787878',
          netral : '#8C8C8C',
          semiLight : '#EFF2F5',
          light : '#f9f9f8',
        }
    },
    screens : {
      ssm : "352px",
      xs : "480px",
      ss : "543px",
      sm : "768px",
      md : "1024px",
      lg : "1280px",
      xl : "1440px",
      xxl : "1700px"
    }
  },
  plugins: [],
}

