import { useState } from "react";
import { Plan } from "../types/fileTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { createStorageClaim } from "../api/apiService";

function PlanCard ({plan} : {plan: Plan}) {
    const [success, setSuccess] = useState(false);

    const handleClick = async () => {
        try {
            const json = JSON.stringify({plan_id: plan.id});
            await createStorageClaim(json);
            setSuccess(prev => !prev);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div>
             {
                success
                ? <div className="relative text-5xl dark:text-dark-text-highlighted dark:bg-indigo-500 w-70 rounded-md flex flex-col items-center justify-center h-full">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <p className="text-base text-center">Request successfully sent!</p>
                    <FontAwesomeIcon icon={faXmarkCircle} onClick={() => setSuccess(prev => !prev)} className="text-red-500 text-lg hover:text-red-600 absolute top-2 right-2"/>
                </div>
                : <div className="px-6 py-4 rounded-md dark:bg-indigo-500 dark:text-dark-text-highlighted max-w-70 flex flex-col gap-4 justify-between">
                    <p className="text-2xl text-center font-medium">{plan.name}</p>
                    <p className="">{plan.description}</p>
                    <p className="text-center font-medium text-2xl">{plan.sizeLabel}</p>
                    <div className="flex flex-col gap-2">
                        <p className="dark:bg-indigo-600 px-4 py-2 rounded-md max-w-min text-nowrap mx-auto hover:bg-indigo-700" onClick={handleClick}>{plan.price == 0 ? "Free $0" : `Book for $${plan.price} / monthly`}</p>
                        <p className="text-sm text-end">**{plan.duration}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default PlanCard;