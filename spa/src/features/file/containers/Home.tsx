import InfoBar from "../../shared/components/InfoBar";
import { useAuth } from "../../shared/hooks/useAuth";

function Home () {
    const { user } = useAuth();

    return (
        <div className="flex grow max-h-full dark:text-dark-text">
            {
                user && user.id
                ? <div>
                    
                </div>
                : <div>
                    <p className="text-2xl">Welcome to our website!</p>
                </div>
            }
        </div>
    )
}

export default Home;