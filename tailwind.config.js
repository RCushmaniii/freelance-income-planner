/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: 'var(--accent)',
        muted: 'var(--muted)',
        'muted-strong': 'var(--muted-strong)',
        void: '#0d0d0d',
        parchment: '#e8e6e1',
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-source-serif)', 'serif'],
      },
      screens: {
        'docs': '1024px', // Custom breakpoint for documentation layout
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
