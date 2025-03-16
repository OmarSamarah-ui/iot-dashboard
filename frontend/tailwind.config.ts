import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // ✅ Add content paths
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;
