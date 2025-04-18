import { File } from "../../../shared/types/fileTypes";
import FileCard from "./gallery/FileCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function RelatedFiles ({files} : {files: File[]}) {
    var settings = {
        dots: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };
    console.log(files)

    return (
        <div className="dark:text-dark-text px-6 py-6 flex gap-4 flex-col dark:bg-dark-card-light">
            <p className="text-2xl font-semibold dark:text-dark-text-highlighted">Related Files</p>
            <div className="px-5 max-w-5xl w-full mx-auto">
                <Slider {...settings}>
                    {files.map(file => {
                        return (
                            <div>
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