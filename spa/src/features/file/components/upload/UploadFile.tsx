import { useState, useEffect } from "react";
import TagSelection from "./TagSelection";
import FileInput from "./FileInput";
import { Tag } from "./TagSelection";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { createFile } from "../../../shared/utils/api";
import StorageIndicator from "../../../../components/StorageIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Extension, SettingsData, Settings } from "../../../shared/types/fileTypes";
import { fetchSettings, fetchExtensions } from "../../api/fileService";
import { parseSettings } from "../../utils/utils";
import { uploadFile } from "../../../shared/utils/uploader";
import { useNavigate } from "react-router-dom";

const FileSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(255, 'Too Long!'),
    size: Yup.number()
        .nonNullable()
        .required(),
    tags: Yup.array()
        .required()
}); 

interface UploadFormValues {
    name: string;
    description: string;
    tags: Tag[];
    size: number;
}

function UploadFile () {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [extensions, setExtensions] = useState<Extension[]>([]);
    const navigate = useNavigate();

    const fetchConfig = async () => {
        try {
            const settingsData: SettingsData[] = await fetchSettings();
            const settingsParsed = parseSettings(settingsData); 
            setSettings(settingsParsed);

            const extensions: Extension[] = await fetchExtensions();
            setExtensions(extensions);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchConfig();
    }, [])

    const handleSubmit = async (json: FormData) => {
        try {
            setLoading(true);
            const resp = await createFile(json, {headers: {'Content-Type': 'multipart/form-data'}});
            console.log(resp.data);
            if(resp.data?.file?.id) {
                return navigate(`/file/${resp.data.file.id}`)
            }
        } catch(e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    const handleApiUpload = async () => {
        if(file){
            setLoading(true);
            try {
                const fileUrl = await uploadFile(file);
                return fileUrl;
            } catch(e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
    }

    const getType = () => {
        const extension = file?.name.split('.').pop()?.toLowerCase();
        const type = extensions.find(ext => ext.name === extension || ext.name === '.' + extension)?.file_type;
        return type;
    }

    const createFormData = async (values: UploadFormValues) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('size', values.size.toString());

        values.tags.forEach((tag, index) => {
            formData.append(`tags[${index}]`, tag.value);
        })

        if(settings && settings.storage === 'api'){
            const url = await handleApiUpload();
            if(url) {
                formData.append('path', url);
            }
        } else {
            if(file){
                formData.append('file', file);
            }
        }
        const type = getType()?.name;
        if(type){
            formData.append('type', type);
        }
        
        return formData;
    }
    
    if(!settings){
        return <p>No settings Available!</p>
    }

    return (
        <div className="relative z-50" >
            <div
                onClick={() => setOpen(prev => !prev)}
                className="dark:text-white border border-dark-border px-4 py-2 max-w-min cursor-pointer flex items-center justify-center gap-2 dark:bg-dark-bg dark:hover:border-indigo-500 rounded-md"
            >  
                <FontAwesomeIcon icon={faPlus} className="text-xl"/>
                <p>New</p>
            </div>
            {
                open
                && <Formik
                    initialValues={{
                        name: file?.name || "",
                        description: '',
                        size: file?.size || 0,
                        tags: tags,
                    }}
                    enableReinitialize
                    validationSchema={FileSchema}
                    onSubmit={async (values) => {
                        const formData = await createFormData(values);
                        for (const [key, value] of formData.entries()) {
                            console.log(`${key}:`, value);
                        }
                        handleSubmit(formData);
                    }}
                >
                    <Form className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white space-y-4 dark:bg-dark-blue p-6 rounded-lg shadow-xl relative dark:text-dark-text">
                            <p className="text-3xl mb-6 font-semibold dark:text-indigo-400 text-center">Upload a File</p>
                            <StorageIndicator />
                            <div className="flex gap-5">
                                <FileInput setFile={setFile} settings={settings} extensions={extensions}/>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="name">File Name:</label>
                                        <Field 
                                            id="name" 
                                            name="name" 
                                            placeholder={file?.name}
                                            className="px-2 py-1.5 rounded-sm outline-none dark:bg-dark-bg dark:border dark:border-dark-border" 
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="description">Description (optional):</label>
                                        <Field 
                                            id="description" 
                                            name="description" 
                                            placeholder="You can provide description here..."
                                            className="px-2 py-1.5 rounded-sm outline-none dark:bg-dark-bg dark:border dark:border-dark-border" 
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="description">Tags: </label>
                                        <TagSelection setTags={setTags}/> 
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-1.5 bg-red-500 text-white rounded-lg"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-1.5 bg-indigo-500 text-white rounded-lg"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            }
            {   
                loading 
                && <div role="status" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            }
        </div>
    )
}

export default UploadFile;