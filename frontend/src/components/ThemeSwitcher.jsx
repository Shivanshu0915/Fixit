import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';

const ThemeSwitcher = ({ className = "" }) => {
  const { theme, changeTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const getThemeConfig = (themeName) => {
    const configs = {
      light: {
        icon: '☀️',
        label: 'Light',
        description: 'Clean and bright theme'
      },
      dark: {
        icon: '🌙',
        label: 'Dark',
        description: 'Easy on the eyes'
      },
    };
    return configs[themeName] || configs.light;
  };

  const selectedConfig = getThemeConfig(theme);

  return (
    <div className={`w-full ${className}`}>
      {/* Button to toggle dropdown */}
      <button onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-3 py-2 bg-quickcardbg border border-themebtnborder rounded-md text-quickcardtext transition cursor-pointer">
        <span className="flex items-center gap-2">
          <span className="text-lg">{selectedConfig.icon}</span>
          <span className="font-medium">{selectedConfig.label}</span>
        </span>
        <svg className="w-4 h-4 text-stubgdark stroke-themebtnborder" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute max-h-65 z-50 mt-2  bg-themeboxbg border-1 border-stubgdark rounded-md shadow-sm shadow-compcardshadow p-1 overflow-y-auto scrollbar-thin scrollbar-webkit">
          {availableThemes.map((themeName) => {
            const config = getThemeConfig(themeName);
            const isActive = theme === themeName;

            return (
              <div key={themeName}
                onClick={() => {
                  changeTheme(themeName);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors mb-1 rounded-md
                  ${isActive
                    ? 'bg-themeboxactivebg text-quickcardtext'
                    : 'text-quickcardhover hover:bg-themeboxhoverbg'
                  }`}>
                <span className="text-lg">{config.icon}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{config.label}</span>
                  <span className="text-xs text-[color:var(--color-muted-foreground)]">{config.description}</span>
                </div>
                {isActive && (
                  <span className="ml-auto w-3 h-3 bg-yellow-500 rounded-full"></span> // Active yellow dot
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;