import InfoBar from "../components/InfoBar";
import FileView from "../components/user/home/FileView";
import HomeHeader from "../components/user/home/HomeHeader";

function Home () {
    return (
        <div className="h-full flex flex-col grow-1 ">
            <HomeHeader />
            <div className="flex gap-4 grow-1">
                <InfoBar />
                <FileView />
            </div>
        </div>
    )
}

export default Home;