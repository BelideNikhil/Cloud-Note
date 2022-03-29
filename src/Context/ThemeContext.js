import { useState, createContext, useContext } from "react";
const ThemeContext = createContext();
export function ThemeProvider({ children }) {
    const [themeToggle, setThemeToggle] = useState(false);
    function toggleThemeFunction() {
        setThemeToggle((prev) => !prev);
    }
    return <ThemeContext.Provider value={{ themeToggle, toggleThemeFunction }}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
    return useContext(ThemeContext);
}
