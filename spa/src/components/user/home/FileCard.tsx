import { File } from "./FileView";
import { byteFormat } from "../../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEllipsisVertical, faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import OutsideCickDetector from "../../../hooks/useOutsideClickDetector";
import FileInfoModal from "./FileInfoModal";

function FileCard ({file}: {file: File}) {
    const [open, setOpen] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className="relative">
            <div className="relative dark:bg-dark-blue px-3 py-3 flex gap-2 flex-col rounded-xl">
                <div className="flex justify-between">
                    <p>{file.name}</p>
                    <div 
                        className="w-7 h-7 flex items-center justify-center dark:hover:bg-dark-bg rounded-full text-lg"
                        onClick={() => setOpen(prev => !prev)}
                    >
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                </div>
                <img 
                    src={file.file_type.image}
                    className="w-full max-w-36 mx-auto"
                />
                <div className="flex gap-4 items-center justify-between">
                    <div className="flex gap-2 overflow-auto  scrollbar-thin scrollbar-track-gray-300 
                scrollbar-thumb-gray-500 dark:scrollbar-track-transparent dark:scrollbar-thumb-blue-700">
                        {file.tags.map(tag => {
                            return (
                                <p 
                                    className="px-2 py-0.2 dark:text-dark-text dark:bg-dark-bg rounded-sm text-nowrap"
                                >{tag.name}</p>
                            )
                        })}
                    </div>
                    <p className="text-sm text-end">{byteFormat(file.size)}</p>
                </div>
            </div>
            <OutsideCickDetector toggler={setOpen}>
            {
                open
                && <div className="absolute top-4 right-8 px-3 py-3 flex flex-col gap-2 dark:bg-dark-card-light rounded-md">
                    <div 
                        className="flex gap-4 items-center py-0.5 px-3 dark:hover:bg-dark-blue rounded-sm"
                        onClick={() => setShowInfo(true)}
                    >
                        <div className="w-4">
                            <FontAwesomeIcon icon={faEye} />
                        </div>
                        View
                    </div>
                    <div className="flex gap-4 items-center py-0.5 px-3 dark:hover:bg-dark-blue rounded-sm">
                        <div className="w-4">
                            <FontAwesomeIcon icon={faPencil} />
                        </div>
                        Update
                    </div>
                    <div className="flex gap-4 items-center py-0.5 px-3 dark:hover:bg-dark-blue rounded-sm">
                        <div className="w-4">
                            <FontAwesomeIcon icon={faDownload} />
                        </div>
                        Download
                    </div>
                    <div className="flex gap-4 items-center py-0.5 px-3 dark:hover:bg-dark-blue rounded-sm">
                        <div className="w-4">
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                        Delete
                    </div>
                </div>
            }
            </OutsideCickDetector>
            { showInfo && <FileInfoModal setShowInfo={setShowInfo} file={file} modalMode="show"/> }
        </div>
    )
}

export default FileCard;