import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'light'
    if (typeof window !== 'undefined') {
      return localStorage.getItem('app-theme') || 'light';
    }
    return 'light';
  });

  const themes = {
    light: 'Light Mode',
    dark: 'Dark Mode',
  };

  const changeTheme = (newTheme) => {
    if (themes[newTheme]) {
      setTheme(newTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem('app-theme', newTheme);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      
      // Remove all theme classes first
      Object.keys(themes).forEach(t => {
        root.classList.remove(`theme-${t}`);
      });
      
      // Add the current theme class
      root.classList.add(`theme-${theme}`);
      
      // Also set data attribute for additional CSS targeting if needed
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const value = {
    theme,
    changeTheme,
    themes,
    availableThemes: Object.keys(themes)
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};