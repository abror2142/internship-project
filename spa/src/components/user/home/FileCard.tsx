import { File } from "./FileView";

function FileCard ({file}: {file: File}) {
    return (
        <div className="bg-amber-300 px-3 py-3">
            <p>{file.name}</p>
            <img 
                src={file.file_type.image}
                className="w-full"
            />
            <p>{file.size}</p>
        </div>
    )
}

export default FileCard;