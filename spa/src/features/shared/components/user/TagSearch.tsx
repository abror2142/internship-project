import React, { useEffect, useState } from "react";
import { fetchAllTags } from "../../../file/api/fileService";
import AutoSuggest from "./AutoSuggest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faGear, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { client } from "../../../../../algolia";
import OutsideCickDetector from "../../hooks/useOutsideClickDetector";
import { useAuth } from "../../hooks/useAuth";

function TagSearch ({setOpen, setResults}: {setOpen: React.Dispatch<React.SetStateAction<boolean>>, setResults: React.Dispatch<React.SetStateAction<any>>}) {
    const [operator, setOperator] = useState('and');
    const [tags, setTags] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [showSettings, setShowSettings] = useState(false);
    const { user } = useAuth();

    const searchByTags = async () => {
        const filterClause = `user_id:${user.id} AND (` + selected.map(tag => `tags:${tag}`).join(` ${operator.toUpperCase()} `) + ')';
        if(filterClause) {
            const response = await client.search({
                requests: [{
                    indexName: 'files',
                    filters: filterClause,
                    query: ''
                }],
            });
            setResults(response.results[0]?.hits);
        }
    }

    useEffect(() => {
        if (selected.length > 0) {
            searchByTags();
        } else {
            setResults([]);
        }
    }, [selected, operator])

    const fetchTags = async () => {
        try {
            const tags = await fetchAllTags();
            setTags(tags.map(tag => tag.name));
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchTags();
    }, [])

    const handleEnter = (tag: string) => {
        if(tag){
            setSelected(prev => [...prev, tag]);
            setTags(prev => prev.filter(item => item !== tag));
        }
    }

    const handleCancel = (tag: string) => {
        if(tag) {
            setSelected(prev => prev.filter(item => item !== tag));
            if(!tags.includes(tag)){
                setTags(prev => [...prev, tag]);
            }
        }
    }

    return (
        <div className="relative w-full items-center left-0 rounded-full flex bg-dark-blue px-4 py-1">
            <div className="border-r border-r-indigo-600 pr-4">
                <button 
                    className="flex items-center gap-2 bg-dark-bg rounded-sm px-2 py-1 hover:bg-blue-950 text-sm"
                    onClick={() => setOpen(prev => !prev)}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                    Back
                </button>
            </div>
            
            <div 
                className="grow-1 flex gap-2 max-w-full items-center overflow-auto rounded-md  
                    py-1 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500 
                    dark:scrollbar-track-transparent dark:scrollbar-thumb-indigo-600 mx-4"
            >   

                <AutoSuggest tags={tags} handleEnter={handleEnter} /> 
                {
                    selected
                    && selected.map((tag, index) => (
                        <div className="flex gap-2 items-end">
                            <div className="relative px-2 py-0.5 bg-indigo-600 rounded-sm">
                                <p className="text-white">{tag}</p>
                                <div 
                                    className="absolute -top-3 -right-1 hover:text-red-600  text-red-500"
                                    onClick={() => handleCancel(tag)}
                                    >
                                    <FontAwesomeIcon icon={faXmarkCircle} className="text-[13px] "/>
                                </div>
                            </div>
                            { 
                                index != selected.length-1
                                && <p className="px-1 py-0.5 bg-indigo-700 text-white text-[12px] rounded-sm font-semibold">{operator.toUpperCase()}</p>
                            }
                        </div>
                    ))
                }
               
            </div>
            <OutsideCickDetector toggler={setShowSettings}>
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-bg hover:text-indigo-600">
                    <FontAwesomeIcon icon={faGear} onClick={() => setShowSettings(prev => !prev)}/>
                </div>
                { 
                    showSettings
                    &&<div className="absolute -right-1 top-0 translate-x-full rounded-sm flex gap-2 justify-between bg-dark-blue py-1 px-4 text-sm">
                        <div className="flex flex-col items-center gap-2">
                            <button 
                                className={`px-4 py-1 rounded-sm ${operator === 'or' ? 'dark:bg-indigo-500 dark:text-dark-bg' : 'dark:bg-dark-bg dark:text-dark-text'}`}
                                onClick={() => setOperator('or')}
                            >
                                OR
                            </button>
                            <button 
                                className={`px-4 py-1 rounded-sm ${operator === 'and' ? 'dark:bg-indigo-500 dark:text-dark-bg' : 'dark:bg-dark-bg dark:text-dark-text'}`}
                                onClick={() => setOperator('and')}
                            >
                                AND
                            </button>
                        </div>
                    </div>
                }
            </OutsideCickDetector>
        </div>
    )
}

export default TagSearch;