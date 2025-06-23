import { useEffect, useRef, useState } from "react";

export const InputField = ({ label, name, value, handleChange, placeholder, type = 'text', required = false }) => (
  <div>
    {label && <label className="block text-sm font-medium text-dashtextsecondary">{label}</label>}
    <input className="mt-1 w-full border border-profileborder bg-profilefieldbg text-dashtextsecondary rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-dashtext"
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      required={required} />
  </div>
);

export const CustomDropdown = ({ label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="w-full relative">
      <label className="block text-sm font-medium text-dashtextsecondary mb-1">
        {label}
      </label>
      <div className="w-full flex justify-between items-center cursor-pointer border border-profileborder bg-profilefieldbg text-dashtextsecondary rounded-md p-2 text-left"
        onClick={() => setIsOpen(!isOpen)}>
        {selected || 'Select option'}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-2 size-5 stroke-dashtextsecondary">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
</svg>

      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-profilefieldbg border border-profileborder rounded-md shadow-lg max-h-60 overflow-auto text-dashtextsecondary">
          {options.map((option, index) => (
            <li key={index} className="cursor-pointer select-none p-2 hover:bg-stubgcard"
              onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};