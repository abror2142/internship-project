import dayjs from "dayjs";
import { useLoaderData } from "react-router-dom";
import { fetchFile } from "../api/fileService";
import { LoaderFunctionArgs } from "react-router-dom";
import { z } from "zod";
import { fileSchema } from "../../shared/utils/zod/FileZod";

export const loader = async ({ params } : LoaderFunctionArgs) => {
    const { id } = params;
    if(id && parseInt(id)) {
        try {
            const data = await fetchFile(parseInt(id));
            return data;
        } catch(error) {
            console.log(error);
        }
    }
}

function FileDetail() {
    const file: z.infer<typeof fileSchema> = useLoaderData();
    console.log(file);
    return (
        <div className="relative space-y-4 bg-white dark:bg-dark-card-light border dark:border-dark-border px-6 py-4 rounded-lg shadow-lg">
            <div className="flex flex-col gap-4 min-w-sm" >
                <p className="text-2xl text-center dark:text-dark-text-highlighted font-semibold">
                    File Info
                </p>
                <div className="flex gap-8">
                    <div className="flex flex-col gap-2">
                        <img 
                            src={file.file_type.image}
                            className="w-40"
                        />
                        <p>
                            Type: {file.file_type.name}
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
                <div className="flex justify-between items-center">
                    <p>
                        Created at: <span className="text-sm">{dayjs(file.created_at).format('DD.MM.YY HH:mm')}</span>
                    </p>
                    <p>
                        Updated at: <span className="text-sm">{dayjs(file.updated_at).format('DD.MM.YY HH:mm')}</span>
                    </p>
                </div>
                
            </div>
        </div>
    );
}

export default FileDetail;