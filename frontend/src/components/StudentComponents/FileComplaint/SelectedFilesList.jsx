import { XCircle } from "lucide-react";

export const SelectedFilesList = ({ selectedFiles, removeFile }) => {
    return (
        <>
        {selectedFiles.length > 0 && (
            <div className="mt-4 p-3 bg-stubgdark text-gray-300 rounded-md">
                <h3 className="font-semibold mb-2">Selected Files:</h3>
                <ul className="list-disc list-inside text-sm">
                    {selectedFiles.map((file, index) => (
                        <li key={index} className="flex justify-between items-center">
                            {file.name} {/* Display the file name instead of the whole File object */}
                            <button className="text-red-500 hover:text-red-700 ml-2" onClick={() => removeFile(file)}>
                                <XCircle className="w-5 h-5" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        )}
        </>
    )
}
