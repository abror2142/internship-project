import { File } from "./FileView";
import { byteFormat } from "../../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function FileCard ({file}: {file: File}) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="relative dark:bg-dark-blue px-3 py-3 flex gap-2 flex-col rounded-xl">
                <div className="flex justify-between">
                    <p>{file.name}</p>
                    <div className="w-7 h-7 flex items-center justify-center dark:hover:bg-dark-bg rounded-full text-lg">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                </div>
                <img 
                    src={file.file_type.image}
                    className="w-full max-w-36 mx-auto"
                />
                <p className="text-sm text-end">{byteFormat(file.size)}</p>
            </div>
            {
                open
                && <div className="absolute">
                    
                </div>
            }
        </div>
    )
}

export default FileCard;