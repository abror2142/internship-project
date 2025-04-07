import { useEffect, useState } from "react";
import OutsideCickDetector from "../../../hooks/useOutsideClickDetector";
import { File } from "./FileView";
import { Formik, Field, Form } from "formik";
import CreatableSelect from 'react-select/creatable';
import { getTags } from "../../../utils/api";
import { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { customStyles } from "./Filters";
import { useTheme } from "../../../hooks/useTheme";

export interface Tag {
    label: string;
    value: string;
    __isNew__?: boolean;
}

function FileInfoModal({setShowInfo, file, modalMode='show'}: {setShowInfo: Dispatch<SetStateAction<boolean>>, file: File, modalMode: string}) {
    const [options, setOptions] = useState([]);
    const [mode, setMode] = useState(modalMode)
    const [selected, setSelected] = useState(file.tags.map((tag) => ({label: tag.name, value: tag.name})))
    const { isDarkMode } = useTheme();

    const fetchTags = async () => {
        try {
            const resp = await getTags();
            setOptions(resp.data.map((tag => ({label: tag.name, value: tag.name}))));
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(mode === 'edit') {
            fetchTags();
        }
    }, [mode])

    const handleChange = (value) => {
        setSelected(value);
    }

    return (
        <OutsideCickDetector toggler={setShowInfo}>
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-gray-950/80">
                <div className="relative space-y-4 bg-white dark:bg-dark-card-light border dark:border-dark-border px-6 py-4 rounded-lg shadow-lg">
                <Formik
                    initialValues={{
                        name: file.name,
                        description: file.description,
                        tags: selected
                    }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        alert(JSON.stringify(values, null, 2));
                    }}
                    >
                    <Form
                        className="flex flex-col gap-4 min-w-sm"
                    >
                        <p className="text-2xl text-center dark:text-dark-text-highlighted font-semibold">
                            {mode === 'edit' ? "Edit File" : "File Info"}
                        </p>
                        <div
                            onClick={() => setShowInfo(false)}
                            className="absolute top-4 right-8 text-red-600 text-lg hover:text-red-700"
                        >
                            <FontAwesomeIcon icon={faX} />
                        </div>

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
                                <Field 
                                    id="name" 
                                    name="name" 
                                    placeholder="Jane" 
                                    disabled={mode === 'show'}
                                    className="bg-dark-blue px-3 py-1.5 outline-none"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="description">Description</label>
                                <Field 
                                    id="description" 
                                    name="description" 
                                    disabled={mode === 'show'}
                                    component='textarea'
                                    className="bg-dark-blue px-3 py-1.5 outline-none"
                                />
                            </div>

                            <div>
                                {
                                    mode === 'show' 
                                    ? <div className="flex  gap-2">
                                        {file.tags.map((tag) => {
                                            return (
                                                <div className="px-2 py-0.5 bg-amber-500 rounded-sm text-white">
                                                    {tag.name}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    : mode === 'edit'
                                    ? <CreatableSelect 
                                        isMulti 
                                        options={options} 
                                        value={selected}
                                        onChange={handleChange}
                                        isClearable={false}
                                        styles={customStyles(isDarkMode)}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                    />
                                    : null
                                }
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
                        <div className="flex items-center justify-between">
                            <div className="text-red-500 hover:underline hover:text-red-600">Delete</div>
                            {
                                mode === 'show' 
                                && <div 
                                className="text-indigo-500 hover:underline hover:text-indigo-600"
                                onClick={() => setMode('edit')}
                                >
                                    Edit
                                </div>
                            }
                            {
                                mode === 'edit' 
                                && <button 
                                    type="submit" 
                                    className="bg-indigo-500 text-white rounded-sm px-3 py-1 max-w-min"
                                >Save</button>
                            }
                        </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </OutsideCickDetector>
    );
}

export default FileInfoModal;