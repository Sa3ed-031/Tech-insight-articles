import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export let DarkModeContext = createContext();

// Colors come from CSS variables in styles/theme.css, switched by this attribute
function applyTheme(isDark) {
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
}

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    const mode = JSON.parse(localStorage.getItem("mode"));
    // Set the attribute before the first paint, so a saved dark mode
    // doesn't flash (or fade in from) light mode on load
    applyTheme(mode);
    return mode;
  });

  useEffect(() => {
    applyTheme(dark);
  }, [dark]);

  const toggleTheme = () => {
    setDark((pre) => !pre);
  };

  return (
    <DarkModeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};
