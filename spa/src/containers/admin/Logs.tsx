import { useState, useEffect } from "react";
import { getLogs } from "../../utils/api";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faCalendar, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { customStyles } from "../../components/user/home/Filters";
import { useTheme } from "../../hooks/useTheme";
interface Log {
    id: number;
    action: string;
    user_id: number;
    successful: number;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    }
}

interface Link {
    url: string;
    label: string;
    active: boolean;
}

interface Data {
    current_page: number;
    data: Log[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: null,
    to: number;
    total: number;
}

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
    const [data, setData] = useState<Data | null>(null);
    const [open, setOpen] = useState<number | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [fromDate, setFromDate] = useState<string | null>(null);
    const [toDate, setToDate] = useState<string | null>(null);


    const { isDarkMode } = useTheme();

    const fetchLogs = async () => {
        try {
            const resp = await getLogs();
            setData(resp.data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchLogs();
    },[searchParams])

    const handleParams = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams);
        value !== null ? params.set(key, value) : params.delete(key);
        setSearchParams(params);
    }

    return (
        <div>
            <div>
                <button 
                    onClick={() => handleParams('target', 'user')}
                    className={`${(searchParams.has('target') && searchParams.get('target') === 'user') || !searchParams.has('target') ? 'bg-indigo-500' : null}`}
                >User</button>
                <button
                    onClick={() => handleParams('target', 'admin')}
                    className={`${(searchParams.has('target') && searchParams.get('target') === 'admin') ? 'bg-indigo-500' : null}`}
                >Admin</button>
            </div>
            <div>
                <Select
                    options={actionOptions}
                    styles={customStyles(isDarkMode)}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    onChange={(e) => handleParams('action', e ? e.value : null)}
                    isClearable={true}
                    placeholder="Action"
                />
                <Select
                    options={statusOptions}
                    styles={customStyles(isDarkMode)}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    onChange={(e) => handleParams('status', e ? e.value : null)}
                    isClearable={true}
                    placeholder="Status"
                />
            </div>
            <div className="flex gap-4">
                <FontAwesomeIcon icon={faCalendar}  className="text-xl"/>
                <div className="flex gap-2">
                    <label htmlFor="fromDate">From</label>
                    <input id="fromDate" type="date" className="" onChange={(e) => setFromDate(e.target.value)}/>
                </div>

                <div className="flex gap-2">
                    <label htmlFor="toDate">To</label>
                    <input
                        id="toDate"
                        type="date"
                        title="Pick a date"
                        className="appearance-none w-6 h-6 p-0 cursor-pointer text-transparent bg-transparent [&::-webkit-datetime-edit]:hidden"
                    />
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
                        {data && data.data.map(log => {
                            return (
                                <>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">  
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
                                        && <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                                onClick={() => fetchData(data?.current_page - 1)}
                            >
                                Prev
                            </li>
                        }

                        {
                            Array.from({ length: data?.last_page }, (_, i) => (
                                <li
                                    className={` flex items-center justify-center px-3 h-8  border border-gray-300 bg-blue-50
                                        ${
                                            data?.current_page == i+1
                                            ? 'text-blue-600  hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' 
                                            : "leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        }
                                    `}
                                    onClick={() =>  data?.current_page != i+1 && fetchData(i+1)}
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
                                onClick={() => fetchData(data?.current_page + 1)}
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