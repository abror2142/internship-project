import { useAuth } from "../../shared/hooks/useAuth";
import UploadImage from "../components/UploadImage";
import AccountInfo from "../components/AccountInfo";
import PasswordChange from "../components/PasswordChange";
import ProfileStorageInfo from "../components/ProfileStorageInfo";
import ProfileUserInfo from "../components/ProfileUserInfo";

function Profile () {
    const { user } = useAuth();

    return (
        user
        && <div 
            className=" dark:text-dark-text flex  mx-5 dark:bg-dark-blue w-full px-6 py-4 
                rounded-lg flex-col gap-4 max-h-full overflow-auto scrollbar-thin scrollbar-track-gray-300 
                scrollbar-thumb-gray-500 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-dark-blue-light"
        >
            <div className="flex gap-6">
                <div className="flex items-center flex-col gap-2 self-center  dark:bg-dark-bg px-6 h-full justify-center rounded-md">
                    {
                        user?.image
                        && <div className="w-40 h-40 flex items-center justify-center overflow-hidden rounded-full" >
                            <img src={user.image} className="max-w-full rounded-full object-contain" />
                        </div>
                    }
                    <UploadImage />
                </div>
                <div className="w-full flex flex-col gap-4">
                    <ProfileStorageInfo />
                    <PasswordChange />
                </div>
            </div>
            <div className="flex gap-4">
                <AccountInfo />
                <ProfileUserInfo />
            </div>
        </div>
    )
}

export default Profile;