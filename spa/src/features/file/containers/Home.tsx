import InfoBar from "../../../components/InfoBar";
import FileView from "../components/FileView";

function Home () {
    return (
        <div className="flex grow max-h-full">
            <InfoBar />
            <FileView />
        </div>
    )
}

export default Home;