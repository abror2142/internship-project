import { faArrowLeft, faChartLine, faClockRotateLeft, faGears, faHashtag, faHome, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


function AdminSidebar () {
    return (
        <div 
            className="px-8 py-4 flex flex-col justify-between grow-1 max-w-[250px] 
                    bg-indigo-50 text-indigo-400 dark:bg-dark-blue"
        >
            <div className="flex flex-col gap-2">
                <Link to={"/admin"} className="flex items-center gap-2 hover:bg-indigo-100 dark:hover:bg-dark-bg-contrast px-2 py-1 rounded-sm">
                    <FontAwesomeIcon icon={faHome} className="text-lg" />
                    <p className="text-gray-600 dark:text-dark-text">Dashboard</p>
                </Link>
                <Link to={"/admin/users"} className="flex items-center gap-2 hover:bg-indigo-100 dark:hover:bg-dark-bg-contrast px-2 py-1 rounded-sm">
                    <FontAwesomeIcon icon={faUsers} className="text-lg " />
                    <p className="text-gray-600 dark:text-dark-text">Users</p>
                </Link>
                <Link to={"/admin/tags"} className="flex items-center gap-2 hover:bg-indigo-100 dark:hover:bg-dark-bg-contrast px-2 py-1 rounded-sm">
                    <FontAwesomeIcon icon={faHashtag} className="text-lg " />
                    <p className="text-gray-600 dark:text-dark-text">Tags</p>
                </Link>
                <Link to={"/admin/settings"} className="flex items-center gap-2 hover:bg-indigo-100 dark:hover:bg-dark-bg-contrast px-2 py-1 rounded-sm">
                    <FontAwesomeIcon icon={faGears} className="text-lg " />
                    <p className="text-gray-600 dark:text-dark-text">App Settings</p>
                </Link>
                <Link to={"/admin/logs"} className="flex items-center gap-2 hover:bg-indigo-100 dark:hover:bg-dark-bg-contrast px-2 py-1 rounded-sm">
                    <FontAwesomeIcon icon={faClockRotateLeft} className="text-lg " />
                    <p className="text-gray-600 dark:text-dark-text">System Logs</p>
                </Link>
                <Link to={"/admin/performance"} className="flex items-center gap-2 hover:bg-indigo-100 dark:hover:bg-dark-bg-contrast px-2 py-1 rounded-sm">
                    <FontAwesomeIcon icon={faChartLine} className="text-lg " />
                    <p className="text-gray-600 dark:text-dark-text">Performance</p>
                </Link>
            </div>
            <div>
                <Link to={"/"} className="flex items-center gap-2 hover:bg-indigo-100 dark:hover:bg-dark-bg-contrast py-1 px-4 rounded-full border border-indigo-300 max-w-min">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <p>Homepage</p>
                </Link>
            </div>
        </div>
    )
}

export default AdminSidebar;