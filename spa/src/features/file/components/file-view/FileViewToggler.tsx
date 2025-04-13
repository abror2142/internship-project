import { faCheck, faGrip, faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FileViewToggler ({view, setView}) {
    return (
        <div className="flex items-center text-white rounded-full justify-end">
        <div 
            className={`pl-3 pr-4 py-2 border-r flex gap-2 items-center  rounded-s-full 
                ${view === 'gallery' ? 'bg-blue-950' : 'bg-dark-blue'}`} 
            onClick={() => setView('gallery')} 
        >
            {
                view === 'gallery'
                && <FontAwesomeIcon 
                    icon={faCheck} 
                    className="text-base text-green-400"
                />
            }
            <FontAwesomeIcon 
                icon={faGrip}
               
                className="text-xl"
            />
        </div>
        <div 
            className={`pl-4 pr-3 py-2 flex gap-2 items-center  rounded-e-full 
                ${view === 'table' ? 'bg-blue-950' : 'bg-dark-blue'}`} 
            onClick={() => setView('table')} 
        >
            <FontAwesomeIcon 
                icon={faListUl}
                className="text-xl"
            />
            {
                view === 'table'
                && <FontAwesomeIcon 
                    icon={faCheck} 
                    className="text-base text-green-400"
                />
            }
        </div>
    </div>
    )
}

export default FileViewToggler;