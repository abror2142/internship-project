import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { fetchSuggestedFiles } from "../../api/fileService";
import { File } from "../../../shared/types/fileTypes";
import FileViewToggler from "../file-view/FileViewToggler";
import FileGalleryView from "../file-view/gallery/FileGalleryView";
import FileTableView from "../file-view/table/FileTableView";

function SuggestedFiles () {
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [view, setView] = useState('gallery');

    const fetchSuggestedFilesData = async () => {
        try {
            const data = await fetchSuggestedFiles();
            setFiles(data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchSuggestedFilesData();
    }, [])

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center mx-4 mt-4">
                <div className={`flex gap-2 items-center dark:text-dark-text-highlighted hover:bg-indigo-600 px-3 py-0.5 rounded-full max-w-min text-nowrap ${open ? 'bg-indigo-500' : null}`} onClick={() => setOpen(prev => !prev)}>
                    <FontAwesomeIcon icon={open ? faChevronLeft : faChevronRight} />
                    <p className="text-lg">Suggested Files</p>
                </div>
                <FileViewToggler view={view} setView={setView}/>
            </div>
            {
                open
                && files
                && 
                    <div 
                        className="grow overflow-auto scrollbar-thin scrollbar-track-gray-300 
                        scrollbar-thumb-gray-500 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-400 mx-4 mb-4"
                    >
                        {
                            view === 'gallery'
                            ? <FileGalleryView files={files} />
                            : view === 'table'
                            ? <FileTableView files={files} />
                            : <p>Unsupported view format!</p>
                        }
                </div>
            }
        </div>
    )
}

export default SuggestedFiles;