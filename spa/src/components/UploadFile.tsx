import { useState } from "react";
import TagSelection from "./TagSelection";
import FileInput from "./FileInput";
import { Tag } from "./TagSelection";
import { Formik, Form, Field } from "formik";

function UploadFile () {
    const [open, setOpen] = useState(false);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [tags, setTags] = useState<Tag[]>([]);

    return (
        <div>
            <button
                onClick={() => setOpen(prev => !prev)}
            >Upload</button>
            {
                open
                && <Formik
                    initialValues={{
                        name: fileName,
                        description: '',
                        path: fileUrl,
                        tags: tags,
                    }}
                    enableReinitialize
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        alert(JSON.stringify(values, null, 2));
                    }}
                    >
                    <Form>
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                            <div className="bg-white space-y-4 dark:bg-dark-blue p-6 rounded-lg shadow-xl relative dark:text-dark-text">
                                <p className="text-3xl mb-6 font-semibold dark:text-indigo-400 text-center">Upload a File</p>
                                <div className="flex gap-5">
                                    <FileInput setFileUrl={setFileUrl} setFileName={setFileName}/>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="name">File Name:</label>
                                            <Field 
                                                id="name" 
                                                name="name" 
                                                placeholder={fileName}
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
                                        onClick={() => setOpen(false)}
                                        className="px-4 py-1.5 bg-indigo-500 text-white rounded-lg"
                                        >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            }
        </div>
    )
}

export default UploadFile;