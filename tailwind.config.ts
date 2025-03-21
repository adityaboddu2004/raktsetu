
import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: [
					"SF Pro Display",
					"Inter",
					"-apple-system",
					"BlinkMacSystemFont",
					"Segoe UI",
					"Roboto",
					"Helvetica Neue",
					"sans-serif",
				],
			},
			colors: {
				border: 'hsl(var(--border, 240 5.9% 90%))',
				input: 'hsl(var(--input, 240 5.9% 90%))',
				ring: 'hsl(var(--ring, 240 5.9% 10%))',
				background: 'hsl(var(--background, 0 0% 100%))',
				foreground: 'hsl(var(--foreground, 240 10% 3.9%))',
				primary: {
					DEFAULT: 'hsl(var(--primary, 240 5.9% 10%))',
					foreground: 'hsl(var(--primary-foreground, 0 0% 98%))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary, 240 4.8% 95.9%))',
					foreground: 'hsl(var(--secondary-foreground, 240 5.9% 10%))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive, 0 84.2% 60.2%))',
					foreground: 'hsl(var(--destructive-foreground, 0 0% 98%))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted, 240 4.8% 95.9%))',
					foreground: 'hsl(var(--muted-foreground, 240 3.8% 46.1%))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent, 240 4.8% 95.9%))',
					foreground: 'hsl(var(--accent-foreground, 240 5.9% 10%))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover, 0 0% 100%))',
					foreground: 'hsl(var(--popover-foreground, 240 10% 3.9%))'
				},
				card: {
					DEFAULT: 'hsl(var(--card, 0 0% 100%))',
					foreground: 'hsl(var(--card-foreground, 240 10% 3.9%))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background, 0 0% 100%))',
					foreground: 'hsl(var(--sidebar-foreground, 240 10% 3.9%))',
					primary: 'hsl(var(--sidebar-primary, 240 5.9% 10%))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground, 0 0% 98%))',
					accent: 'hsl(var(--sidebar-accent, 240 4.8% 95.9%))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground, 240 5.9% 10%))',
					border: 'hsl(var(--sidebar-border, 240 5.9% 90%))',
					ring: 'hsl(var(--sidebar-ring, 240 5.9% 10%))'
				},
				blood: {
					DEFAULT: '#E63946',
					light: '#F8D7DA',
					dark: '#C82333',
					70: '#EE6E79'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-slow': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'count-up': {
					'0%': { content: '"0"' },
					'100%': { content: 'attr(data-value)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-out forwards',
				'fade-in-slow': 'fade-in-slow 1.2s ease-out forwards',
				'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
				'scale-in': 'scale-in 0.5s ease-out forwards',
				'float': 'float 6s infinite ease-in-out',
				'count-up': 'count-up 2s forwards'
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'glass-lg': '0 8px 32px rgba(0, 0, 0, 0.1)',
				'glass-hover': '0 8px 32px rgba(0, 0, 0, 0.15)',
				'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
				'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'hero-pattern': 'url("/hero-pattern.svg")',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
