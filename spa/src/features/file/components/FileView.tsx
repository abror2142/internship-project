import { useState } from "react";
import FileGalleryView from "./file-view/gallery/FileGalleryView";
import FileTableView from "./file-view/table/FileTableView";
import FileViewToggler from "./file-view/FileViewToggler";
import Filters from "./Filters";
import { useLoaderData } from "react-router-dom";
import { fetchAllFiles } from "../api/fileService";

export const loader = async () => {
    try {
        const files = await fetchAllFiles();
        return files; 
    } catch(error) {
        console.log(error);
    }
}

function FileView () {
    const files = useLoaderData();
    const [view, setView] = useState('gallery');

    return (
        <div className="dark:text-dark-text mx-6 mb-4 flex flex-col gap-4 grow max-h-full">
            <div className="flex items-center justify-between">
                <Filters />
                <FileViewToggler view={view} setView={setView}/>
            </div>
            <div 
                className="grow overflow-auto scrollbar-thin scrollbar-track-gray-300 
                scrollbar-thumb-gray-500 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-400"
            >
                {
                    view === 'gallery'
                    ? <FileGalleryView files={files} />
                    : view === 'table'
                    ? <FileTableView files={files} />
                    : <p>Unsupported view format!</p>
                }
            </div>
        </div>
    )
}   

export default FileView;