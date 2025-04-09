import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { getTypes } from "../../utils/api";
import * as Yup from "yup";
import { createExtension } from "../../utils/api";
import { customStyles } from "../user/home/Filters";
import { useTheme } from "../../hooks/useTheme";

type Type = {
    id: number;
    name: string;
}

type Option = {
    label: string;
    value: number;
}

const ExtentionSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    type_id: Yup.string()
      .required('Required'),
    image: Yup.string(),
});

function CreatableExtension () {
    const [options, setOption] = useState<Option[]>([]);
    const [type, setType] = useState<number | null>(null);
    const { isDarkMode } = useTheme();
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (json: string) => {
        try {
            const resp = await createExtension(json);
            console.log(resp.data);
        } catch(e) {
            console.log(e);
        }
    }

    const fetchTypes = async() => {
        try {   
            const resp = await getTypes();
            const data:Type[] = resp.data;
            setOption(data.map((type) => ({label: type.name, value: type.id})));
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchTypes();
    }, [])

    const handleChange = (e) => {
        const fileInput = e.target.files[0];
        if(fileInput) {
            setFile(fileInput);
        }
    }  
    
    const handleUpload = async () => {
        
    }

    useEffect(() => {
        if(file){
            handleUpload();
        }
    }, [file])

    return (
        <Formik
            initialValues={{
                name: "",
                type_id: type,
                image: ""
            }}
            validationSchema={ExtentionSchema}
            onSubmit={async (values) => {
                const json = JSON.stringify(values);
                handleSubmit(json);
            }}
        >
            <Form 
                className="flex items-center gap-4 dark:bg-dark-blue 
                    px-4 py-2 rounde-md dark:text-dark-text rounded-md"
            >
                <Field 
                    id="name" 
                    name="name" 
                    placeholder="Name" 
                    className="outline-none dark:bg-dark-bg px-2 py-1 max-w-40 rounded-sm"
                />
                
                <div>
                    <label htmlFor="image">
                        <FontAwesomeIcon icon={faImage} />
                    </label>
                    <input id="image" type="file" className="hidden" onChange={handleChange}/>
                </div>
                
                <Select 
                    styles={customStyles(isDarkMode)}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={options}
                    onChange={(e) => setType(e?.value || null)}
                    placeholder="Type"
                />

                <button type="submit" className="text-xl text-amber-300">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </Form>
        </Formik>
    )
}

export default CreatableExtension;