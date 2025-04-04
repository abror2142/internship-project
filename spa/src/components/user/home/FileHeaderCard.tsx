import { File } from "./FileView";
import { Link } from "react-router-dom";

function FileHeaderCard({file}: {file: File}) {
    return (
        <Link 
            to={`/file/${file.id}`}
            className="w-15 h-15 border dark:border-indigo-400 rounded-md flex" 
        >
            <p>{file.name}</p>
        </Link>
    )
}

export default FileHeaderCard;