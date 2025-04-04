import FileCard from "./FileCard";
import { File } from "./FileView";

function FileGalleryView ({files}: {files: File[]}) {
    return (
        <div className="grid grid-cols-4 gap-8">
            {files.map(file => <FileCard file={file} />)}
        </div>
    )
}

export default FileGalleryView;