import React from 'react';
import { Link } from 'react-router-dom';

export function MidContent(){
    return(
        <div className='min-h-[100vh] bg-badami1'>
            <div id="home" className="w-full min-h-[30vh] flex flex-col items-center justify-end bg-badami1 px-2 py-2">
                <div className="font sans text-4xl md:text-5xl text-btn-badami font-semibold p-2 animate-slideup">
                    Spot It, Report It, Fix It!
                </div>
            </div>

            <div className='min-h-[70vh] bg-badami1 relative rounded-t-xl'>
                <div className="hidden lg:min-h-[70vh] lg:grid grid-cols-12 rounded-t-xl bg-pink-400">
                    {/* Containers */}
                    <div className="bg-badami1 col-span-1 z-[3] relative ">
                        <div className="bg-badami6 w-full h-80 my-2 rounded-r-xl absolute bottom-32">
                            <img src="/assets/room1.webp" alt="Hostel" className="w-full h-full object-cover rounded-tr-xl" />
                        </div>
                        <div className="bg-badami6 w-full h-32 bottom-0 absolute">
                            <img src="/assets/room2.webp" alt="Hostel" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className= "bg-badami1 col-span-2 z-[3] pt-32 relative rounded-2xl">
                        <div className="bg-badami6 h-36 left-2 right-1 my-2 rounded-2xl absolute bottom-44">
                            <img src="/assets/class2.webp" alt="Hostel" className="w-full h-full object-cover rounded-t-xl"/>
                        </div> 
                        <div className="bg-badami6 h-44 bottom-0 left-2 right-1 absolute">
                            <img src="/assets/food1.webp" alt="Hostel" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="bg-badami1 col-span-2 pt-56 relative">
                        <div className="bg-badami6 h-60 bottom-0 left-1 right-1 rounded-t-xl absolute">
                            <img src="/assets/hostel2.webp" alt="Hostel" className="w-full h-full object-cover rounded-t-xl" />
                        </div>
                    </div>
                    <div className="bg-badami1 col-span-2 pt-72 relative">
                        <div className="bg-badami6 h-44 bottom-0 left-1 right-1 rounded-t-xl absolute">
                            <img src="/assets/wire3.webp" alt="Hostel" className="w-full h-full object-cover rounded-t-xl" />
                        </div>
                    </div>
                    <div className="bg-badami1 col-span-2 pt-56 relative">
                        <div className="bg-badami6 h-60 bottom-0 left-1 right-1 rounded-t-xl absolute">
                            <img src="/assets/mess1.webp" alt="Hostel" className="w-full h-full object-cover rounded-t-xl" />
                        </div>
                    </div>
                    <div className="bg-badami1 col-span-3 z-[3] pt-32 relative">
                        <div className="bg-badami6 bottom-0 h-[340px] left-1 right-3 rounded-t-xl absolute">
                            <img src="/assets/hostel1.webp" alt="Hostel" className="w-full h-full object-cover rounded-t-xl" />
                        </div>
                    </div>

                </div>

                <div className="absolute inset-0 w-full h-[20vh] flex flex-col items-center justify-start bg-badami1 px-2 py-2 z-[2]">
                    <p className="max-w-2xl text-fixit-green/80 p-2 text-center">
                        Join our community-driven platform to report and track local issues. Together, we can make our neighborhoods better, each fix matters.
                    </p> 
                    <div className="flex bg-white items-center mt-4 pl-4 pr-1 gap-10 rounded-sm shadow-md">
                        <div className="text-lg py-1 text-badami6">
                            Get Started ...
                        </div>

                        <Link to="/login">
                        <div className="bg-orange1 h-5/6 px-2 flex items-center rounded cursor-pointer animate-pulse" >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7">
                                <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        </Link>
                    </div>
                </div>    
            </div>
        </div>
    )
}