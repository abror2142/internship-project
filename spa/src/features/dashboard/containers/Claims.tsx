import { useEffect, useState } from "react";
import { Claim } from "../utils/types";
import { fetchClaims } from "../api/dashboardService";

function Claims () {
    const [claims, setClaims] = useState<Claim[]>([]);

    const fetchClaimsData = async () => {
        try {
            const data = await fetchClaims();
            setClaims(data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchClaimsData();
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default  Claims;