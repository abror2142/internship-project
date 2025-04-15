import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import OutsideCickDetector from "../../hooks/useOutsideClickDetector";
import TagSearch from "./TagSearch";

function SearchBar () {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative flex gap-2 items-center dark:bg-dark-blue px-2 py-0.5 rounded-full grow-1 max-w-md">
            <FontAwesomeIcon icon={faSearch} className="text-lg dark:text-dark-blue-light dark:hover:bg-dark-bg rounded-full p-2"/>
            <input 
                className="w-full outline-none grow-1"
                placeholder="Search..."
            />
            <OutsideCickDetector toggler={setOpen}>
                <div 
                    className="group relative flex items-center"
                    onClick={() => setOpen(prev => !prev)}
                >
                    <FontAwesomeIcon icon={faSliders} className="text-xl dark:text-dark-blue-light dark:hover:bg-dark-bg rounded-full p-2"/>
                    <p 
                        className="hidden group-hover:block absolute text-sm text-nowrap 
                        dark:bg-dark-bg border dark:border-dark-accent px-1 rounded-sm top-9 left-2"
                    >Advanced Search</p>
                </div>
                {
                    true
                    && <TagSearch />
                }
            </OutsideCickDetector>
        </div>
    )
}

export default SearchBar;