import InfoBar from "../components/InfoBar";
import FileView from "../components/user/home/FileView";
import HomeHeader from "../components/user/home/HomeHeader";

function Home () {
    return (
        <div className="flex grow max-h-full">
            <InfoBar />
            <div className="flex flex-col grow max-h-full">
                <HomeHeader />
                <FileView />
            </div>
        </div>
    )
}

export default Home;