import { useState } from "react";
import TagSelection from "./TagSelection";
import FileInput from "./FileInput";
import { Tag } from "./TagSelection";

function UploadFile () {
    const [open, setOpen] = useState(false);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [tags, setTags] = useState<Tag[]>([]);

    return (
        <div>
            <button
                onClick={() => setOpen(prev => !prev)}
            >Upload</button>
            {
                open
                && <div>
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        {/* Modal Window */}
                        <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
                            <h2 className="text-xl font-bold mb-4">Modal Title</h2>
                            <p className="text-gray-600">This is a modal window.</p>

                            <TagSelection setTags={setTags}/>
                            {
                                fileUrl
                                ? <div>
                                    
                                </div>
                                : <FileInput setFileUrl={setFileUrl}/>
                            }
                            <button
                            onClick={() => setOpen(false)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                            Close
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default UploadFile;