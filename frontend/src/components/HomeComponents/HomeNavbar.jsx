import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import VerticalNavbar from './VerticalNav';

export function HomeNavbar(){
    return(
        <>
        <nav className="sticky w-full flex justify-between items-center px-8 py-4 top-0 bg-badami1/80 backdrop-blur-sm z-50">
            <div className="flex items-center">
                <div>
                    <a href='#home'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill-badami6 class="size-6" cursor="pointer">
                        <path fill-rule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clip-rule="evenodd" />
                        <path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z" />
                        <path fill-rule="evenodd" d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                    </a>
                </div>
                <div className="font-sans text-3xl font-bold text-badami6 px-2 cursor-pointer">
                <a href="#home">
                    FixIt
                </a>
                </div>
            </div>
            <div className="hidden md:flex space-x-8 text-badami6 text-base font-medium px-2 ">
                <a href="#about" className="hover:text-orange1">
                    About
                </a>
                <a href="#process" className="hover:text-orange1">
                    How it works
                </a>
                <a href="#testimonials" className="hover:text-orange1">
                    Testimonials
                </a>
            </div>

            <div className="flex px-1 items-center gap-3">
                <Link to="/login">
                <div className="bg-btn-badami text-white p-6 px-4 py-1 border-[1px] border-btn-bg-btn-badami rounded-md font-medium cursor-pointer hover:bg-btn-badami/85 active:scale-95 transition">
                    Login
                </div>
                </Link>

                <Link to="/signup">
                <div className="text-badami6 bg-white border-[1px] box-border border-btn-badami rounded-md px-4 py-1 font-medium cursor-pointer hover:bg-btn-badami hover:text-white active:scale-95 transition">
                    SignUp
                </div>
                </Link>
            </div>
        </nav>
        <VerticalNavbar></VerticalNavbar>
        </>
    )
}
