import { useState } from "react";
import TagSearch from "./TagSearch";
import SimpleSearch from "./SimpleSearch";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

function SearchBar () {
    const [open, setOpen] = useState(false);
    const [results, setResults] = useState([]);

    return (
        <div className="relative flex items-center py-0.5 grow-1 max-w-xl">
            {
                open
                ? <TagSearch setOpen={setOpen} setResults={setResults} />
                : <SimpleSearch setOpen={setOpen} setResults={setResults} />
            }
            {
                results.length > 0
                && <div 
                        className="absolute transform -bottom-1 right-0 z-50 flex flex-col translate-y-full 
                            bg-dark-blue w-full overflow-auto  rounded-sm "
                    >
                    {results.map(result => {
                        return (
                            <Link 
                                key={uuid()}
                                to={`/file/${result?.id}`} 
                                className="text-indigo-600 flex justify-between px-2 rounded-sm py-0.5 hover:bg-dark-bg"
                            >
                                {result?.name}
                                <div className="flex gap-1 text-green-600">
                                    {result?.tags.map(tag => (<p>{tag}</p>))}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default SearchBar;