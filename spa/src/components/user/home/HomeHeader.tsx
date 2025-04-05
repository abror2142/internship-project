import { useState, useEffect } from "react";
import { File } from "./FileView";
import FileHeaderCard from "./FileHeaderCard";
import { getRecentFiles } from "../../../utils/api";


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
        <div className="bg-blue-950 px-7 pt-4 pb-8">
            <div className="max-w-[1240px] mx-auto flex gap-4">
                <div className="flex flex-col gap-2 flex-grow-1 text-lg">
                    <p className="dark:text-white text-end">Recent Uploads</p>
                    <div className="flex">
                        {
                            files.slice(0, 5).map(file => <FileHeaderCard file={file} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeHeader;