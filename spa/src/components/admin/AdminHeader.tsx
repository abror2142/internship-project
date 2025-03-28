import { Link } from "react-router-dom";
import DarkModeToggler from "../DarkModeToggler";

function AdminHeader () {
    return (
        <div className="flex justify-between items-center text-gray-600 dark:text-dark-text">
            <Link to={"/admin"} className="text-xl">Admin Panel</Link>
            <div className="flex gap-4 items-center">
                <DarkModeToggler />
                <div className="flex gap-2 items-center">
                    <div className="w-[35px] h-[35px] rounded-full bg-gray-400"></div>
                    <p>John Doe</p>
                </div>   
            </div>
        </div>
    )
}

export default AdminHeader;