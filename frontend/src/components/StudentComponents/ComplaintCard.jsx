import React, { useState, useEffect } from "react";
import axios from "axios";
import { MediaDisplay } from "./MediaDisplay";
import { getAccessToken } from "../Authentication/RefreshToken";
const API_URL = import.meta.env.VITE_API_URL;

export function StuComplaintDataCard({ props }) {
    const[isUpvoted, setIsUpvoted] = useState(false);
    const[isDownvoted, setIsDownvoted] = useState(false);
    const { 
        _id, 
        title, 
        content : {text} = {}, 
        content: { media = [] } = {},
        upvotes = 0, 
        downvotes = 0, 
        datePosted, 
        student  
    } = props;

    // console.log("media ", media);
    const [upvoteCount, setUpvoteCount] = useState(upvotes);
    const [downvoteCount, setDownvoteCount] = useState(downvotes);
    const [userVote, setUserVote] = useState(null); 

    // Format date (e.g., "16 Mar 2025")
    const formattedDate = new Date(datePosted).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    useEffect(() => {
        const fetchUserVote = async () => {
            try {
                let accessToken ;
                const result = await getAccessToken();
                if(!result.token){
                    alert("Session expired! Login again to continue");
                    window.location.href = "/login";
                    return;
                }
                else    accessToken = result.token;

                const response = await axios.get(`${API_URL}/user/get-user-vote/${_id}`,
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );
                // ✅ Set upvote/downvote states based on fetched userVote
                if (response.data.success) {
                    setUserVote(response.data.userVote);
                    setIsUpvoted(response.data.userVote === 1);
                    setIsDownvoted(response.data.userVote === -1);
                }

            } catch (error) {
                console.error("Error fetching user vote:", error);
            }
        };
        fetchUserVote();
    }, [_id]);

    const handleVote = async (type) => {
        try {
            let accessToken ;
            const result = await getAccessToken();
            if(!result.token){
                alert("Session expired! Login again to continue");
                window.location.href = "/login";
                return;
            }
            else    accessToken = result.token;

            const response = await axios.post(
                `${API_URL}/user/vote-complaint`,
                { complaintId: _id, voteType: userVote === type ? 0 : type }, // Toggle vote
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            if (response.data.success) {
                setUpvoteCount(response.data.upvotes);
                setDownvoteCount(response.data.downvotes);
                setUserVote(response.data.userVote);
            }
            if(type === 1){
                if((!isDownvoted && !isUpvoted) || (isUpvoted))    setIsUpvoted(!isUpvoted);
                else if(isDownvoted && !isUpvoted){
                    setIsDownvoted(!isDownvoted);
                    setIsUpvoted(!isUpvoted);
                }
            }
            if(type === -1){
                if((!isUpvoted && !isDownvoted) || (isDownvoted))    setIsDownvoted(!isDownvoted);
                else if(isUpvoted && !isDownvoted){
                    setIsDownvoted(!isDownvoted);
                    setIsUpvoted(!isUpvoted);
                }
            }
        } catch (error) {
            console.error("Error voting:", error);
        }
    };

    return (
        <div className="bg-stubgcard w-full h-auto px-3 py-2 rounded-lg shadow-md shadow-compcardshadow">
            {/* Author details  */}
            <div className="text-compcardsecondary text-lg px-2 pt-1 pb-2 border-b-[1px] border-dashborder h-auto bg-stubgcard gap-x-4">
                 {student.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")},&nbsp;({student.regNo})
            </div>

            {/* Title and text content*/}
            <div className="p-2 pb-5 bg-stubgcard">
                 <div className="text-compcardprimary font-semibold text-2xl py-2">
                     {title}
                 </div>
                 <div className="text-compcardsecondary py-2">
                     {text}
                 </div>
            </div>
            
            {/* Media  */}
            <div className="p-2 border-b-[1px] border-dashborder">
                <MediaDisplay media={media} />
            </div>

            {/* Votes buttons  */}
            <div className="px-2 pt-3 pb-1 flex justify-between items-center">
                <div className="flex gap-x-3">
                    {/* Upvote  */}
                    <div className="flex items-center ">
                        <div className="text-white text-sm bg-votesbtn pl-2 pr-1 rounded-l-lg py-1">
                            {upvoteCount}
                        </div>
                        <div className="text-white bg-votesbtn rounded-r-lg p-1 cursor-pointer " 
                        onClick={() => handleVote(1)}>
                            {(isUpvoted && !isDownvoted) ? (
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="white"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-up">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 20v-8h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v8a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                </svg>
                            ):(
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-up">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 20v-8h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v8a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                </svg>
                            )}
                            
                        </div>
                    </div>

                    {/* Downvote  */}
                     <div className="flex items-center">
                        <div className="text-white text-sm bg-votesbtn pl-2 pr-1 rounded-l-lg py-1">
                            {downvoteCount}
                        </div>
                        <div className="text-white bg-votesbtn rounded-r-lg p-1 cursor-pointer" 
                        onClick={() => handleVote(-1)}>
                            {isDownvoted ? (
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="white"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-down">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 4v8h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-8a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1z" />
                                </svg>
                            ) : (
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-down">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 4v8h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-8a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1z" />
                                </svg>
                            )}
                        </div>
                    </div>
                </div>

                {/* date Posted  */}
                <div className="text-compcardsecondary/90">
                    {formattedDate}
                </div>
            </div>
        </div>
    );
}
