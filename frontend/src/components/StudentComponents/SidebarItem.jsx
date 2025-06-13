import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = React.memo(({ item, activeKey, onClick }) => {
    const activeClasses = "bg-stubgcard";
    const inactiveClasses = "bg-stubgdark hover:bg-stubgcard";
    return (
        item.path ? (
            <Link to={item.path} onClick={() => onClick(item.title)}>
                <div className={`${activeKey === item.title ? activeClasses : inactiveClasses} my-2 flex items-center px-3 py-3 rounded-sm cursor-pointer`}>
                    {item.icon}
                    <span className="text-white text-lg font-normal pl-3">{item.title}</span>
                </div>
            </Link>
        ) : (
            <div className={`${inactiveClasses} "my-2 flex items-center px-3 py-3 rounded-sm cursor-pointer"`}>
                {item.icon}
                <span className="text-white text-lg font-normal pl-3">{item.title}</span>
            </div>
        )
    )
});
  
export default SidebarItem;