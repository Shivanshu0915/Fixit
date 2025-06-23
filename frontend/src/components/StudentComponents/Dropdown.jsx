import React, { useState } from 'react';

export function FilterDropdown({ bgc, text, text2, text3, text4, hbgc, onSelect }) {
  // Local state to store the currently selected option.
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(text); // default is the first option

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  // When an option is selected, update local state, call onSelect (with lower-case value), and close the dropdown
  const handleSelect = (value) => {
    setSelected(value);
    if (value === "Newest") {
      onSelect("newest");
    }
    else if (value === "Oldest") {
      onSelect("oldest")
    }
    else if (value === "Most downvoted") {
      onSelect("mostDownvoted")
    }
    else if (value === "Most upvoted") {
      onSelect("mostUpvoted")
    }
    setIsOpen(false);
  };

  return (
    <div className="relative cursor-pointer">
      {/* Dropdown button */}
      <div className={`flex items-center ${bgc} ${hbgc} rounded-3xl px-3 py-2`}
       onClick={toggleDropdown}>
        <div className="text-dashhovertext font-medium text-sm flex items-center">
          {selected}
        </div>
        <div className="flex items-end pl-2 text-dashhovertext">
          <svg className="w-2.5 h-2.5 flex items-end" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="z-10 mt-2 absolute divide-y rounded-lg shadow-sm w-44 bg-stubgdark/70 backdrop-blur-sm">
          <ul className="py-2 text-sm font-semibold text-dashtext">
            <li>
              <button className="block w-full text-left px-4 py-2 hover:bg-filterbtn hover:text-dashhovertext"
              onClick={() => handleSelect(text)}>
                {text}
              </button>
            </li>
            <li>
              <button className="block w-full text-left px-4 py-2 hover:bg-filterbtn hover:text-dashhovertext"
              onClick={() => handleSelect(text2)}>
                {text2}
              </button>
            </li>
            <li>
              <button className="block w-full text-left px-4 py-2 hover:bg-filterbtn hover:text-dashhovertext"
              onClick={() => handleSelect(text3)}>
                {text3}
              </button>
            </li>
            <li>
              <button className="block w-full text-left px-4 py-2 hover:bg-filterbtn hover:text-dashhovertext"
              onClick={() => handleSelect(text4)}>
                {text4}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}