import { useState } from "react";
import { getAccessToken } from "../Authentication/RefreshToken";
import axios from "axios";
import { MediaDisplay } from "../StudentComponents/MediaDisplay";
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL;

export function AdminComplaintCard({ props, onResolve }) {
    const {
        _id,
        title,
        content: { text } = {},
        content: { media = [] } = {},
        upvotes = 0,
        downvotes = 0,
        datePosted,
        student
    } = props;

    const [upvoteCount, setUpvoteCount] = useState(upvotes);
    const [downvoteCount, setDownvoteCount] = useState(downvotes);
    const [isResolving, setIsResolving] = useState(false);

    const handleResolve = async () => {
        setIsResolving(true);
        try {
            const result = await getAccessToken();
            if (!result.token) {
                alert("Session expired. Please login again.");
                window.location.href = "/login";
                return;
            }

            await axios.patch(`${API_URL}/admin/resolve-complaint/${_id}`, {}, {
                headers: { Authorization: `Bearer ${result.token}` },
                withCredentials: true
            });
            // alert("Complaint resolved successfully!");
            toast.success("Complaint resolved successfully!");

            if (onResolve) onResolve(_id);
        } catch (err) {
            toast.error("Failed to resolve complaint.");
        } finally {
            setIsResolving(false);
        }
    };

    // Format date (e.g., "16 Mar 2025")
    const formattedDate = new Date(datePosted).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    return (
        <div className="bg-stubgcard w-full h-auto px-3 py-2 rounded-lg shadow-md shadow-compcardshadow">
            {/* Author details  */}
            <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-5 justify-between border-b-[1px] border-dashborder px-2 pt-1 pb-2">
                <div className="text-compcardsecondary text-lg h-auto gap-x-4">
                    {student.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")},&nbsp;({student.regNo})
                </div>
                <button className={`bg-filebtn text-white font-semibold px-2 py-1 rounded-lg cursor-pointer hover:opacity-90 active:scale-95 ${isResolving ? "opacity-60 cursor-not-allowed" : ""}`}
                    onClick={handleResolve} disabled={isResolving}>
                    {isResolving ? "Resolving..." : "Resolve"}
                </button>
            </div>

            {/* Title and text content*/}
            <div className="p-2 pb-5 bg-stubgcard">
                <div className="text-compcardsecondary font-medium text-md py-2">
                    Complaint id: {_id}
                </div>
                <div className="text-compcardprimary font-medium text-2xl py-2">
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
                        <div className="text-white bg-votesbtn rounded-r-lg p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-up">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 20v-8h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v8a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                            </svg>
                        </div>
                    </div>

                    {/* Downvote  */}
                    <div className="flex items-center">
                        <div className="text-white text-sm bg-votesbtn pl-2 pr-1 rounded-l-lg py-1">
                            {downvoteCount}
                        </div>
                        <div className="text-white bg-votesbtn rounded-r-lg p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-down">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 4v8h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-8a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1z" />
                            </svg>
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