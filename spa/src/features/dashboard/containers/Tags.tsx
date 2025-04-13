import { useEffect, useState } from "react";
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../shared/hooks/useTheme";
import { customStyles } from "../../file/components/Filters";
import { tagsMerge, deleteTag, getTags } from "../../shared/utils/api";


interface Option {
    label: string | null;
    value: string | null;
}

interface Tag {
    id: number;
    name: string;
}

function Tags () {
    const [tags, setTags] = useState<Tag[]>([]);
    const [from, setFrom] = useState<readonly Option[]>([]);
    const [to, setTo] = useState<Option | null>();

    const { isDarkMode } = useTheme();

    const fetchTags = async () => {
        try {   
            const resp = await getTags();
            setTags(resp.data);
        } catch(e) {
            console.log(e);
        }
    } 

    const handleMerge = async () => {
        if(to && from.length > 0){
            try {
                const json = JSON.stringify({
                    from: from.map(option => option.value),
                    to: to.value
                });
                await tagsMerge(json);
                setFrom([]);
                setTo(null);
                fetchTags();
            } catch(e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        fetchTags();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const resp = await deleteTag(id);
            console.log(resp.data);
            fetchTags();
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="flex flex-col max-w-2xl m-5 gap-4">
            <div className="flex gap-2 flex-col items-center w-full">
                <div className="w-full">
                    <Select
                        styles={customStyles(isDarkMode)}
                        className="react-select-container"
                        classNamePrefix="react-select" 
                        options={tags.filter(tag => tag.name !== to?.value).map(tag => ({label: tag.name, value: tag.name}))}
                        onChange={(e) => setFrom(e)}
                        isMulti={true}
                        value={from}
                    />
                </div>
                <div 
                    className="flex gap-2 items-center px-3 py-1 rounded-sm dark:bg-dark-blue dark:hover:bg-blue-950"
                    onClick={handleMerge}
                >
                    <p>Merge</p>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
                <div className="w-full">
                    <Select
                        styles={customStyles(isDarkMode)}
                        className="react-select-container"
                        classNamePrefix="react-select" 
                        options={tags.filter(tag => !from.find(fromTag => fromTag.value == tag.name)).map(tag => ({label: tag.name, value: tag.name}))}
                        onChange={(e) => setTo(e)}
                        isClearable={true}
                    />
                </div>
            </div>
            <div className="dark:bg-dark-blue px-3 py-1.5 rounded-md">
                <p className="text-xl font-semibold dark:text-dark-text-highlighted text-center">All Tags</p>
                <div className="grid grid-cols-4 gap-x-6 gap-y-1 w-full">
                    {tags.map(tag => {
                        const remove = from.find(fromTag => fromTag.value == tag.name);
                        const keep =  tag.name === to?.value
                        return (
                            <div className="group relative flex gap-2 items-center dark:hover:bg-dark-bg px-2">
                                <p 
                                    className={`py-0.5 rounded-sm max-w-min text-nowrap ${
                                        keep ? 'bg-green-600 text-white' 
                                        : remove
                                        ? 'bg-red-600 text-white' : null
                                    }`}
                                >
                                    {tag.name}
                                </p>
                                <div>
                                { 
                                    keep 
                                    ? <FontAwesomeIcon icon={faCheck} className="text-green-600"/> 
                                    : remove 
                                    ? <FontAwesomeIcon icon={faX}  className="text-red-600"/> 
                                    : null
                                }
                                </div>
                                <div 
                                    className="group-hover:block hidden absolute right-0 text-red-500 hover:text-red-600"
                                    onClick={() => handleDelete(tag.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Tags;