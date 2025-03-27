import { faArrowLeft, faClockRotateLeft, faGears, faHashtag, faHome, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


function AdminSidebar () {
    return (
        <div className="px-8 bg-indigo-50 flex flex-col justify-between grow-1 max-w-[250px] py-4">
            <div className="flex flex-col gap-2">
                <Link to={"/admin"} className="flex items-center gap-2 text-indigo-400 hover:bg-indigo-100 px-2 py-1 rounded-sm">
                    <FontAwesomeIcon icon={faHome} className="text-lg " />
                    <p className="text-gray-600">Dashboard</p>
                </Link>
                <Link to={"/admin/users"} className="flex items-center gap-2 text-indigo-400 hover:bg-indigo-100 px-2 py-1 rounded-sm">
                    <FontAwesomeIcon icon={faUsers} className="text-lg " />
                    <p className="text-gray-600">Users</p>
                </Link>
                <Link to={"/admin/tags"} className="flex items-center gap-2 text-indigo-400 hover:bg-indigo-100 px-2 py-1 rounded-sm">
                    <FontAwesomeIcon icon={faHashtag} className="text-lg " />
                    <p className="text-gray-600">Tags</p>
                </Link>
                <Link to={"/admin/settings"} className="flex items-center gap-2 text-indigo-400 hover:bg-indigo-100 px-2 py-1 rounded-sm">
                    <FontAwesomeIcon icon={faGears} className="text-lg " />
                    <p className="text-gray-600">App Settings</p>
                </Link>
                <Link to={"/admin/logs"} className="flex items-center gap-2 text-indigo-400 hover:bg-indigo-100 px-2 py-1 rounded-sm">
                    <FontAwesomeIcon icon={faClockRotateLeft} className="text-lg " />
                    <p className="text-gray-600">System Logs</p>
                </Link>
            </div>
            <div>
                <Link to={"/"} className="flex items-center gap-2 text-gray-500 hover:bg-indigo-100 py-1 px-4 rounded-full border border-indigo-300 max-w-min">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <p>Homepage</p>
                </Link>
            </div>
        </div>
    )
}

export default AdminSidebar;