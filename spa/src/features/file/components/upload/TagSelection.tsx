import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { getTags } from '../../../shared/utils/api';
import { customStyles } from '../Filters';

interface Data {
    id: number;
    name: string;
}

export interface Tag {
    label: string;
    value: string;
    __isNew__?: boolean;
}

function TagSelection ({setTags}) {
    const [options, setOptions] = useState<Tag[]>();

    const handleChange = (newValue: Tag[]) => {
        setTags(newValue);
    }

    const fetchTags = async () => {
        try {
            const resp = await getTags();
            const data: Data[] = resp.data;
            const formattedTags = data.map(tag => ({ label: tag.name, value: tag.name }));
            setOptions(formattedTags);
        } catch(e) {
            console.log(e);
        }
    }
    
    useEffect(() => {
        fetchTags();
    }, [])

    return (
        <CreatableSelect 
            styles={customStyles()}
            className="react-select-container"
            classNamePrefix="react-select"
            isMulti 
            options={options}
            onChange={handleChange}
        />
    )
}

export default TagSelection;    