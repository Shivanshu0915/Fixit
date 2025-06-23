import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { SidebarDropdown } from "./SidebarDropDown";

export function Sidebar(props) {
  const isAdmin = true; 
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeKey, setActiveKey] = useState("Home");
  const location = useLocation();

  // Helper function to determine the active key based on the current path.
  const findActiveKey = (menuItems, currentPath) => {
    for (let item of menuItems) {
      // Check if top-level item matches
      if (item.path && item.path === currentPath) {
        return item.title;
      }
      // Check if any dropdown child matches
      if (item.droplist) {
        for (let child of item.droplist) {
          if (child.path && child.path === currentPath) {
            return child.title;
          }
        }
      }
    }
    return null;
  };

  // Update activeKey whenever the location changes (including forward/back navigation)
  useEffect(() => {
    const key = findActiveKey(props.menuItems, location.pathname);
    if (key) {
      setActiveKey(key);
    }
  }, [location, props.menuItems]);

  // Responsive design: adjust sidebar visibility based on screen width
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Update active sidebar item when a link is clicked
  const handleActive = (key) => {
    setActiveKey(key);
  };

  return (
    <div className="h-[calc(100vh - 60px)] bg-stubgdark ">
      {/* Hamburger icon for mobile */}
      <button className="md:hidden fixed top-[70px] left-6 z-50 p-2 rounded-md bg-sidebarbtn/80 backdrop-blur-sm shadow-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar container */}
      <div className={`${isOpen ? "translate-x-0" : "-translate-x-full"} transform fixed md:relative md:translate-x-0 z-40 w-72 h-[calc(100vh-60px)] bg-stubgdark border-r-[2px] border-dashborder transition-transform duration-300 ease-in-out`}>
        <nav className="max-h-[calc(100vh-60px)] px-3 pt-6 pb-4 overflow-auto scrollbar-thin scrollbar-webkit">
          {props.menuItems.map((item, index) => {
            // Render a horizontal divider if specified
            if (item.title === "hr") {
              return (
                <hr key={index} className="border-t-2 border-dashborder mt-[20%] mb-[10%]" />
              );
            }
            // If the item contains a droplist, render the dropdown
            else if (item.droplist) {
              return (
                <SidebarDropdown key={index} item={item} activeKey={activeKey} onClick={handleActive}/>
              );
            }
            // Otherwise, render a simple sidebar item
            else{
              return (
                <SidebarItem key={index} item={item} activeKey={activeKey} onClick={handleActive}/>
              );
            }
          })}
        </nav>
      </div>

      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-stubgdark/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
