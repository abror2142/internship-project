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
            
            <div className="flex gap-6 dark:text-dark-text-highlighted items-center">
                <DarkModeToggler />
                { 
                    user 
                    ? <div className=" flex gap-2 items-center ">
                        <div className="relative group w-8 h-8 rounded-full bg-dark-blue-light">
                            {
                                user?.image
                                ? <img src={user?.image} className="w-8 h-8 rounded-full"/>
                                : <p className="text-lg">{user.name.split(' ').slice(0, 2).map(part => part[0]).join('').toUpperCase()}</p>
                            }
                            <div className="text-sm hidden min-w-30 group-hover:flex flex-col gap-2 absolute top-8 -right-2 px-4 py-2 bg-dark-bg border dark:border-dark-border">
                                <Link to={'/profile'} className="text-center py-1 bg-gray-300 dark:bg-dark-blue rounded-sm dark:hover:bg-blue-900">Profile</Link>
                                <button 
                                    onClick={() => logout()}
                                    className="py-1 bg-gray-300 dark:bg-dark-blue rounded-sm dark:hover:bg-blue-900"
                                >Logout</button>
                            </div>
                        </div>
                        
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