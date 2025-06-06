import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ColorTheme = "purple" | "orange" | "pink" | "blue";

type ThemeProviderContextType = {
  theme: Theme;
  colorTheme: ColorTheme;
  setTheme: (theme: Theme) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
  toggleTheme: () => void;
};

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

export function ThemeProvider({ children, defaultTheme = "light", defaultColorTheme = "purple" }: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColorTheme?: ColorTheme;
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("kinnren-theme") as Theme;
      if (stored) return stored;
    }
    return defaultTheme;
  });

  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("kinnren-color-theme") as ColorTheme;
      if (stored) return stored;
    }
    return defaultColorTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    localStorage.setItem("kinnren-theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Logo color-based theme mapping
    const colorMappings = {
      purple: {
        primary: "267 84% 64%",
        accent: "280 100% 70%",
      },
      orange: {
        primary: "25 95% 63%",
        accent: "39 100% 60%",
      },
      pink: {
        primary: "330 81% 60%",
        accent: "340 82% 65%",
      },
      blue: {
        primary: "246 83% 57%",
        accent: "220 91% 60%",
      }
    };

    const colors = colorMappings[colorTheme];
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--accent", colors.accent);
    
    localStorage.setItem("kinnren-color-theme", colorTheme);
  }, [colorTheme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const value = {
    theme,
    colorTheme,
    setTheme,
    setColorTheme,
    toggleTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
};