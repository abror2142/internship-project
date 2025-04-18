import { useState } from "react";
import FileGalleryView from "./file-view/gallery/FileGalleryView";
import FileTableView from "./file-view/table/FileTableView";
import FileViewToggler from "./file-view/FileViewToggler";
import Filters from "./Filters";
import { useLoaderData } from "react-router-dom";
import { fetchAllFiles } from "../api/fileService";
import { useQueryParamsInterceptor } from "../../shared/hooks/useQueryParamsInterceptor";
import { File } from "../../shared/types/fileTypes";

export const loader = async () => {
    try {
        const files = await fetchAllFiles();
        return files; 
    } catch(error) {
        console.log(error);
    }
}

function FileView () {
    useQueryParamsInterceptor();
    const file = useLoaderData();
    const [files, setFiles] = useState<File[]>(file);

    const [view, setView] = useState('gallery');

    return (
        <div className="flex gap-4 grow max-h-full dark:text-dark-text">
            <div className="flex flex-col gap-4 grow-1 my-5 mx-4">
                <div className="flex items-center justify-between">
                    <Filters setFiles={setFiles} />
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
        </div>
    )
}   

export default FileView;