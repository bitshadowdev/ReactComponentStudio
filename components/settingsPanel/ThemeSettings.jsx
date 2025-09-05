'use client';

import { useState, useRef, useEffect } from 'react';
import { useConfigurationStore } from '@/stores/configurationStore';
import SettingsCard from '@/components/generalComponents/SettingsCard';
import { getStrings } from '@/utils/strings';
import { AnimatedDropdown, InteractiveElement } from '@/components/animationWrappers';

// Custom Dropdown Component for Theme Preview
const CustomDropdown = ({ label, value, options, onChange, onHover, onHoverEnd, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.id === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <InteractiveElement
        enableParticles={true}
        particleColor="#10b981"
        className="w-full bg-white border border-gray-300 text-gray-900 rounded-settings px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex justify-between items-center hover:bg-gray-50 transition-all duration-200 hover:shadow-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{selectedOption ? selectedOption.name : 'Seleccionar...'}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 text-gray-500 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </InteractiveElement>

      <AnimatedDropdown
        isOpen={isOpen}
        onOptionSelect={(optionId) => {
          onChange(optionId);
          setIsOpen(false);
        }}
        particleTheme="accent"
        selectionColor="#10b981"
        className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-settings shadow-xl max-h-60 overflow-hidden"
      >
        {options.map((option) => (
          <div
            key={option.id}
            className="px-4 py-3 text-sm text-gray-900 cursor-pointer transition-all duration-200 first:rounded-t-settings last:rounded-b-settings hover:bg-blue-50 drawer-option"
            onMouseEnter={() => onHover && onHover(option.id)}
            onMouseLeave={() => onHoverEnd && onHoverEnd()}
          >
            <div className="font-medium selection-text">{option.name}</div>
          </div>
        ))}
      </AnimatedDropdown>
    </div>
  );
};

