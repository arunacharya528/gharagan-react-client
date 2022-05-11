module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        'light': {
          'primary': '#fd4e5d',
          'primary-focus': '#f53d4c',
          'primary-content': '#ffffff',

          'secondary': '#334f80',
          'secondary-focus': '#2e4670',
          'secondary-content': '#ffffff',

          'accent': '#0D6efd',
          'accent-focus': '#0d58c9',
          'accent-content': '#ffffff',

          'neutral': '#1e2734',
          'neutral-focus': '#111827',
          'neutral-content': '#ffffff',

          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#ced3d9',
          'base-content': '#1e2734',

          'info': '#1cc7f2',
          'success': '#009431',
          'warning': '#ff9900',
          'error': '#d10011',

          '--rounded-box': '1rem',
          '--rounded-btn': '0.5rem',
          '--rounded-badge': '1.9rem',

          '--animation-btn': '0.25s',
          '--animation-input': '0.2s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '0.5rem',
          '--border-btn': '1px',  
        },

        'dark': {
          'primary': '#fd4e5d',
          'primary-focus': '#f53d4c',
          'primary-content': '#ffffff',

          'secondary': '#334f80',
          'secondary-focus': '#2e4670',
          'secondary-content': '#ffffff',

          'accent': '#0D6efd',
          'accent-focus': '#0d58c9',
          'accent-content': '#ffffff',

          'neutral': '#1e2734',
          'neutral-focus': '#111827',
          'neutral-content': '#ffffff',

          'base-100': '#1f1f1f',
          'base-200': '#1b1d1d',
          'base-300': '#131616',
          'base-content': '#ffffff',

          'info': '#1cc7f2',
          'success': '#009431',
          'warning': '#ff9900',
          'error': '#d10011',

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
