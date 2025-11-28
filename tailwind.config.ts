import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				bg: {
					DEFAULT: '#05060b',
					soft: '#0a0c14',
				},
				primary: {
					DEFAULT: '#48B7FF',
					soft: '#97DAFF',
				},
				glass: 'rgba(255,255,255,0.06)',
			},
			backdropBlur: {
				'xs': '2px',
			},
			boxShadow: {
				glow: '0 0 24px rgba(72,183,255,0.35)',
				glass: '0 4px 24px rgba(0,0,0,0.3)',
			},
		},
	},
	plugins: [],
} satisfies Config;





