import { useEffect, useState } from "react";
import { fetchAllTags } from "../../../file/api/fileService";
import AutoSuggest from "./AutoSugges";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { client } from "../../../../../algolia";
import { SearchResult } from "algoliasearch";
import { Link } from "react-router-dom";

function TagSearch () {
    const [operator, setOperator] = useState('and');
    const [tags, setTags] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [results, setResults] = useState<SearchResult[]>([]);
    
    console.log(results);

    const searchByTags = async () => {
        const filterClause = selected.map(tag => `tags:${tag}`).join(` ${operator.toUpperCase()} `);
        if(filterClause) {
            console.log(selected, filterClause)
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
    }, [selected])

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
        <div className="absolute z-50 top-12 px-8 py-4 dark:bg-dark-blue w-full left-0 rounded-md flex flex-col gap-4">
            <div className="flex gap-2 justify-end  max-w-full text-sm">
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
            <div className="grow-1 flex gap-2 flex-wrap max-w-full items-center">
                
                    {
                        selected
                        && selected.map((tag, index) => (
                            <>
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
                                    && <p className="px-1 py-0.5 bg-indigo-500 text-dark-bg text-sm rounded-sm">{operator.toUpperCase()}</p>
                                }
                            </>

                        ))
                    }
                
                <AutoSuggest tags={tags} handleEnter={handleEnter} />
            </div>
            <div className="flex flex-col">
                {results.map(result => {
                    return (
                        <Link to={`/file/${result?.id}`} className="text-indigo-600 flex justify-between px-2 rounded-sm py-0.5 hover:bg-dark-bg">
                            {result?.name}
                            <div className="flex gap-1 text-green-600">
                                {result?.tags.map(tag => (<p>{tag}</p>))}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default TagSearch;