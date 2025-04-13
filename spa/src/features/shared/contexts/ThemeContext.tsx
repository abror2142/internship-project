import { createContext } from "react";

interface ThemeContextInterface {
    isDarkMode: boolean,
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextInterface | undefined>(undefined);