import { Image, PlayCircle } from "lucide-react";

export const ImageUploadButton = ({ handleFileChange }) =>{
    return (
        <div className="relative group p-1 rounded-sm text-filecompborder hover:text-emojihovertext bg-stubgcard border-2 border-filecompborder hover:bg-filecompborder cursor-pointer">
            <label className="cursor-pointer">
                <input type="file" accept="image/*" className="hidden" multiple onChange={handleFileChange} />
                <Image className="w-7 h-7" />
            </label>
            <div className="min-w-[70px] absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-emojimsgbg text-emojimsgtext text-xs px-1.5 py-1 rounded text-center whitespace-nowrap">
                Upload image
            </div>
        </div>
    )
}


export const VideoUploadButton = ({ handleFileChange }) =>{
    return (
        <div className="relative group p-1 rounded-sm text-filecompborder hover:text-emojihovertext bg-stubgcard border-2 border-filecompborder hover:bg-filecompborder cursor-pointer">
            <label className="cursor-pointer">
                <input type="file" accept="video/*" className="hidden" multiple onChange={handleFileChange} />
                <PlayCircle className="w-7 h-7" />
            </label>
            <div className="min-w-[70px] absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-emojimsgbg text-emojimsgtext text-xs px-1.5 py-1 rounded text-center whitespace-nowrap">
                Upload video
            </div>
        </div>
    )
}


