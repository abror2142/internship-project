import { useEffect, useState } from "react";
import { Plan } from "../types/fileTypes";
import { fetchPlans } from "../api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faX, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import OutsideCickDetector from "../hooks/useOutsideClickDetector";
import PlanCard from "./PlanCard";

function PlansModal () {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    const fetchPlansData = async () => {
        try {
            const data = await fetchPlans();
            setPlans(data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchPlansData();
    }, []);

    return (
        <div className="">
            <div onClick={() => setOpen(prev => !prev)}>
                <div className="absolute text-sm text-blue-400 top-0 right-0 hover:text-blue-700">
                    <div className="group relative" >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <div className="hidden group-hover:block absolute -bottom-4 left-4 bg-dark-bg text-dark-text px-2 py-0.1 text-nowrap">
                            Get more storage
                        </div>
                    </div>
                </div>
            </div>
            <OutsideCickDetector toggler={setOpen}>
                {
                    open
                    && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white space-y-4 dark:bg-dark-blue p-6 rounded-lg shadow-xl relative dark:text-dark-text min-w-md flex flex-col items-center">
                            <FontAwesomeIcon icon={faXmarkCircle} onClick={() => setOpen(prev => !prev)} className="self-end text-red-500 text-xl hover:text-red-600"/>
                            <div className="flex gap-4">
                                {
                                    plans.map(plan => {
                                        return (
                                            <PlanCard plan={plan} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                }
            </OutsideCickDetector>
        </div>
    )
}

export default PlansModal;