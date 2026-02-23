import { heroui } from "@heroui/theme";
import tailwindcssAnimate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

const herouiPlugin = heroui() as unknown as NonNullable<
  Config["plugins"]
>[number];

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [tailwindcssAnimate, herouiPlugin],
} satisfies Config;
