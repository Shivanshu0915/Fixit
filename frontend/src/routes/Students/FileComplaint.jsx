import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { EmojiPickerButton } from "../../components/StudentComponents/FileComplaint/EmojiPicker";
import { ImageUploadButton, VideoUploadButton } from "../../components/StudentComponents/FileComplaint/MediaUploadButtons";
import { SelectedFilesList } from "../../components/StudentComponents/FileComplaint/SelectedFilesList";
import { handleFileComplaintSubmit } from "../../components/StudentComponents/FileComplaint/FileComplaintHandler";

export const FileComplaint = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("hostel");
    const [subCategory, setSubCategory] = useState("");
    const [text, setText] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textAreaRef = useRef(null);
    const [emojiPerRow, setEmojiPerRow] = useState(5);
    const [uploading, setUploading] = useState(false);

    const hostelOpt = ["Electricity", "Internet", "Carpenter", "Cleanliness", "Plumber"]
    const messOpt = ["Food", "Mess fees"]

    const addEmoji = (emoji) => {
        const newText = text + emoji.native;
        setText(newText);
        setShowEmojiPicker(false);
        // Move cursor to the end after closing emoji picker
        setTimeout(() => {
            if (textAreaRef.current) {
                textAreaRef.current.focus();  // Focus the textarea
                textAreaRef.current.setSelectionRange(newText.length, newText.length);  // Move cursor to end
            }
        }, 0);
    };

    useEffect(() => {
        const updateEmojiPerRow = () => {
            if (window.innerWidth >= 768) {
                setEmojiPerRow(8); // Large screen
            } else {
                setEmojiPerRow(5); // Small screen
            }
        };

        updateEmojiPerRow(); // Set initial value
        window.addEventListener("resize", updateEmojiPerRow); // Listen to window resize
        return () => window.removeEventListener("resize", updateEmojiPerRow);
    }, []);

    // Handle file selection and store filenames
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files)
        setSelectedFiles((prev) => [...prev, ...files]); // Append new files to the state
    };
    // Remove a selected file from the list
    const removeFile = (fileName) => {
        setSelectedFiles((prev) => prev.filter(file => file !== fileName));
    };

    // New clean resetForm function
    const resetForm = () => {
        setTitle("");
        setText("");
        setCategory("hostel");
        setSubCategory("");
        setSelectedFiles([]);
    };

    const handleSubmit = async () => {
        const success = await handleFileComplaintSubmit({
            title, text, category, subCategory, selectedFiles,
            setUploading, resetForm, navigate
        });
        if (success) console.log("Complaint submitted successfully.");
        else console.log("Complaint submission failed.");
    };

    return (
        <div className="bg-stubgdark w-full h-full p-4 flex flex-col gap-y-5 overflow-auto scrollbar-thin scrollbar-webkit">
            <div className="text-dashtext flex justify-center text-xl md:text-3xl font-bold">
                File a Complaint
            </div>

            <div className="flex w-full items-center justify-center py-3 px-[5%] lg:px-[20%]">
                <div className="bg-stubgcard min-h-80 h-full w-full py-8 px-6 flex flex-col gap-y-3 rounded-lg relative">
                    {/* Category  */}
                    <div className="mb-2">
                        <select name="hostel" id="hostel" className="w-full p-3 font-medium text-filecompprimary border border-filecompborder rounded-md cursor-pointer"
                            required value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="" className="bg-stubgcard text-filecompsecondary">Choose Category</option>
                            <option key="hostel" value="hostel" className="bg-stubgcard text-filecompsecondary">Hostel</option>
                            <option key="mess" value="mess" className="bg-stubgcard text-filecompsecondary">Mess</option>
                        </select>
                    </div>

                    {/* Subcategory  */}
                    <div className="mb-2">
                        <select name="subCategory" id="subCategory" className="w-full p-3 font-medium text-filecompprimary border border-filecompborder rounded-md cursor-pointer"
                            required value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                            <option value="" className="bg-stubgcard text-filecompsecondary">Select sub category</option>
                            {(category === "hostel" ? hostelOpt : messOpt).map(opt => (
                                <option key={opt} value={opt} className="bg-stubgcard text-filecompsecondary">{opt}</option>
                            ))}
                        </select>
                    </div>

                    {/* Content  */}
                    <input type="text" name="title" id="title" placeholder="Enter title" className="text-filecompsecondary w-full p-3 font-medium border border-filecompborder rounded-md"
                        required value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea value={text} ref={textAreaRef} className="w-full min-h-32 h-40 p-2 border border-filecompborder rounded text-filecompsecondary" placeholder="Describe your issue..." required
                        onChange={(e) => setText(e.target.value)} />

                    <div className="flex flex-col md:flex md:flex-row md:justify-between gap-5 mt-8 mb-3">
                        <div className="flex justify-start gap-2 items-center relative">
                            <EmojiPickerButton {...{ showEmojiPicker, setShowEmojiPicker, addEmoji, emojiPerRow }} />
                            {/* Media Upload with Tooltip */}
                            <ImageUploadButton handleFileChange={handleFileChange} />
                            <VideoUploadButton handleFileChange={handleFileChange} />
                        </div>

                        <button className="bg-filebtn text-white text-lg font-semibold px-4 py-1 rounded cursor-pointer"
                            onClick={handleSubmit}>
                            {uploading ? "Uploading..." : "Submit"}
                        </button>
                    </div>
                    {/* Display Selected Media Files */}
                    <SelectedFilesList selectedFiles={selectedFiles} removeFile={removeFile} />
                </div>
            </div>
        </div>
    );
};