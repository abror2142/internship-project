import { useState, useEffect } from "react";
import { File } from "./FileView";
import FileHeaderCard from "./FileHeaderCard";
import { getRecentFiles } from "../../../utils/api";
import { v4 as uuid } from "uuid";

function HomeHeader () {
    const [files, setFiles] = useState<File[]>([]);
    
    const fetchRecentFiles = async () => {
        try {
            const resp = await getRecentFiles();
            setFiles(resp.data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchRecentFiles();
    }, [])
    
    return (
        <div className="bg-blue-950 px-7 pt-3 pb-6">
            <div className="max-w-[1240px] mx-auto flex gap-4">
                <div className="flex flex-col gap-2 flex-grow-1">
                    <p className="dark:text-white font-semibold">Recent Uploads</p>
                    <div className="flex gap-4">
                        {
                            files.slice(0, 6).map(file => <FileHeaderCard file={file} key={uuid()} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeHeader;