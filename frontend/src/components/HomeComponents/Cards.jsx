import React, { useRef } from 'react';

export function Card({logo, title, desc}){
    return(
        <div className="w-[90%] md:w-[calc(45%-24px)] lg:w-[calc(30%-32px)]">
            <div className=" bg-badami6 w-full min-h-60 border-[1px] border-gray-300 rounded-xl transition-transform hover:scale-105 hover:opacity-95 hover:shadow-xl hover:shadow-gray-200 shadow-md shadow-gray-300 mb-5 p-4">
                <div className='px-2 py-3'>
                    {logo}
                </div>
                <div className='px-2 py-1 text-white text-2xl lg:text-3xl font-medium'>
                    {title}
                </div>
                <div className='px-3 text-gray-200 text-md font-light'>
                    {desc}
                </div>
            </div>
        </div>
    )
}