import { File } from "../../../../shared/types/fileTypes";
import { downloadFile, fetchDownloadUrl } from "../../../api/fileService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

function FileDownloadBtn ({ file }: {file: File}) {
    const handleDownload = async () => {
        try {
            let url = file.storage === 'local' 
                ? `http://127.0.0.1:8000/api/files/${file.id}/download` 
                : await fetchDownloadUrl(file.id);
            downloadFile(url, file.name);
        } catch(e) {
            console.log(e);
        }
    }
    return (
        <div 
            className="flex gap-4 items-center py-0.5 px-3 dark:hover:bg-dark-blue rounded-sm"
            onClick={() => handleDownload()}
        >
            <div className="w-4">
                <FontAwesomeIcon icon={faDownload} />
            </div>
            Download
        </div>
    )
}

export default FileDownloadBtn;