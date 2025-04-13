import { useState } from "react";
import { byteFormat } from "../../../../shared/utils/utils";
import { File } from "../../../../shared/types/fileTypes";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function FileTableView({files} : {files: File[]}) {
    const [show, setShow] = useState<number | null>(null);

    return (
        <div className="relative flex-1 shadow-md mx-auto flex flex-col gap-3 max-h-10 mb-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-2">
                            {/* <div className="flex items-center">
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
                            </div> */}
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Size
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                            Storage
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                            Tag(s)
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                            More
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {files && files.map(file => (
                        <>
                            <tr 
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 
                                        border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                key={uuid()}
                            >
                                <td className="w-4 px-4 py-3">
                                    <div className="flex items-center">
                                        {/* <input 
                                            id="checkbox-table-search-1" 
                                            type="checkbox"
                                            checked={selected.includes(user.id)} 
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                                                rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 
                                                dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 
                                                dark:bg-gray-700 dark:border-gray-600"
                                            onChange={() => toggleSelected(user.id)} 
                                        /> */}
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td className="px-2 py-3">
                                    <img src={file.file_type.image} className="w-6"/>
                                </td>
                                <td scope="row" className="px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                                    {file.name}
                                </td>
                                <td className="px-4 py-3">
                                    {byteFormat(file.size)}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {file.storage}
                                </td>
                                <td className="px-4 py-3 flex gap-1 items-center justify-center">
                                    {file.tags && file.tags.map(tag => (
                                        <p 
                                            className={`px-2 py-1 rounded-sm text-sm`}
                                            key={uuid()}
                                        >
                                            {tag.name}
                                        </p>
                                    ))}
                                </td>
                                {
                                    !show
                                    ? <td 
                                        className="px-4 py-3 text-center"
                                        onClick={() => setShow(file.id)}
                                    >
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </td>
                                    : <td 
                                        className="px-4 py-3 text-center"
                                        onClick={() => setShow(null)}
                                    >
                                        <FontAwesomeIcon icon={faChevronUp} />
                                    </td>
                                }
                            </tr>
                            {
                                show
                                && show == file.id 
                                && <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    key={uuid()}
                                >
                                    <td colSpan={7} className="px-4 td-full">
                                        <div>
                                            {file.name}
                                        </div>
                                    </td>
                                </tr>
                            }
                        </>
                    ))}
                </tbody>
            </table>
            {/* <nav 
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
            </nav> */}
        </div>
    )
}

export default FileTableView;