import dayjs from "dayjs";
import { Claim } from "../utils/types";

function ClaimCard({claim} : {claim: Claim}) {
    return (
        <div className="flex flex-col gap-4 ">
            <p className="text-lg dark:text-dark-text-highlighted">Claim Info</p>
            <div className="flex flex-col gap-1">
                <p><span className="dark:text-dark-text-highlighted">Current Status:</span> {claim.claim_status.name}</p>
                <p><span className="dark:text-dark-text-highlighted">Requested Plan Name:</span> {claim.plan.name}</p>
                <p><span className="dark:text-dark-text-highlighted">Requested Plan Storage:</span> {claim.plan.sizeLabel}</p>
                <p><span className="dark:text-dark-text-highlighted">Claim Created at:</span> {dayjs(claim.created_at).format('DD.MM.YYYY HH:mm::ss')}</p>
            </div>
        </div>
    )
}

export default ClaimCard;