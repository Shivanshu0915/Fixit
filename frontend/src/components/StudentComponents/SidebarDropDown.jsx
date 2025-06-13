import { useState } from "react";
import { Link } from "react-router-dom";

export const SidebarDropdown = ({ item, activeKey, onClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const activeClasses = "bg-stubgcard";
    const inactiveClasses = "bg-stubgdark hover:bg-stubgcard";

    return (
        <>
            {/* Dropdown header */}
            <div className="bg-stubgdark my-2 flex items-center px-3 py-3 hover:bg-stubgcard rounded-sm cursor-pointer"
            onClick={() => {
                setIsExpanded(!isExpanded)
            }}>
                <div className="flex items-center">
                    {item.icon}
                </div>
                <div className="text-white text-lg font-normal pl-3 flex-1">
                    {item.title}
                </div>
                <div className="flex items-center pl-2">
                    {isExpanded ? (
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" fill="#e8eaed" viewBox="0 -960 960 960">
                            <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" fill="#e8eaed" viewBox="0 -960 960 960">
                            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                        </svg>
                    )}
                </div>
            </div>

            {/* Render nested dropdown items */}
            {isExpanded && (
                <div>
                    {item.droplist.map((child) =>
                        child.path ? (
                            <Link to={child.path} onClick={() => onClick(child.title)}>
                                <div className={`${activeKey === child.title ? activeClasses : inactiveClasses} m-2 flex items-center px-6 py-3 rounded-sm cursor-pointer`}>
                                    <div className="flex items-center">{child.icon}</div>
                                    <div className="text-white text-lg font-normal pl-3 flex-1">{child.title}</div>
                                </div>
                            </Link>
                        ) : (
                            <div onClick={() => onClick(child.title)} className="bg-stubgdark m-2 flex items-center px-3 py-3 hover:bg-stubgcard rounded-sm cursor-pointer">
                                <div className="flex items-center">{child.icon}</div>
                                <div className="text-white text-lg font-normal pl-3 flex-1">{child.title}</div>
                            </div>
                        )
                    )}
                </div>
            )}
        </>
    );
};
