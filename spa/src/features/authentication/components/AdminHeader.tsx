import { Link } from "react-router-dom";
import DarkModeToggler from "../../shared/components/DarkModeToggler";
import ClaimsBell from "../../dashboard/containers/ClaimsBell";
import { useAuth } from "../../shared/hooks/useAuth";

function AdminHeader () {
    const { user } = useAuth();

    return (
        <div className="flex justify-between items-center text-gray-600 dark:text-dark-text">
            <Link to={"/admin"} className="text-xl">Admin Panel</Link>
            <div className="flex gap-4 items-center">
                <div className="text-xl">
                    <ClaimsBell />
                </div>
                <DarkModeToggler />
                <div className="flex gap-2 items-center">
                    <div className="w-[35px] h-[35px] rounded-full bg-gray-400">
                        <img src={user?.image}/>
                    </div>
                    <p>{user?.name}</p>
                </div>   
            </div>
        </div>
    )
}

export default AdminHeader;