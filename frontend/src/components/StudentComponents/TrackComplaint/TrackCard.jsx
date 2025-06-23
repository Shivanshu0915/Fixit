import { MediaDisplay } from "../MediaDisplay";

export function TrackCard({ props }) {
    const {
        _id,
        title,
        content: { text } = {},
        content: { media = [] } = {},
        upvotes = 0,
        downvotes = 0,
        datePosted,
        isResolved,
        student
    } = props;

    const formattedDate = new Date(datePosted).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    return (
        <div className="bg-stubgcard w-full h-auto px-3 py-2 rounded-lg shadow-md shadow-compcardshadow">
            {/* Author details  */}
            <div className="w-full flex flex-wrap justify-between items-center gap-y-2 border-b-[1px] border-dashborder">
                <div className="text-compcardsecondary font-medium text-lg px-2 pt-1 pb-2 min-w-0 truncate">
                    {student.name.split(" ")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(" ")}, ({student.regNo})
                </div>
                <div className={`px-3 py-1 text-white rounded-2xl text-sm font-medium mb-2 ${isResolved ? "bg-green-500" : "bg-red-600"}`}>
                    {isResolved ? "Resolved" : "Unresolved"}
                </div>
            </div>
            {/* Title and text content*/}
            <div className="p-2 pb-5 bg-stubgcard">
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
                            {upvotes}
                        </div>
                        <div className="text-white bg-votesbtn rounded-r-lg p-1 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-up">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 20v-8h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v8a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                            </svg>
                        </div>
                    </div>

                    {/* Downvote  */}
                    <div className="flex items-center">
                        <div className="text-white text-sm bg-votesbtn pl-2 pr-1 rounded-l-lg py-1">
                            {downvotes}
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

export default function StatBox({ label, value, color = 'text-white' }) {
    return (
        <div className="bg-trackbg1 rounded-lg py-5 px-[7%] border-trackborder border-1">
            <p className="text-sm font-medium text-tracktext py-1">{label}</p>
            <p className={`text-3xl py-1 font-bold ${color}`}>{value}</p>
        </div>
    )
}