import { File } from "../../../shared/types/fileTypes";
import FileCard from "./gallery/FileCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function RelatedFiles ({files} : {files: File[]}) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    return (
        <div className="dark:text-dark-text w-full px-6 py-6 flex gap-4 flex-col dark:bg-dark-card-light">
            <p className="text-2xl font-semibold dark:text-dark-text-highlighted">Related Files</p>
            <div className="px-5">
                <Slider {...settings}>
                    {files.map(file => {
                        return (
                            <div className="max-w-sm min-w-80">
                                <FileCard file={file}/>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default RelatedFiles;