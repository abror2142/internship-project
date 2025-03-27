import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../hooks/useTheme";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

function DarkModeToggler ()  {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div
            onClick={() => toggleTheme()}
            className="text-xl"
        >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </div>
    )
}

export default DarkModeToggler;