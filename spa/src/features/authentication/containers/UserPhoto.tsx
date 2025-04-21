import React, { useEffect, useState } from "react";
import { useAuth } from "../../shared/hooks/useAuth";
import { uploadFile } from "../../shared/utils/uploader";
import { updateUserImage } from "../../shared/api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faImage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function UserPhoto ({setStep}: {setStep: React.Dispatch<React.SetStateAction<number>>}) {
    const { user, refreshUser } = useAuth();
    const [file, setFile] = useState<File | null>(null);

    const setUserImage = async (url: string) => {
        try {
            const json = JSON.stringify({image: url});
            await updateUserImage(json);
            refreshUser();
        } catch(e) {
            console.log(e);
        }
    }

    const handleUpload =  async () => {
        if(file) {
            try {
                const url = await uploadFile(file);
                if(url) {
                    setUserImage(url);
                } else {
                    setFile(null);
                }
            } catch(e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        handleUpload();
    }, [file]);

    return (
        <div className="flex flex-col items-center justify-center gap-4 ">
            <Link to={'/my-drive'} className="text-end w-full text-red-500 hover:text-red-600">
                skip all
            </Link>
                <p className="text-center text-2xl dark:text-dark-text-highlighted">Welcome, <span className="text-indigo-500 font-semibold">{user?.name}</span>!</p>
            <div>
                <p className="text-center text-xl">You can upload your Photo.</p>
            </div>
            {
                user?.image
                ? <div className="group relative w-42 h-42 rounded-full border-2 border-gray-300 border-dashed flex items-center justify-center">
                    <img src={user?.image} className="rounded-full w-40 h-40"/>
                    <label htmlFor="dropzone-file" className="hidden max-w-min px-4 rounded-lg group-hover:flex absolute z-10 -bottom-1 items-center justify-center py-1.5 text-2xl bg-dark-blue hover:bg-blue-900 w-full">
                        <FontAwesomeIcon icon={faImage} />
                    </label>
                    <input id="dropzone-file" type="file" className="hidden" onChange={(e) => e.target.files && setFile(e.target.files?.[0])} />
                </div>
                : <div className="flex items-center justify-center flex-col">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-40 h-40 rounded-full border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Click to Upload</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={(e) => e.target.files && setFile(e.target.files?.[0])} />
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">(MAX. 400x400px)</p>
                </div> 
            }
            <button onClick={() => setStep(3)} className="bg-indigo-500 hover:bg-indigo-600 text-white max-w-min text-nowrap px-2 py-0.5 rounded-sm ml-auto">
                Next <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    )
}

export default UserPhoto;