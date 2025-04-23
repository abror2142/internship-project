import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faChevronDown, faChevronUp, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { customStyles } from "../../file/components/Filters";
import { v4 } from "uuid";
import { useQueryParamsInterceptor } from "../../shared/hooks/useQueryParamsInterceptor";
import { fetchLogs } from "../api/dashboardService";
import { LogsPaginated } from "../utils/types";

const actionOptions = [
    {label: "Upload", value: "upload"},
    {label: "Search", value: "search"},
    {label: "Delete", value: "delete"},
    {label: "Other", value: "other"}
]

const statusOptions = [
    {label: "Successful", value: "successful"},
    {label: "Failed", value: "failed"}
]

function Logs () {
    useQueryParamsInterceptor();

    const [data, setData] = useState<LogsPaginated | null>(null);
    const [open, setOpen] = useState<number | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [fromDate, setFromDate] = useState<string | null>(searchParams.get('fromDate'));
    const [toDate, setToDate] = useState<string | null>(searchParams.get('toDate'));

    const fetchLogsData = async () => {
        console.log('Fetching!')
        try {
            const data = await fetchLogs();
            setData(data);
        } catch(e) {
            setData(null);
            console.log(e);
        }
    }

    useEffect(() => {
        fetchLogsData();
    },[searchParams])

    const handleParams = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams);
        value !== null ? params.set(key, value) : params.delete(key);
        setSearchParams(params);
    }

    return (
        <div className="w-full mt-5 dark:bg-dark-blue px-8 py-4 rounded-md flex flex-col gap-4 max-h-min">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => handleParams('target', 'user')}
                    className={`px-3 py-1 rounded-sm ${(searchParams.has('target') && searchParams.get('target') === 'user') || !searchParams.has('target') ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'dark:hover:bg-dark-bg'}`}
                >User</button>
                <button
                    onClick={() => handleParams('target', 'admin')}
                    className={`px-3 py-1 rounded-sm ${(searchParams.has('target') && searchParams.get('target') === 'admin') ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'dark:hover:bg-dark-bg'}`}
                >Admin</button>
            </div>
            <div className="flex w-full gap-4">
                <div className="flex flex-col gap-2 grow-1 max-w-80">
                    <p>Performed Action</p>
                    <Select
                        options={actionOptions}
                        styles={customStyles()}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        onChange={(e) => handleParams('action', e ? e.value : null)}
                        isClearable={true}
                        defaultValue={searchParams.get('action') ? actionOptions.find(action => action.value == searchParams.get('action')) : null}
                        placeholder="Action"
                    />
                </div>
                <div className="flex flex-col gap-2 grow-1 max-w-80">
                    <p>Status</p>
                    <Select
                        options={statusOptions}
                        styles={customStyles()}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        onChange={(e) => handleParams('status', e ? e.value : null)}
                        isClearable={true}
                        defaultValue={searchParams.get('status') ? statusOptions.find(status => status.value == searchParams.get('status')) : null}
                    />
                </div>
            </div>
            <div className="flex gap-4 ">
                <div className="flex gap-1 items-center">
                    <label htmlFor="fromDate" className="py-2 px-2 dark:bg-dark-blue rounded-sm">From</label>
                    {
                        fromDate 
                        && <div className="relative py-2 px-4 dark:bg-dark-blue rounded-sm">
                            <p>
                                {fromDate}
                            </p>
                            {
                                fromDate
                                && <div className="absolute top-0 right-0 text-[12px] text-red-500 hover:text-red-600">
                                    <FontAwesomeIcon icon={faXmarkCircle} onClick={() => {setFromDate(null); handleParams('fromDate', null)}}/>
                                </div>
                            }
                        </div>
                    }
                    <div className="relative py-2 px-2 dark:bg-dark-blue rounded-sm">
                        <input
                            onChange={(e) => {setFromDate(e.target.value); handleParams('fromDate', e.target.value)}}
                            type="date"
                            className="appearance-none outline-none cursor-pointer text-transparent bg-transparent [&::-webkit-datetime-edit]:hidden"
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none text-xl">
                            <FontAwesomeIcon icon={faCalendar} />
                        </div>
                    </div>
                </div>

                <div className="flex gap-1 items-center">
                    <label htmlFor="toDate" className="py-2 px-2 dark:bg-dark-blue rounded-sm">To</label>
                    {
                        toDate 
                        && <div className="relative py-2 px-4 dark:bg-dark-blue rounded-sm">
                            <p>
                                {toDate}
                            </p>
                            {
                                toDate
                                && <div className="absolute top-0 right-0 text-[12px] text-red-500 hover:text-red-600">
                                    <FontAwesomeIcon icon={faXmarkCircle} onClick={() => {setToDate(null); handleParams('toDate', null)}}/>
                                </div>
                            }
                        </div>
                    }
                    <div className="relative py-2 px-2 dark:bg-dark-blue rounded-sm">
                        <input
                            onChange={(e) => {setToDate(e.target.value); handleParams('toDate', e.target.value)}}
                            type="date"
                            min={fromDate ? fromDate : undefined}
                            className="appearance-none outline-none cursor-pointer text-transparent bg-transparent [&::-webkit-datetime-edit]:hidden"
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none text-xl">
                            <FontAwesomeIcon icon={faCalendar} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Date Time
                            </th>
                            <th scope="col" className="text-center">
                                More
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data && data.data.map(log => {
                            return (
                                <>
                                    <tr key={v4()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">  
                                        <td scope="row" colSpan={4} className="px-6 py-2 whitespace-nowrap flex items-center gap-2">
                                            <p>{dayjs(log.created_at).format('dd D HH:mm::ss DD.MM.YYYY')}</p>
                                            <p>{log.action}</p>
                                            <p>user={log.user.name}</p>
                                            <p className={`${log.successful ? 'text-green-500' : 'text-red-500'}`}>{log.successful ? "successful" : "failed"}</p>
                                        </td>
                                        {   open === log.id
                                            ? <td onClick={() => setOpen(null)}>
                                                <FontAwesomeIcon icon={faChevronUp} className="px-6 py-2 mx-auto"/>
                                            </td>
                                            : <td  onClick={() => setOpen(log.id)}>
                                                <FontAwesomeIcon icon={faChevronDown} className="px-6 py-2 mx-auto"/>
                                            </td>
                                        }
                                    </tr>
                                    {
                                        open
                                        && open === log.id 
                                        && <tr key={v4()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td scope="5" colSpan={5}>
                                                <p>{log.user.name}</p>
                                            </td>
                                        </tr>
                                    }
                                </>
                            )
                        })}
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
                            {data?.from}-{data?.to}
                        </span> of 
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {data?.total}
                        </span>
                    </span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        {
                            data?.prev_page_url 
                            && <li
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 
                                    bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 
                                    hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
                                    dark:hover:bg-gray-700 dark:hover:text-white"
                                onClick={() => handleParams('page', (data?.current_page - 1).toString())}
                            >
                                Prev
                            </li>
                        }

                        {
                            data 
                            && Array.from({ length: data?.last_page }, (_, i) => (
                                <li
                                    className={` flex items-center justify-center px-3 h-8  border border-gray-300 bg-blue-50
                                        ${
                                            data?.current_page == i+1
                                            ? 'text-blue-600  hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' 
                                            : "leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        }
                                    `}
                                    onClick={() =>  data?.current_page != i+1 && handleParams('page', (i+1).toString())}
                                >
                                    {i+1}
                                </li>
                            ))
                        }

                        {
                            data?.next_page_url 
                            && <li
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 
                                    bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 
                                    hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
                                    dark:hover:bg-gray-700 dark:hover:text-white"
                                onClick={() => handleParams('page', (data?.current_page + 1).toString())}
                            >
                                Next
                            </li>
                        }
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Logs;