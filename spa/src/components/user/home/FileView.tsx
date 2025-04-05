
import { useEffect, useState } from "react";
import FileGalleryView from "./FileGalleryView";
import FileTableView from "./FileTableView";
import { getFiles } from "../../../utils/api";
import FileViewToggler from "./FileViewToggler";

export interface File {
    id: number;
    name: string;
    storage: string;
    created_at: string;
    user_id: number;
    file_type_id: number;
    description: string | null;
    path: string;
    size: number;
    updated_at: string;
    tags: [
        {
            id: number;
            name: string;
        }
    ],
    file_type: {
        id: number;
        name: string;
        image:  string;
    }
}

function FileView () {
    const [files, setFiles] = useState<File[]>([]);
    const [view, setView] = useState('gallery');

    const fetchFiles = async () => {
        try { 
            const resp = await getFiles();
            setFiles(resp.data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchFiles();
    }, [])

    return (
        <div className="dark:text-dark-text mx-6 mb-4 flex flex-col gap-4 grow max-h-full">
            <FileViewToggler view={view} setView={setView}/>
            <div className="grow overflow-auto scrollbar-thin scrollbar-track-gray-300 
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