import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutsideCickDetector from "../../hooks/useOutsideClickDetector";
import { faSearch, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { client } from "../../../../../algolia";
import { useAuth } from "../../hooks/useAuth";

function SimpleSearch ({setOpen, setResults}: {setOpen: React.Dispatch<React.SetStateAction<boolean>>, setResults: React.Dispatch<React.SetStateAction<any>>}) {
    const [term, setTerm] = useState<string>("");
    const { user } = useAuth();

    const searchByTerm = async () => {
        const filterClause = `user_id:${user.id}`;
        const response = await client.search({
            requests: [{
                indexName: 'files',
                query: term,
                restrictSearchableAttributes: ['name'],
                filters: filterClause
            }],
        });
        setResults(response.results[0]?.hits);  
    }

    useEffect(() => {
        if(term) {
            searchByTerm();
        } else {
            setResults([]);
        }
    }, [term])

    return (
        <div className="flex flex-col grow-1 w-full">
            <div className="relative flex gap-2 items-center dark:bg-dark-blue px-4 py-1.5 rounded-full grow-1">
                <FontAwesomeIcon icon={faSearch} className="text-lg dark:text-dark-blue-light rounded-full p-2"/>
                <input 
                    className="w-full outline-none grow-1"
                    placeholder="Search by file name..."
                    onChange={(e) => setTerm(e.target.value)}
                />
                <OutsideCickDetector toggler={setOpen}>
                    <div 
                        className="group relative flex items-center border-l border-l-indigo-600 pl-4"
                    >
                         <p 
                                className="flex items-center gap-2 bg-dark-bg rounded-sm px-2 py-1 hover:bg-blue-950 text-sm text-nowrap"
                                onClick={() => setOpen(prev => !prev)}
                            >
                                by tags
                                <FontAwesomeIcon icon={faChevronRight} />
                        </p>
                        <p 
                            className="hidden group-hover:block absolute text-sm text-nowrap 
                            dark:bg-dark-blue px-2 rounded-sm top-9 left-2"
                        >Advanced Search</p>
                    </div>
                </OutsideCickDetector>
            </div>
            
        </div>
    )
}

export default SimpleSearch;