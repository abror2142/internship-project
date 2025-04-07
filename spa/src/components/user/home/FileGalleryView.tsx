import FileCard from "./FileCard";
import { File } from "./FileView";
import { v4 as uuid } from 'uuid';

function FileGalleryView ({files}: {files: File[]}) {
    return (
        <div className="flex-1 grid grid-cols-4 gap-6 max-h-10">
            {files.map(file => <FileCard file={file} key={uuid()} />)}
        </div>
    )
}

export default FileGalleryView;