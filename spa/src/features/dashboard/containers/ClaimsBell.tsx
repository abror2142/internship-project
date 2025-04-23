import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { fetchNewClaimsCount } from "../api/dashboardService";
import { Link } from "react-router-dom";

function ClaimsBell () {
    const [count, setCount] = useState<number>(0);

    const fetchClaimsData = async () => {
        try {
            const data = await fetchNewClaimsCount();
            setCount(data.count);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchClaimsData();
    }, [])

    console.log(count)

    return (
        <Link to={"/admin/claims"} className="relative hover:text-indigo-500">
            <FontAwesomeIcon icon={faBell} />
            {
                count > 0
                ? <div className="absolute text-[12px] font-semibold rounded-full bg-red-500 w-3.5 h-3.5 flex items-center justify-center -top-2 -right-2 text-white z-10">
                    {count}
                </div>
                : null
            }
        </Link>  
    )
}

export default  ClaimsBell;