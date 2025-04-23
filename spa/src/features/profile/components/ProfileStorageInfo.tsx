import { useAuth } from "../../shared/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faDatabase, faRecycle } from "@fortawesome/free-solid-svg-icons";
import { byteFormat } from "../../shared/utils/utils";
import PlansModal from "../../shared/components/PlansModal";

function ProfileStorageInfo () {
    const { user } = useAuth();
    const available = user?.storage?.used && ((user.storage.used/user.storage.allocated)*100).toFixed(0);
    return (
        <div>
            {
                user
                && available 
                && <div className="dark:bg-dark-bg w-full px-6 py-4 rounded-md flex flex-col gap-4 ">
                    <div className="flex justify-between items-center relative">
                        <div className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={faCloud}  className="text-2xl text-indigo-600" />
                            <p className="dark:text-dark-text-highlighted text-xl font-semibold">Storage Info</p>
                        </div>
                        <div>
                            <PlansModal />
                        </div>
                    </div>
                        <div className="flex justify-between">
                        <div className="flex flex-col gap-1">
                            <p><FontAwesomeIcon icon={faDatabase} /> Total</p>
                            <p>{byteFormat(user.storage.allocated)}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p><FontAwesomeIcon icon={faRecycle} /> Used</p>
                            <p>{byteFormat(user.storage.used)}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-nowrap">Status: <span className="text-sm text-indigo-400">({available}% full)</span></p>
                            <label className="z-10 w-full relative border min-w-[150px] border-blue-600 rounded-md max-w-[200px] flex justify-between items-center ">
                                <div className="flex gap-1 items-center px-2 dark:text-white text-sm min-h-1.5">
                                </div>
                                <div
                                    style={{
                                        width: `${available}%`,
                                    }}
                                    className={`absolute -z-1 bg-indigo-100 dark:bg-indigo-500 py-0.5 h-full rounded-md`}
                                ></div>
                            </label>
                            <p className="text-sm">{byteFormat(user.storage.used)} of {byteFormat(user.storage.allocated)} used</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProfileStorageInfo;