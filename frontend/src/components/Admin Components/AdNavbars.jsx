import React, { useState } from "react";
import { Link } from "react-router";

export const AdminNav = ()=>{
    const announcementCount = 1;
    const[isImage, setIsImage] = useState(false);
    const imgPath = "";
    return(
        <nav className="sticky w-full h-[60px] box-border py-4 px-8 flex items-center justify-between border-b-[2px] border-dashborder top-0 z-50 bg-stubgdark">
            <div className="flex items-center">
                <div className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-dashtext">
                        <path fill-rule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clip-rule="evenodd" />
                        <path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z" />
                        <path fill-rule="evenodd" d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div className="font-sans text-3xl font-bold text-dashtext px-2 cursor-pointer">FixIt</div>
            </div>

            <div className="flex items-center space-x-8">
                {/* <div className="relative w-11 h-9 bg-stumsg hover:bg-stumsg/70 cursor-pointer rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" height="51px" viewBox="65 -820 960 960" width="51px" fill="#black"><path d="M146.67-160q-27 0-46.84-19.83Q80-199.67 80-226.67v-506.66q0-27 19.83-46.84Q119.67-800 146.67-800h666.66q27 0 46.84 19.83Q880-760.33 880-733.33v506.66q0 27-19.83 46.84Q840.33-160 813.33-160H146.67ZM480-454.67 146.67-670v443.33h666.66V-670L480-454.67Zm0-66.66 330.67-212H150l330 212ZM146.67-670v-63.33V-226.67-670Z"/></svg>
                    
                    <div class="absolute inline-flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-red-500 border-[1px] border-white rounded-full -top-2 -end-2 dark:border-gray-900">9</div>
                </div> */}

                {isImage ? (
                    <div>
                    </div>
                ) : (
                    <Link to="/adminDashboard/profile">
                        <div class="cursor-pointer relative w-10 h-10 p-1 ring-2 ring-gray-400 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        </div>
                    </Link>
                )}
                
            </div>
        </nav>
    )
}