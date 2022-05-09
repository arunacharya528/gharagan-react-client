module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        'fantasy': {
          'primary': '#fd4e5d',
          'primary-focus': '#9f1d28',
          'primary-content': '#ffffff',

          'secondary': '#334f80',
          'secondary-focus': '#182233',
          'secondary-content': '#ffffff',

          'accent': '#0D6efd',
          'accent-focus': '#0653c6',
          'accent-content': '#ffffff',

          'neutral': '#1e2734',
          'neutral-focus': '#111827',
          'neutral-content': '#ffffff',

          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#ced3d9',
          'base-content': '#1e2734',

          'info': '#1c92f2',
          'success': '#009485',
          'warning': '#ff9900',
          'error': '#ff5724',

          '--rounded-box': '1rem',
          '--rounded-btn': '0.5rem',
          '--rounded-badge': '1.9rem',

          '--animation-btn': '0.25s',
          '--animation-input': '0.2s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '0.5rem',
          '--border-btn': '1px',
        },
      },
    ],
  },
}
