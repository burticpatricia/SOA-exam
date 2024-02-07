const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**.*.{vue,js,ts,jsx,tsx}', 'node_modules/vue-tailwind/dist/*.js'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        heading: 'var(--heading)',
        paragraph: 'var(--paragraph)',
        secondary: 'var(--secondary)',
        background: 'var(--background)',
        disabled: 'var(--disabled)',
        error: 'var(--error)',
        warning: 'var(--warning)',
        success: 'var(--success)',
        info: 'var(--info)',
      },
      boxShadow: {
        topbar: 'rgba(0, 0, 0, 0.07) 0px 0px 40px',
        default: 'rgba(0, 0, 0, 0.07) 0px 4px 24px',
      },
      borderWidth: {
        1: '1px',
      },
      borderRadius: {
        default: '8px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: '14px' },
      })
    }),
  ],
}
