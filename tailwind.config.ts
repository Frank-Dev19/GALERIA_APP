import type { Config } from "tailwindcss"
//import defaultConfig from "shadcn/ui/tailwind.config"

const config: Config = {
    //...defaultConfig,
    content: [
        //...defaultConfig.content,
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        //...defaultConfig.theme,
        extend: {
            //...defaultConfig.theme.extend,
            colors: {
                //...defaultConfig.theme.extend.colors,
                lavender: {
                    100: "#f3f0ff",
                    200: "#e9e5ff",
                    300: "#d4d1ff",
                    400: "#b8b3ff",
                    500: "#9b95ff",
                    600: "#7c76ff",
                },
                coral: {
                    100: "#fff2f0",
                    200: "#ffe5e0",
                    300: "#ffd1c7",
                    400: "#ffb8a8",
                    500: "#ff9e89",
                    600: "#ff846a",
                },
            },
            fontFamily: {
                script: ["Brush Script MT", "cursive", "fantasy"],
                elegant: ["Georgia", "Times New Roman", "Times", "serif"],
            },
            animation: {
                //...defaultConfig.theme.extend.animation,
                float: "float 6s ease-in-out infinite",
                "pulse-slow": "pulse 3s ease-in-out infinite",
            },
            keyframes: {
                //...defaultConfig.theme.extend.keyframes,
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}

export default config
