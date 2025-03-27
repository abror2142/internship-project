import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DarkModeToggler from "./DarkModeToggler";
import { faHardDrive, faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";

function Header () {
    return (
        <div className="flex justify-between items-center py-4 px-8 border-b border-gray-200 dark:border-dark-border">
            <Link 
                className="flex items-center gap-2"
                to="/"
            >
                <FontAwesomeIcon icon={faHardDrive} className="text-2xl dark:text-dark-blue-light"/>
                <p className="text-2xl dark:text-dark-text">Drive</p>
            </Link>

            <div className="flex gap-2 items-center border dark:border-dark-accent px-2 py-0.5 rounded-full grow-1 max-w-md">
                <FontAwesomeIcon icon={faSearch} className="text-lg dark:text-dark-blue-light dark:hover:bg-dark-bg rounded-full p-2"/>
                <input 
                    className="w-full outline-none grow-1"
                    placeholder="Search..."
                />
                <div className="group relative flex items-center">
                    <FontAwesomeIcon icon={faSliders} className="text-xl dark:text-dark-blue-light dark:hover:bg-dark-bg rounded-full p-2"/>
                    <p 
                        className="hidden group-hover:block absolute text-sm text-nowrap 
                        dark:bg-dark-bg border dark:border-dark-accent px-1 rounded-sm top-9 left-2"
                    >Advanced Search</p>
                </div>
            </div>

            <DarkModeToggler />
        </div>
    )
}

export default Header;