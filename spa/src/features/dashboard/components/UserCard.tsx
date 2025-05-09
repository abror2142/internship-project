import { useEffect, useState } from "react";
import { UserWithRoles } from "../utils/types";
import { fetchUser } from "../api/dashboardService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

function UserCard ({id}: {id: number}) {
    const [user, setUser] = useState<UserWithRoles | null>(null);
    
    const fetchUserData = async () => {
        try {
            const data = await fetchUser(id);
            setUser(data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    return (
        <div>
            {
                user
                && <div className="flex gap-4"> 
                    <div>
                        {   
                            user?.image 
                            ? <img src={user.image} className="w-40 rounded-md" /> 
                            : <div className="w-40 h-40 rounded-md bg-gray-200 flex items-center justify-center">
                                <FontAwesomeIcon icon={faImage} className="text-4xl"/>
                            </div>
                        }
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-lg dark:text-dark-text-highlighted">User Data</p>
                        <div className="flex gap-1 flex-col">
                            <p>
                                <span className="dark:text-dark-text-highlighted">Name:</span> {user?.name}
                            </p>
                            <p>
                                <span className="dark:text-dark-text-highlighted">Email:</span> {user?.email}
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="dark:text-dark-text-highlighted">Role(s):</p>
                                {user?.roles && user.roles.map(role => {
                                    return (
                                        <p className="px-2 py-0.2 rounded-sm bg-amber-500 text-white max-w-min">{role.name}</p>
                                    )
                                }) }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserCard;