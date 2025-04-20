import { useEffect, useState } from "react";
import { ClaimPaginated } from "../utils/types";
import { fetchClaims } from "../api/dashboardService";
import { byteFormat } from "../../shared/utils/utils";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useQueryParamsInterceptor } from "../../shared/hooks/useQueryParamsInterceptor";
import { useSearchParams } from "react-router-dom";
import UserCard from "../components/UserCard";
import ClaimCard from "../components/ClaimCard";

function Claims () {
    useQueryParamsInterceptor();
    const [claims, setClaims] = useState<ClaimPaginated | null>(null);
    const [show, setShow] = useState<number | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();


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
    }, [searchParams])

    const toggleShow = async (claimId: number) => {
        show ? setShow(null) : setShow(claimId);
    }

    const setPageQuery = (pageId: number) => {
        const params = new URLSearchParams(searchParams);
        if(pageId) {
            params.set('page', pageId.toString());
            setSearchParams(params);
        }
    }

    return (
        <div className="w-full m-5">
           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-2 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                            Current Storage
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                            Claimed Plan
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                            Claimed Plan Storage
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                            Status
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                            More
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {claims?.data  && claims.data.map(claim => (
                        <>
                            <tr 
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 
                                        border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                key={uuid()}
                            >
                                <td className="px-2 py-2">
                                    {claim.id}
                                </td>
                                <td scope="row" className="px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                                    {claim.user.name}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {byteFormat(claim.user.storage)}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {claim.plan.name}
                                </td>
                                <td className="px-4 py-2 flex gap-1 items-center justify-center">
                                    {claim.plan.sizeLabel}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {claim.claim_status.name}
                                </td>
                                <td 
                                    className="px-4 py-2 text-center"
                                    onClick={() => toggleShow(claim.id)}
                                >
                                    <FontAwesomeIcon icon={show == claim.id ? faChevronUp : faChevronDown} />
                                </td>
                            </tr>
                            {
                                show 
                                && show === claim.id 
                                && <tr
                                    className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    key={uuid()}
                                >
                                    <td colSpan={7} className="td-full px-4 py-4 space-y-4">
                                        <div className="flex gap-6 items-center">
                                            <UserCard id={claim.user.id} />
                                            <FontAwesomeIcon icon={faArrowAltCircleRight} className="text-2xl dark:text-dark-text-highlighted"/>
                                            <ClaimCard claim={claim} />
                                        </div>
                                        <div className="flex w-full gap-4 justify-center">
                                            <button className="px-4 py-1 grow-1 max-w-sm bg-green-500 hover:bg-green-600 rounded-sm text-white text-sm">
                                                Approve
                                            </button>
                                            <button className="px-4 py-1 grow-1 max-w-sm bg-red-500 hover:bg-red-600 rounded-sm text-white font-semibold">
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            }
                        </>
                    ))}
                </tbody>
            </table>
            <nav 
                className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" 
                aria-label="Table navigation"
            >
                <span 
                    className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 
                        block w-full md:inline md:w-auto">Showing 
                    <span className="font-semibold text-gray-900 dark:text-white">
                         {claims?.from}-{claims?.to}
                    </span> of 
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {claims?.total}
                    </span>
                </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    {
                        claims?.prev_page_url 
                        && <li
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 
                                bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 
                                hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
                                dark:hover:bg-gray-700 dark:hover:text-white"
                            onClick={() => setPageQuery(claims?.current_page - 1)}
                        >
                            Prev
                        </li>
                    }
                    {
                        Array.from({ length: claims?.last_page }, (_, i) => (
                            <li
                                className={` flex items-center justify-center px-3 h-8  border border-gray-300 bg-blue-50
                                    ${
                                        claims?.current_page == i+1
                                        ? 'text-blue-600  hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' 
                                        : "leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    }
                                `}
                                onClick={() =>  claims?.current_page != i+1 && setPageQuery(i+1)}
                            >
                                {i+1}
                            </li>
                          ))
                    }
                    {
                        claims?.next_page_url 
                        && <li
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 
                                bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 
                                hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
                                dark:hover:bg-gray-700 dark:hover:text-white"
                            onClick={() => setPageQuery(claims?.current_page + 1)}
                        >
                            Next
                        </li>
                    }
                </ul>
            </nav>
        </div>
    )
}

export default  Claims;