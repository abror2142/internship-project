import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import CreatableSelect from 'react-select/creatable';
import dayjs from "dayjs";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { fetchAllTags, updateFile } from "../api/fileService";
import { fetchFile } from "../api/fileService";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import { fileSchema, tagSchema } from "../../shared/utils/zod/FileZod";
import { z } from "zod";
import { customStyles } from "../components/Filters";
import { tagsToOptions } from "../utils/utils";
import { Option } from "../../shared/types/select";
import FileDelete from "../components/FileDelete";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;
    if(id && parseInt(id)) {
        try {
            const file = await fetchFile(parseInt(id))
            const tags = await fetchAllTags();
            console.log(file)
            return {file, tags};
        } catch(error) {
            console.log('Error while fetching Data!', error)
        }
    }
}

interface LoaderDataType {
    file: z.infer<typeof fileSchema>, 
    tags: z.infer<typeof tagSchema>[]
}

function FileUpdate() {
    const { file, tags } : LoaderDataType  = useLoaderData();
    const [options, setOptions] = useState<Option[]>([]);
    const [selected, setSelected] = useState<Option[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setOptions(tagsToOptions(tags));
        setSelected(tagsToOptions(file.tags));
    }, [])

    const handleUpdate = async (json: string) => {
        try {
            await updateFile(file.id, json);
            return navigate(`/file/${file.id}`);
        } catch(e) {
            console.log(e);
        }
    }

    const confirmUpdate = (json: string) => {
        confirmAlert({
            title: 'Confirm to update',
            message: 'Are you sure to update this file.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleUpdate(json)
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    return (
        <div 
            className="relative space-y-4 bg-white dark:bg-dark-card-light border 
                dark:border-dark-border px-6 py-4 rounded-lg shadow-lg max-w-3xl mx-auto 
                w-full dark:text-dark-text mt-5 max-h-min"
        >
            <Formik
                initialValues={{
                    name: file.name,
                    description: file.description
                }}
                onSubmit={async (values) => {
                    const tags = selected.map(tag => tag.value);
                    const data = {...values, tags: tags};
                    const json = JSON.stringify(data);
                    confirmUpdate(json);
                }}
            >
                <Form className="flex flex-col gap-5 min-w-sm">
                    <p className="text-2xl text-center dark:text-dark-text-highlighted font-semibold">
                        Edit File
                    </p>
                    <div className="flex gap-8 mx-auto">
                        <div className="flex flex-col gap-2">
                            <img 
                                src={file.file_type.image}
                                className="w-40"
                            />
                            <p className="text-center">
                                Type: {file.file_type.name}
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 min-w-sm">
                            <div className="flex flex-col">
                                <label htmlFor="name">File Name</label>
                                <Field 
                                    id="name" 
                                    name="name" 
                                    placeholder="Jane" 
                                    className="bg-dark-blue px-3 py-1.5 outline-none"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="description">Description</label>
                                <Field 
                                    id="description" 
                                    name="description" 
                                    component='textarea'
                                    className="bg-dark-blue px-3 py-1.5 outline-none"
                                />
                            </div>
                            <CreatableSelect 
                                isMulti 
                                options={options} 
                                value={selected}
                                onChange={(options) => setSelected([...options])}
                                isClearable={false}
                                styles={customStyles()}
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col items-center">
                            <p>
                                Created at: <span className="text-sm">{dayjs(file.created_at).format('DD.MM.YY HH:mm')}</span>
                            </p>
                            <p>
                                Updated at: <span className="text-sm">{dayjs(file.updated_at).format('DD.MM.YY HH:mm')}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-4 justify-between">
                            <FileDelete fileId={file.id}/>
                            <button 
                                type="submit" 
                                className="bg-indigo-500 text-white rounded-sm px-3 py-1 max-w-min hover:bg-indigo-600"
                            >Save</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default FileUpdate;