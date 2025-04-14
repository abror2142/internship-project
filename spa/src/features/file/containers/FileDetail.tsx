import dayjs from "dayjs";
import { useLoaderData, Link } from "react-router-dom";
import { fetchFile, fetchRelatedFiles } from "../api/fileService";
import { LoaderFunctionArgs } from "react-router-dom";
import { File } from "../../shared/types/fileTypes";
import RelatedFiles from "../components/file-view/RelatedFiles";
import FileDownloadBtn from "../components/file-view/gallery/FileDownloadBtn";
import FileDelete from "../components/FileDelete";

export const loader = async ({ params } : LoaderFunctionArgs) => {
    const { id } = params;
    if(id && parseInt(id)) {
        try {
            const file = await fetchFile(parseInt(id));
            const relatedFiles = await fetchRelatedFiles(parseInt(id));
            return {file, relatedFiles};
        } catch(error) {
            console.log(error);
        }
    }
}
 
interface DataType {
    file: File;
    relatedFiles: File[];
}

function FileDetail() {
    const {file, relatedFiles}: DataType = useLoaderData();

    return (
        <div className="grow-1 flex justify-between flex-col">
            <div 
                className="relative space-y-4 bg-white dark:bg-dark-card-light border 
                    dark:border-dark-border px-6 py-4 rounded-lg shadow-lg dark:text-dark-text w-full 
                    max-w-3xl mt-5 mx-auto">
                <div className="flex flex-col gap-4 min-w-sm" >
                    <p className="text-2xl text-center dark:text-dark-text-highlighted font-semibold">
                        File Info
                    </p>
                    <div className="flex justify-end">
                        <FileDownloadBtn file={file}/>
                    </div>
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-2">
                            <img 
                                src={file?.file_type?.image}
                                className="w-40"
                            />
                            <p>
                                Type: {file?.file_type?.name}
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 min-w-sm">
                            <div className="flex flex-col">
                                <label htmlFor="name">File Name</label>
                                <p>{file.name}</p>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="description">Description</label>
                                <p>{file.description}</p>
                            </div>
                            <div className="flex  gap-2">
                                {file.tags.map((tag) => {
                                    return (
                                        <div className="px-2 py-0.5 bg-amber-500 rounded-sm text-white">
                                            {tag.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col items-center">
                            <p>Created at: <span className="text-sm">{dayjs(file.created_at).format('DD.MM.YY HH:mm')}</span></p>
                            <p>Updated at: <span className="text-sm">{dayjs(file.updated_at).format('DD.MM.YY HH:mm')}</span></p>
                        </div>
                        <div className="flex items-center gap-4">
                            <FileDelete fileId={file.id} />
                            <div className="flex gap-4 items-center">
                                <Link to={`/file/${file.id}/update`} className="text-blue-600">Edit</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RelatedFiles files={relatedFiles} />
        </div>
    );
}

export default FileDetail;