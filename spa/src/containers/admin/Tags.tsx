import { useEffect, useState } from "react";
import { getTags } from "../../utils/api";
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { customStyles } from "../../components/user/home/Filters";
import { useTheme } from "../../hooks/useTheme";
import { tagsMerge } from "../../utils/api";

function Tags () {
    const [tags, setTags] = useState([]);
    const [from, setFrom] = useState([]);
    const [to, setTo] = useState();

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
        try {
            const json = JSON.stringify({
                from: from.map(option => option.value),
                to: to.value
            });
            const resp = await tagsMerge(json);
            console.log(resp.data);
            fetchTags();
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <div className="flex flex-col max-w-2xl mx-auto mt-5 gap-4">
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
                    />
                </div>
            </div>
            <p className="text-xl font-semibold dark:text-dark-text-highlighted text-center">All Tags</p>
            <div className="grid grid-cols-4 gap-x-6 gap-y-1 w-full">
                {tags.map(tag => {
                    const remove = from.find(fromTag => fromTag.value == tag.name);
                    const keep =  tag.name === to?.value
                    return (
                        <div className="flex gap-2 items-center">
                            <p 
                                className={`px-2 py-0.5 rounded-sm max-w-min text-nowrap ${
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
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Tags;