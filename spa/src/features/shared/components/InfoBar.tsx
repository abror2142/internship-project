import { Link } from "react-router-dom";
import { faHardDrive, faHome, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StorageInfoFull from "../../file/components/StorageInfoFull";
import UploadFile from "../../file/components/upload/UploadFile";

function InfoBar() {
    return (
        <div className="flex flex-col gap-4 dark:bg-dark-blue px-8 py-4 dark:text-dark-text min-w-72">
            <UploadFile />
            <Link 
                to={"/"} 
                className="flex gap-2 items-center dark:bg-dark-bg px-3 py-1 rounded-sm 
                    dark:hover:text-dark-blue-light dark:hover:bg-dark-card-light 
                    border dark:border-transparent dark:hover:border-dark-blue-light"
            >
                <FontAwesomeIcon icon={faHome} />
                <p>Home</p>
            </Link>
            <Link 
                to={"/my-drive"}
                className="flex gap-2 items-center dark:bg-dark-bg px-3 py-1 rounded-sm 
                    dark:hover:text-dark-blue-light dark:hover:bg-dark-card-light 
                    border dark:border-transparent dark:hover:border-dark-blue-light"
            >
                <FontAwesomeIcon icon={faHardDrive} />
                <p>My Drive</p>
            </Link>
            <Link 
                to={"/trash"}
                className="flex gap-2 items-center dark:bg-dark-bg px-3 py-1 rounded-sm 
                    dark:hover:text-dark-blue-light dark:hover:bg-dark-card-light 
                    border dark:border-transparent dark:hover:border-dark-blue-light"
            >
                <FontAwesomeIcon icon={faTrash} />
                <p>Trash</p>
            </Link>
            <Link 
                to={"/storage"}
                className="flex gap-2 items-center dark:bg-dark-bg px-3 py-1 rounded-sm 
                    dark:hover:text-dark-blue-light dark:hover:bg-dark-card-light 
                    border dark:border-transparent"
            >
                <StorageInfoFull />
            </Link>
            <Link 
                to={"/get-storage"}
                className="flex gap-2 items-center bg-green-500 text-white max-w-min text-nowrap mx-auto px-3 py-1 rounded-sm 
                   hover:bg-green-600"
            >
                <p>Get more storage</p>
            </Link>
        </div>    
    )
}

export default InfoBar;