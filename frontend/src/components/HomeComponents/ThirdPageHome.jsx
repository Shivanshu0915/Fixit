import React, { useRef } from 'react';

export function ThirdPage(){
    return(
        <div id="process" className='w-full h-auto bg-badami4 p-4'>
            <div className='text-badami6 font-bold text-4xl md:text-5xl py-10 flex justify-center'>
                Working Process
            </div>
            <div className='px-[10%] w-full flex justify-start lg:justify-between py-7'>

            <ol class=" relative w-full border-s-2 border-badami6">                  
                <li class="mb-10 md:mb-12 ms-6">            
                    <span class="absolute flex items-center justify-center w-5 h-5 md:w-7 md:h-7 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                    </span>
                    <h3 class="flex items-center mb-1 text-2xl md:text-3xl font-semibold text-badamidark pl-[1%]">Register Yourself</h3>
                    <p class="mb-4 md:text-xl font-normal text-gray-200 text-md px-[2%]">
                        SignUp / Login and get verified your credentials to start.
                    </p>
                    
                </li>
                <li class="mb-10 md:mb-12 ms-6">            
                    <span class="absolute flex items-center justify-center w-5 h-5 md:w-7 md:h-7 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                    </span>
                    <h3 class="flex items-center mb-1 text-2xl md:text-3xl font-semibold text-badamidark pl-[1%]">Browse the domain </h3>
                    <p class="mb-4 text-md md:text-xl font-normal text-gray-200 px-[2%]">
                        After logging in, select the category of your complaint: <br/> 
                        <ul className='list-disc px-[1%]'>
                            <li>Mess: For issues related to food, cleanliness, service, etc.</li>
                            <li>Hostel: For maintenance, infrastructure issues, roommate problems, etc.</li>
                        </ul>
                    </p>
                </li>
                <li class="mb-10 md:mb-12 ms-6">            
                    <span class="absolute flex items-center justify-center w-5 h-5 md:w-7 md:h-7 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                    </span>
                    <h3 class="flex items-center mb-1 text-2xl md:text-3xl font-semibold text-badamidark pl-[1%]">File / Track the complaints</h3>
                    <p class="mb-4 text-md md:text-xl font-normal text-gray-200 ">
                        <ul className='list-disc px-[3%]'>
                            <li>Choose from given category of complaints, write your issue.</li>
                            <li>View the complaint's details and current status.</li>
                        </ul>
                    </p>
                    
                </li>
                <li class="mb-10 md:mb-12 ms-6">            
                    <span class="absolute flex items-center justify-center w-5 h-5 md:w-7 md:h-7 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                    </span>
                    <h3 class="flex items-center mb-1 text-2xl md:text-3xl font-semibold text-badamidark pl-[1%]">Review the complaints </h3>
                    <p class="mb-4 text-md md:text-xl font-normal text-gray-200 px-[2%]">
                        Upvote, downvote the complaints to get them resolve faster.
                    </p>
                    
                </li>
                <li class="mb-10 md:mb-12 ms-6">            
                    <span class="absolute flex items-center justify-center w-5 h-5 md:w-7 md:h-7 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                    </span>
                    <h3 class="flex items-center mb-1 text-2xl md:text-3xl font-semibold text-badamidark pl-[1%]">Feedback </h3>
                    <p class="mb-4 text-md md:text-xl font-normal text-gray-200 px-[2%]">
                        Rate daily meal experience for every meal of the day.<br/> 
                    </p>
                    
                </li>
            </ol>
            </div>
        </div>
    )
}