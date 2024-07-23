/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                'circ-book': ['circ-book', 'sans-serif'],
                'circ-bold': ['circ-bold', 'sans-serif'],
            },
            screens: {
                laptop: '1400px',
                mobile: '800px',
            },
        },
    },
    plugins: ['prettier-plugin-tailwindcss'],
}
