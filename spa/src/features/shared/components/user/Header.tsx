import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHardDrive } from "@fortawesome/free-solid-svg-icons";
import DarkModeToggler from "../DarkModeToggler";
import { useAuth } from "../../hooks/useAuth";
import SearchBar from "./SearchBar";

function Header () {
    const { user, logout } = useAuth();

    return (
        <div className="flex justify-between items-center py-4 px-8 border-b border-gray-200 dark:border-dark-border">
            <div className="flex gap-4 items-center">
                <Link 
                    className="flex items-center gap-2"
                    to="/"
                >
                    <FontAwesomeIcon icon={faHardDrive} className="text-2xl dark:text-dark-blue-light"/>
                    <p className="text-2xl dark:text-dark-text">Drive</p>
                </Link>
            </div>

            <SearchBar />
            
            <div className="flex gap-4 dark:text-dark-text-highlighted items-center">
                <DarkModeToggler />
                { 
                    user 
                    ? <div className="flex gap-2 items-center ">
                        <p className="underline">{user?.name}</p>
                        <button onClick={() => logout()}
                                className="px-3 py-1.5 bg-gray-300 dark:bg-dark-blue rounded-sm dark:hover:bg-blue-900"
                            >Logout</button>
                        
                    </div>
                    : <div className="flex gap-2 items-center">
                        <Link to={"/login"}
                            className="px-3 py-1.5 bg-gray-300 dark:bg-dark-blue rounded-sm dark:hover:bg-blue-900"
                        >Login</Link>
                        <Link to={"/register"}
                            className="px-3 py-1.5 bg-gray-300 dark:bg-dark-blue rounded-sm dark:hover:bg-blue-900"
                        >Register</Link>
                    </div>
                }
            </div>

            
        </div>
    )
}

export default Header;