import { deleteFile } from "../../shared/utils/api";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

function FileDelete ({fileId}: {fileId: number}) {

    const handleDelete = async () => {
        try {
            const resp = await deleteFile(fileId);
            console.log(resp);
        } catch(e) {
            console.log(e);
        }
    }
    
    return (
        <div 
            className="text-red-500 hover:underline hover:text-red-600"
            onClick={() => {
                confirmAlert({
                    title: 'Confirm to delete',
                    message: 'Are you sure to delete this file.',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => handleDelete()
                        },
                        {
                            label: 'No'
                        }
                    ]
                });
            }}
        >   Delete
        </div>
      
    )
}

export default FileDelete;