// Custom Font Dropdown with Font Preview
const FontDropdown = ({ label, value, options, onChange, onHover, onHoverEnd, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalize = (str) => (str || '').replace(/['"\s,-]/g, '').toLowerCase();
  const selectedOption = options.find(opt => normalize(opt.family) === normalize(value));

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <InteractiveElement
        enableParticles={true}
        particleColor="#8b5cf6"
        className="w-full bg-white border border-gray-300 text-gray-900 rounded-settings px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex justify-between items-center hover:bg-gray-50 transition-all duration-200 hover:shadow-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ fontFamily: selectedOption ? selectedOption.family : 'monospace' }} className="font-medium">
          {selectedOption?.name || value || 'Seleccionar fuente...'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 text-gray-500 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </InteractiveElement>

      <AnimatedDropdown
        isOpen={isOpen}
        onOptionSelect={(fontName) => {
          const selectedFont = options.find(opt => opt.name === fontName);
          if (selectedFont) {
            onChange(selectedFont.family);
          }
          setIsOpen(false);
        }}
        particleTheme="accent"
        selectionColor="#8b5cf6"
        className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-settings shadow-xl max-h-60 overflow-hidden"
      >
        {options.map((font) => (
          <div
            key={font.name}
            className="px-4 py-3 text-sm text-gray-900 cursor-pointer transition-all duration-200 first:rounded-t-settings last:rounded-b-settings hover:bg-purple-50 drawer-option"
            style={{ fontFamily: font.family }}
            onMouseEnter={() => onHover && onHover(font.family)}
            onMouseLeave={() => onHoverEnd && onHoverEnd()}
          >
            <div className="font-medium selection-text">{font.name}</div>
          </div>
        ))}
      </AnimatedDropdown>
    </div>
  );
};

const ThemeSettings = () => {
  const editorConfig = useConfigurationStore((state) => state.configuration.editor);
  const setEditorConfiguration = useConfigurationStore((state) => state.setEditorConfiguration);
  const [previewTheme, setPreviewTheme] = useState(null);
  const [previewFont, setPreviewFont] = useState(null);
  
  const strings = getStrings('es').ui_strings.settings.theme;
  
  // Predefined themes
  const themes = [
    // Dark themes
    { id: 'dracula', name: 'Dracula', mode: 'dark' },
    { id: 'material', name: 'Material', mode: 'dark' },
    { id: 'monokai', name: 'Monokai', mode: 'dark' },
    { id: 'dark', name: 'Dark (Default)', mode: 'dark' },
    
    // Light themes
    { id: 'default', name: 'Default (Light)', mode: 'light' },
    { id: 'eclipse', name: 'Eclipse (Light)', mode: 'light' },
    { id: 'solarized-light', name: 'Solarized (Light)', mode: 'light' },
  ];
  
  // Google Fonts for code editors
  const fontFamilies = [
    { name: 'Fira Code', family: '"Fira Code", monospace', google: true },
    { name: 'JetBrains Mono', family: '"JetBrains Mono", monospace', google: true },
    { name: 'Source Code Pro', family: '"Source Code Pro", monospace', google: true },
    { name: 'Roboto Mono', family: '"Roboto Mono", monospace', google: true },
    { name: 'Ubuntu Mono', family: '"Ubuntu Mono", monospace', google: true },
    { name: 'Inconsolata', family: '"Inconsolata", monospace', google: true },
    { name: 'Space Mono', family: '"Space Mono", monospace', google: true },
    { name: 'Consolas', family: 'Consolas, monospace', google: false },
    { name: 'Monaco', family: 'Monaco, monospace', google: false },
    { name: 'Courier New', family: '"Courier New", monospace', google: false },
  ];
  
  const handleThemeHover = (themeId) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[ThemePreview] Applying preview theme:', themeId);
    }
    if (previewTheme === null) {
      setPreviewTheme(editorConfig.theme);
    }
    setEditorConfiguration({ theme: themeId });
  };
  
  const handleThemeHoverEnd = () => {
    if (previewTheme !== null) {
      if (process.env.NODE_ENV === 'development') {
        console.debug('[ThemePreview] Restoring original theme:', previewTheme);
      }
      setEditorConfiguration({ theme: previewTheme });
      setPreviewTheme(null);
    }
  };

  const handleFontHover = (fontFamily) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[FontPreview] Applying preview font:', fontFamily);
    }
    if (previewFont === null) {
      setPreviewFont(editorConfig.fontFamily);
    }
    setEditorConfiguration({ fontFamily: fontFamily });
  };
  
  const handleFontHoverEnd = () => {
    if (previewFont !== null) {
      if (process.env.NODE_ENV === 'development') {
        console.debug('[FontPreview] Restoring original font:', previewFont);
      }
      setEditorConfiguration({ fontFamily: previewFont });
      setPreviewFont(null);
    }
  };
  
  // Filter themes based on selected mode
  const filteredThemes = themes.filter(t => t.mode === editorConfig.themeMode);
  
  return (
    <div className="h-full flex flex-col">
      <div className="space-y-6">
        <SettingsCard>
          <h3 className="text-base font-semibold text-gray-900 mb-4">{strings.modeTitle}</h3>
          <div className="flex space-x-3">
            <InteractiveElement
              enableParticles={true}
              particleColor="#1f2937"
              enableSelection={true}
              selectionColor="#1f2937"
              className={`px-4 py-3 rounded-settings text-sm font-medium transition-all duration-200 ${
                editorConfig.themeMode === 'light' 
                  ? 'bg-black text-white border border-black' 
                  : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
              }`}
              onClick={() => setEditorConfiguration({ 
                themeMode: 'light',
                theme: 'default' // Reset to default light theme
              })}
            >
              {strings.lightMode}
            </InteractiveElement>
            <InteractiveElement
              enableParticles={true}
              particleColor="#1f2937"
              enableSelection={true}
              selectionColor="#1f2937"
              className={`px-4 py-3 rounded-settings text-sm font-medium transition-all duration-200 ${
                editorConfig.themeMode === 'dark' 
                  ? 'bg-black text-white border border-black' 
                  : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
              }`}
              onClick={() => setEditorConfiguration({ 
                themeMode: 'dark',
                theme: 'dark' // Reset to default dark theme
              })}
            >
              {strings.darkMode}
            </InteractiveElement>
          </div>
        </SettingsCard>
        
        <SettingsCard>
          <h3 className="text-base font-semibold text-gray-900 mb-4">{strings.specificTheme}</h3>
          <CustomDropdown
            value={editorConfig.theme}
            options={filteredThemes}
            onChange={(themeId) => {
              setEditorConfiguration({ theme: themeId });
              setPreviewTheme(null); // Clear preview on select
            }}
            onHover={handleThemeHover}
            onHoverEnd={handleThemeHoverEnd}
          />
        </SettingsCard>
        
        <SettingsCard>
          <label className="block text-base font-semibold text-gray-900 mb-4">{strings.fontFamily}</label>
          <FontDropdown
            value={editorConfig.fontFamily}
            options={fontFamilies}
            onChange={(fontFamily) => {
              const selectedFont = fontFamilies.find(f => f.family === fontFamily);
              if (selectedFont) {
                setEditorConfiguration({ fontFamily: selectedFont.family });
              }
              setPreviewFont(null);
            }}
            onHover={handleFontHover}
            onHoverEnd={handleFontHoverEnd}
          />
        </SettingsCard>
      </div>
    </div>
  );
};

export default ThemeSettings;
