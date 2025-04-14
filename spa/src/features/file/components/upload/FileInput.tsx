import { useState } from "react";
import { byteFormat } from "../../../shared/utils/utils";
import { Extension, Settings } from "../../../shared/types/fileTypes";
import { useAuth } from "../../../shared/hooks/useAuth";

interface FileInputProps {
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    settings: Settings;
    extensions: Extension[];
}

function FileInput ({ setFile, settings, extensions }: FileInputProps) {
    const { user } = useAuth();
    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setErrors([]);
        const uploadedFile = event.target.files?.[0];
        if(!settings || !settings?.fileSizeLimit || !settings.storageSizeLimit) {
            setErrors(prev => [...prev, 'Settings are not available!'])
            return;
        }
        if (uploadedFile){
            const limit = settings?.fileSizeLimit;
            if (uploadedFile.size > limit){
                setErrors(prev => [...prev, `File size exeeds than ${settings?.fileSizeLimit} MB limit per file.`]);
                return;
            }
            
            const availableSpace = user.storage?.acclocated - user.storage.used;
            if (uploadedFile.size < availableSpace){
                setErrors(prev => [...prev, `File size exeeds than free storage you have which is ${availableSpace} MB limit .`]);
                return;
            }
            setFile(uploadedFile);
        }
    }   
    
    const parsedExtentions = () => {
        const exts = extensions.map(ext => ext.name[0] == '.' ? ext.name : '.' + ext.name);
        const extString = exts.join(',');
        return extString;
    }

    return (
        <div className="relative min-w-86 z-50">  
            <div className="flex items-center justify-center w-full">
                <label 
                    htmlFor="dropzone-file" 
                    className="flex flex-col items-center justify-center w-full h-64 border-2 
                        border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 
                        dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 
                        dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{parsedExtentions()}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">(MAX. {settings && settings?.fileSizeLimit && byteFormat(settings.fileSizeLimit)})</p>
                    </div>
                    <input 
                        id="dropzone-file" 
                        type="file" 
                        className="hidden" 
                        onChange={handleChange}
                        accept={parsedExtentions()}
                    />
                </label>
            </div> 
            
            {errors.map(error => <p className="text-red-500 text-sm">{error}</p>)}
        </div>
    )
}

export default FileInput;