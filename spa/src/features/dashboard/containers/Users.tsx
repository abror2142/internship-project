import { blockUsers, deleteUsers, getUsersList, makeAdmin, removeAdmin, unblockUsers, updateStorage } from "../../shared/utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown, faCircleDown, faCircleUp, faCloud, faLock, faLockOpen, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export const loader = async () => {
    try {
        const resp = await getUsersList();
        return resp.data;
    } catch (e) {
        console.log(e);   
    }
}

function Users () {
    const [data, setData] = useState();
    const [show, setShow] = useState<number | null>(null);
    const [selected, setSelected] = useState<number[]>([]);
    const [storage, setStorage]= useState(2);

    const fetchData = async (page: number | null = null) => {
        try {
            const resp = await getUsersList(page);
            setSelected([]);
            setData(resp.data)
        } catch (e) {
            console.log(e);   
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const toggleShow = (id: number) => {
        if(show == id)
            setShow(null);
        else
            setShow(id);
    }

    const toggleSelected = (id: number) => {
        if(selected.includes(id))
            setSelected(prev => prev.filter(selectedId => selectedId != id));
        else
            setSelected(prev => [...prev, id])
    }

    const toggleAll = () => {
        if(selected.length == data?.data.length) {
            setSelected([])
        }else {
            setSelected(data?.data.map(user => user.id));
        }
    }

    const handleClick = async (action: string) => {
        if(selected.length > 0){
            const json = JSON.stringify({
                users: selected
            });
            try {
                let resp;
                if(action == 'block')
                    resp = await blockUsers(json);
                else if(action == 'unblock')
                    resp = await unblockUsers(json);
                else if(action == 'make-admin')
                    resp = await makeAdmin(json);
                else if(action == 'remove-admin')
                    resp = await removeAdmin(json);
                else if(action == 'delete')
                    resp = await deleteUsers(json);
                console.log(resp && resp.data)
                fetchData(data?.current_page);
                setSelected([]);
            } catch(e) {
                console.log(e);
            }
        }
    }

    const handleStorage = async () => {
        if(selected.length > 0){
            const json = JSON.stringify({
                users: selected,
                storage: `${storage}GB`
            });
            try {
                const resp = await updateStorage(json);
                fetchData(data?.current_page);
                setSelected([]);
                console.log(resp.data)
            } catch(e) {
                console.log(e);
            }
        }
    }

    return (
        <div className="relative overflow-x-auto shadow-md mx-auto mt-5 flex flex-col gap-3">
            <div className="flex items-center gap-4 justify-end">
                <div className="flex items-center dark:bg-dark-blue max-w-min">
                    <input 
                        className=" outline-none pl-3 pr-2 py-1 max-w-[100px]"
                        type="number"
                        value={storage}
                        onChange={(e) => setStorage(parseInt(e.target.value))}
                    />
                    <p className="border-l dark:border-dark-blue-light px-2">
                        GB
                    </p>
                </div>

                <div 
                    className="flex gap-1 items-center px-3 py-1 border border-sm bg-gray-300 
                            dark:bg-dark-blue hover:dark:bg-blue-900 dark:hover:border-blue-800 
                            dark:text-dark-text-highlighted dark:border-dark-border rounded-sm"
                    onClick={() => handleStorage()}
                >
                    Update Storage
                    <FontAwesomeIcon icon={faCloud} className="text-dark-blue-light"/>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <div 
                        className="flex gap-2 items-center px-3 py-1.5 border border-sm bg-gray-300 
                            dark:bg-dark-blue hover:dark:bg-blue-900 dark:hover:border-blue-800 
                            dark:text-dark-text-highlighted dark:border-dark-border rounded-sm"
                        onClick={() => handleClick('unblock')}
                    >
                        <FontAwesomeIcon icon={faLockOpen} />
                        <p>Unblock</p>
                    </div>
                    <div 
                        className="flex gap-1 items-center px-3 py-1.5 border border-sm bg-gray-300 
                            dark:bg-dark-blue hover:dark:bg-blue-900 dark:hover:border-blue-800 
                            dark:text-dark-text-highlighted dark:border-dark-border rounded-sm"
                        onClick={() => handleClick('block')}
                    >
                        <FontAwesomeIcon icon={faLock} />
                    </div>
                    <div 
                        className="flex gap-2 items-center px-3 py-1.5 border border-sm bg-gray-300 text-red-500
                            dark:bg-dark-blue hover:dark:bg-blue-900 dark:hover:border-blue-800  
                            dark:border-dark-border rounded-sm"
                        onClick={() => handleClick('delete')}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                        <p>Delete</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div 
                        className="flex gap-2 items-center px-3 py-1.5 border border-sm bg-gray-300 
                            dark:bg-dark-blue hover:dark:bg-blue-900 dark:hover:border-blue-800 
                            dark:text-dark-text-highlighted dark:border-dark-border rounded-sm"
                        onClick={() => handleClick('make-admin')}
                    >
                        <FontAwesomeIcon icon={faCircleUp} />
                        <p>Make Admin</p>
                    </div>
                    <div 
                        className="flex gap-1 items-center px-3 py-1.5 border border-sm bg-gray-300 
                            dark:bg-dark-blue hover:dark:bg-blue-900 dark:hover:border-blue-800 
                            dark:text-dark-text-highlighted dark:border-dark-border rounded-sm"
                        onClick={() => handleClick('remove-admin')}
                    >
                        <FontAwesomeIcon icon={faCircleDown} />
                    </div>
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-2">
                            <div className="flex items-center">
                                <input 
                                    id="checkbox-all-search" 
                                    type="checkbox" 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm 
                                        focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                                        dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                    onChange={() => toggleAll()}
                                    checked={selected.length == data?.data.length}
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Storage
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                            Role(s)
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Active
                        </th>
                        <th scope="col" className="px-4 py-3">
                            More
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data && data?.data.map(user => (
                        <>
                            <tr 
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 
                                        border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                key={uuid()}
                            >
                                <td className="w-4 px-4 py-2">
                                    <div className="flex items-center">
                                        <input 
                                            id="checkbox-table-search-1" 
                                            type="checkbox"
                                            checked={selected.includes(user.id)} 
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                                                rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 
                                                dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 
                                                dark:bg-gray-700 dark:border-gray-600"
                                            onChange={() => toggleSelected(user.id)} 
                                        />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td className="px-2 py-2">
                                    {user.id}
                                </td>
                                <td scope="row" className="px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.email}
                                </td>
                                <td className="px-4 py-2">
                                    {user.name}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {user.storage}
                                </td>
                                <td className="px-4 py-2 flex gap-1 items-center justify-center">
                                    {user?.roles && user.roles.map(role => (
                                        <p 
                                            className={`px-2 py-1 rounded-sm text-sm ${role.name == 'admin' ? 'bg-blue-500 text-white' : role.name == 'user' ? 'bg-amber-500 text-white' : ''}`}
                                            key={uuid()}
                                        >
                                            {role.name}
                                        </p>
                                    ))}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <FontAwesomeIcon icon={user.is_active ? faCheck : faX} className={user.is_active ? 'text-green-600' : 'text-red-500' }/>
                                </td>
                                <td 
                                    className="px-4 py-2 text-center"
                                    onClick={() => toggleShow(user.id)}
                                >
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </td>
                            </tr>
                            {
                                show 
                                && show === user.id 
                                && <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    key={uuid()}
                                >
                                    <td colSpan={7} className="px-4 td-full">
                                        <div>
                                            {user.name}
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
    )
}

export default Users;