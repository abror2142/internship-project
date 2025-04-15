import { useEffect, useState } from 'react';

function AutoSuggest ({tags, handleEnter}: {tags: string[], handleEnter: (tag: string) => void}) {
    const [value, setValue] = useState("");
    const [suggested, setSuggested] = useState("");
    
    const getSuggestion = () => {
      const inputValue = value.trim().toLowerCase();
      return inputValue.length === 0
        ? ""
        : tags.filter(tag => tag.toLowerCase().startsWith(inputValue)).sort((a:string, b:string) => a.length - b.length)[0];
    };

    useEffect(() => {
        const fullWord = getSuggestion();
        if(fullWord) {
            const part = fullWord.slice(value.length);
            setSuggested(part);
        } else {
            setSuggested("")
        }
    }, [value])

    const handleKeydown = (e) => {
        if(e.key === 'Tab' || e.key === 'Enter'){
            e.preventDefault();
            const tagName = value+suggested;
            if(tags.includes(tagName)){
                handleEnter(tagName);
            }
            setValue("");
            setSuggested("");
        }
    }

  return (
    <div className='rounded-md'>
        <div className='relative max-w-min py-1  rounded-sm min-w-20'>
            <input 
                className='relative max-w-min outline-none field-sizing-content min-w-[20px] z-10'
                onChange={(e) => setValue(e.target.value)}
                id='tag-input'
                onKeyDown={handleKeydown}
                value={value}
                autoComplete='off'
                placeholder='type...'
            />
            {
                suggested 
                && <p className='absolute top-1/2 py-1 pr-3 transform -translate-y-1/2 rounded-sm'>
                    <span className='text-transparent'>{value}</span>
                    <span className=' text-gray-500'>
                        {suggested}
                    </span>
                </p>
            }
        </div>
    </div>
  );
};

export default AutoSuggest;;
