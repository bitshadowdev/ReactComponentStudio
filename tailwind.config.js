/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Settings Panel Color Scheme - Black & White Theme
        settings: {
          // Light theme (default)
          bg: {
            primary: '#ffffff',
            secondary: '#f8f9fa',
            tertiary: '#f1f3f4',
            elevated: '#ffffff'
          },
          surface: {
            primary: '#ffffff',
            secondary: '#f8f9fa',
            tertiary: '#e8eaed',
            hover: '#f1f3f4',
            active: '#e8eaed',
            border: '#dadce0'
          },
          text: {
            primary: '#202124',
            secondary: '#5f6368',
            tertiary: '#80868b',
            disabled: '#9aa0a6',
            inverse: '#ffffff'
          },
          accent: {
            primary: '#1a73e8',
            secondary: '#174ea6',
            hover: '#1557b0',
            light: '#e8f0fe'
          },
          // Dark theme
          dark: {
            bg: {
              primary: '#202124',
              secondary: '#292a2d',
              tertiary: '#35363a',
              elevated: '#292a2d'
            },
            surface: {
              primary: '#292a2d',
              secondary: '#35363a',
              tertiary: '#3c4043',
              hover: '#3c4043',
              active: '#48494c',
              border: '#5f6368'
            },
            text: {
              primary: '#e8eaed',
              secondary: '#9aa0a6',
              tertiary: '#80868b',
              disabled: '#5f6368',
              inverse: '#202124'
            },
            accent: {
              primary: '#8ab4f8',
              secondary: '#aecbfa',
              hover: '#93bad8',
              light: '#1e2124'
            }
          }
        },
        
        // Slider specific colors
        slider: {
          track: '#e4e6ea',
          'track-dark': '#3c4043',
          thumb: '#ffffff',
          'thumb-dark': '#e8eaed',
          'thumb-shadow': 'rgba(0, 0, 0, 0.2)',
          'thumb-shadow-dark': 'rgba(255, 255, 255, 0.1)',
          progress: '#1a73e8',
          'progress-dark': '#8ab4f8'
        },

        // Notification System Colors
        notification: {
          bg: {
            primary: '#ffffff',
            secondary: '#f8f9fa',
            success: '#f0f9ff',
            info: '#eff6ff',
            warning: '#fffbeb',
            error: '#fef2f2'
          },
          text: {
            primary: '#1f2937',
            secondary: '#6b7280',
            muted: '#9ca3af',
            success: '#059669',
            info: '#2563eb',
            warning: '#d97706',
            error: '#dc2626'
          },
          border: {
            primary: '#e5e7eb',
            secondary: '#d1d5db',
            success: '#a7f3d0',
            info: '#93c5fd',
            warning: '#fcd34d',
            error: '#fca5a5'
          },
          icon: {
            success: '#10b981',
            info: '#3b82f6',
            warning: '#f59e0b',
            error: '#ef4444',
            code: '#2563eb',
            config: '#059669'
          }
        },

        // Component States
        component: {
          // Editor Status Button States
          editor: {
            button: {
              inactive: {
                text: '#6b7280',
                bg: 'transparent',
                hover: {
                  text: '#1f2937',
                  bg: '#f3f4f6'
                }
              },
              active: {
                text: '#2563eb',
                bg: '#dbeafe',
                hover: {
                  text: '#1d4ed8',
                  bg: '#bfdbfe'
                }
              }
            }
          },
          
          // Interactive Elements
          interactive: {
            primary: {
              text: '#ffffff',
              bg: '#1f2937',
              hover: {
                text: '#ffffff',
                bg: '#374151'
              },
              active: {
                text: '#ffffff',
                bg: '#111827'
              }
            },
            secondary: {
              text: '#1f2937',
              bg: '#f3f4f6',
              hover: {
                text: '#1f2937',
                bg: '#e5e7eb'
              },
              disabled: {
                text: '#9ca3af',
                bg: '#f9fafb'
              }
            },
            undo: {
              text: '#6b7280',
              bg: 'transparent',
              hover: {
                text: '#2563eb',
                bg: '#eff6ff'
              }
            },
            close: {
              text: '#9ca3af',
              bg: 'transparent',
              hover: {
                text: '#6b7280',
                bg: '#f3f4f6'
              }
            }
          }
        }
      },
      boxShadow: {
        'settings': '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
        'settings-lg': '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15)',
        'settings-dark': '0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)',
        'settings-lg-dark': '0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 2px 6px 2px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'settings': '8px',
        'settings-sm': '6px',
        'settings-lg': '12px'
      },
      fontSize: {
        'settings-xs': ['11px', { lineHeight: '16px' }],
        'settings-sm': ['13px', { lineHeight: '20px' }],
        'settings-base': ['14px', { lineHeight: '22px' }],
        'settings-lg': ['16px', { lineHeight: '24px' }]
      }
    },
  },
  plugins: [],
}
