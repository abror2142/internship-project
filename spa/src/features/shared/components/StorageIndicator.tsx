import { byteFormat } from "../utils/utils";
import { useAuth } from "../hooks/useAuth";
import PlansModal from "./PlansModal";

export interface StorageInfo {
    used: number;
    total: number;
}

function StorageIndicator () {
    const { user } = useAuth();

    
    if(!user || !user?.storage?.allocated) {
        return <p>No information found!</p>
    }

    const available = ((user.storage.used/user.storage.allocated)*100).toFixed(0);

    return (
        <div className="flex items-center gap-2">
            <label className="z-10 w-full relative border py-0.5 min-w-[150px] border-blue-600 rounded-md max-w-[200px] flex justify-between items-center ">
              <div className="flex gap-1 items-center px-2 dark:text-white text-sm">
                {byteFormat(user?.storage?.allocated)}
              </div>
              <div
                style={{
                  width: `${available}%`,
                }}
                className={`absolute -z-1 bg-indigo-100 dark:bg-indigo-500 py-0.5 h-full rounded-md`}
              ></div>
              <p className="pr-2 dark:text-indigo-300">{available}%</p>
            </label>
            <div className="relative pr-3 py-1">
                <PlansModal />
            </div>
        </div>
    )
}

export default StorageIndicator;