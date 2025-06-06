import { useState } from "react";

const VerticalNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="md:hidden fixed w-full z-50 bg-badami5/80 backdrop-blur-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        {/* hamburger btn  */}
        <button className="md:hidden z-50 p-2 rounded-md bg-badami6/80 backdrop-blur-sm shadow-lg" 
        onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
            {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            )}
            </svg>
        </button>

        {/* Navbar Links */}
        <div className={`${isOpen ? "block" : "hidden"} w-full`} id="navbar-hamburger">
          <ul className="flex flex-col w-full font-medium mt-4 rounded-lg">
            <li>
              <a href="#home" className="block py-2 px-3 rounded-sm text-white hover:bg-badami2 hover:text-badamidark"
              onClick={()=>{
                setIsOpen(!isOpen)
              }}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="block py-2 px-3 rounded-sm text-white hover:bg-badami2 hover:text-badamidark"
              onClick={()=>{
                setIsOpen(!isOpen)
              }}>
                About
              </a>
            </li>
            <li>
              <a href="#process" className="block py-2 px-3 rounded-sm text-white hover:bg-badami2 hover:text-badamidark"
              onClick={()=>{
                setIsOpen(!isOpen)
              }}>
                How it works
              </a>
            </li>
            <li>
              <a href="#testimonials" className="block py-2 px-3 rounded-sm text-white hover:bg-badami2 hover:text-badamidark"
              onClick={()=>{
                setIsOpen(!isOpen)
              }}>
                Testimonials
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default VerticalNavbar;
