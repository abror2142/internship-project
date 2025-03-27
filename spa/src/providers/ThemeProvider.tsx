import { PropsWithChildren, useState, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function ThemeProvider ({children} : PropsWithChildren) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // This sets the initial theme according to the mode of the device
        const checkSystemTheme = () => {
          const prefersDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          setIsDarkMode(prefersDarkMode);
        };
        checkSystemTheme();
    
        // This ensures changes made during mode changes
        const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const themeChangeHandler = (e: MediaQueryListEvent) => {
          setIsDarkMode(e.matches);
        };
        themeMediaQuery.addEventListener("change", themeChangeHandler);
    
        // Does clean up
        return () => {
          themeMediaQuery.removeEventListener("change", themeChangeHandler);
        };
      }, []);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    }

    return (
        <ThemeContext.Provider value={{toggleTheme, isDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;