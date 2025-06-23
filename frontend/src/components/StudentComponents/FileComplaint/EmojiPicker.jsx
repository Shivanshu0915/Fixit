import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Smile } from "lucide-react";

export const EmojiPickerButton = ({ showEmojiPicker, setShowEmojiPicker, addEmoji, emojiPerRow }) =>{
    return (
    <>
        <div className="relative group">
            <button className="text-filecompborder hover:text-emojihovertext p-1 rounded-sm border-2 border-filecompborder bg-stubgcard hover:bg-filecompborder cursor-pointer"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                <Smile className="w-7 h-7" />
            </button>
            <div className="min-w-[70px] absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-emojimsgbg text-emojimsgtext text-xs px-1.5 py-1 rounded text-center whitespace-nowrap">
                Add emoji
            </div>
        </div>

        {/* Emoji Picker (Fixed Position) */}
        {showEmojiPicker && (
            <div className="absolute bottom-12 left-0 z-50 bg-black shadow-lg rounded-lg overflow-hidden w-[208px] md:w-[315px] h-[280px]">
                <Picker 
                    data={data} // Pass emoji data
                    onEmojiSelect={addEmoji} 
                    theme="dark" // Optional: Set to "auto" or "light"
                    emoji="point_up"
                    previewPosition="none" // Hide preview section
                    perLine={emojiPerRow} // Number of emojis per row
                    maxFrequentRows={2} // Frequent emojis section size
                />
            </div>
        )}
    </>
    )
}