/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				soc: {
					bg: "#0B0F17", // Deep dark canvas
					card: "#111827", // Card background
					border: "#1F2937", // Muted borders
					cyan: "#06B6D4", // Primary highlight
					emerald: "#10B981", // Success/Active status
					amber: "#F59E0B", // Warning status
					rose: "#F43F5E", // High/Critical severity
				},
			},
			fontFamily: {
				mono: [
					"JetBrains Mono",
					"Fira Code",
					"monospace",
				],
				sans: ["Inter", "sans-serif"],
			},
		},
	},
	plugins: [],
};
