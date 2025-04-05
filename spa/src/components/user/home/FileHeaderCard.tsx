import { File } from "./FileView";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';

function FileHeaderCard({file}: {file: File}) {
    return (
        <Link 
            to={`/file/${file.id}`}
            className="dark:bg-dark-blue px-3 py-1.5 rounded-md flex flex-col gap-2 dark:text-dark-text" 
        >
            <div className="flex gap-2">
                <img src={file.file_type.image} className="w-8"/>
                <p>{file.name}</p>
            </div>
            <div className="text-sm">
                {dayjs(file.created_at).format('DD.MM.YYYY')}
            </div>
        </Link>
    )
}

export default FileHeaderCard;