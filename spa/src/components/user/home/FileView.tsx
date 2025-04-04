import { faGrip, faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import FileGalleryView from "./FileGalleryView";
import FileTableView from "./FileTableView";
import { getFiles } from "../../../utils/api";

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
        <div className="grow-1 dark:text-dark-text m-5 flex flex-col gap-4">
            <div className="flex items-center text-white text-xl rounded-full justify-end">
                <FontAwesomeIcon icon={faGrip} onClick={() => setView('gallery')} className="pl-5 pr-4 py-2 border-r bg-blue-600 rounded-s-full" />
                <FontAwesomeIcon icon={faListUl} onClick={() => setView('table')}  className="pr-5 pl-4 py-2 bg-dark-blue rounded-e-full" />
            </div>
            {
                view === 'gallery'
                ? <FileGalleryView files={files} />
                : view === 'table'
                ? <FileTableView files={files} />
                : <p>Unsupported view format!</p>
            }
        </div>
    )
}   

export default FileView;