
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blood: {
          DEFAULT: 'var(--blood)',
          hover: 'var(--blood-hover)',
          // Add opacity variants
          '50': 'color-mix(in srgb, var(--blood) 50%, transparent)',
          '60': 'color-mix(in srgb, var(--blood) 60%, transparent)',
          '70': 'color-mix(in srgb, var(--blood) 70%, transparent)',
          '80': 'color-mix(in srgb, var(--blood) 80%, transparent)',
          '90': 'color-mix(in srgb, var(--blood) 90%, transparent)',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: {
          DEFAULT: 'var(--muted)',
        },
      }
    },
  },
  plugins: [],
}
