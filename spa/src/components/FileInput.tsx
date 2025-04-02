import { useEffect, useState } from "react";
import { getSettings } from "../utils/api";
import { uploadFile } from "../utils/uploader";

interface Settings {
    storage_size_limit: string;  
    file_extentions: string;
    file_size_limit: string;
}

function FileInput ({setFileUrl}) {
    const [file, setFile] = useState();
    const [url, setUrl] = useState<string | null>(null);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [extensions, setExtensions] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    const fetchSettings = async () => {
        try {
            const resp = await getSettings();
            const data = resp.data;
            const settingsObject = data.reduce((acc, cur) => {
                return { ...acc, ...cur };
              }, {});
              
            setSettings(settingsObject);
        } catch(e) {
            console.log(e);
        }
    }

    const handleChange = (e) => {
        setErrors([]);
        const uploadedFile = e.target.files[0];
        if(!settings || !settings?.file_size_limit) {
            setErrors(prev => [...prev, 'Settings are not available!'])
            return;
        }
        const limit = parseInt(settings?.file_size_limit) * 1024 * 1024;
        if (uploadedFile && uploadedFile.size > limit){
            setErrors(prev => [...prev, `File size exeeds than ${settings?.file_size_limit}MB limit.`]);
            return;
        }
        setFile(uploadedFile);
    }   
    
    const parseExtentions = (fileExtentions: string) => {
        const extentionsArr = fileExtentions.split(',');
        const arr = extentionsArr.map(ext => {
            return ext[0] == '.' ? ext : '.' + ext;
        })
        console.log(arr)
        setExtensions(arr);
    }

    useEffect(() => {
        fetchSettings();
    }, [])

    useEffect(() => {
        if(settings && settings.file_extentions){
            parseExtentions(settings.file_extentions);
        }
    }, [settings])

    const handleUpload = async () => {
        if(file){
            console.log("Uploading...")
            try {
                const fileUrl = await uploadFile(file);
                if(fileUrl)
                    setUrl(fileUrl)
                    setFileUrl(fileUrl);
            } catch(e) {
                console.log(e);
            } finally {
                console.log('Upload finished!')
            }
        }
    }

    useEffect(() => {
        handleUpload();
    }, [file])

    return (
        <div>  
            {
                url 
                ? <p>{url}</p>
                : <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{extensions.join(',')}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">(MAX. {settings?.file_size_limit}MB)</p>
                        </div>
                        <input 
                            id="dropzone-file" 
                            type="file" 
                            className="hidden" 
                            onChange={handleChange}
                            accept={extensions.join(',')}
                        />
                    </label>
                </div> 
            }
            {errors.map(error => <p className="text-red-500 text-sm">{error}</p>)}
        </div>
    )
}

export default FileInput;