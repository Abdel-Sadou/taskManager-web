/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './app/**/*.{ts,tsx}',
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            animation: {
                'bounce-fast': 'bounce 0.1s infinite',
            },
        },
    },
    plugins: [],
}
export default config