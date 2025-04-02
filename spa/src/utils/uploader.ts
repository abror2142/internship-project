import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 as uuid4 } from "uuid";

export const uploadFile = async (file: File) => {
    const fileRef = ref(storage, `files/${file.name + uuid4()}`);
    try {
        const snapshot = await uploadBytes(fileRef, file);
        const fileUrl = await getDownloadURL(snapshot.ref);
        return fileUrl;
    }catch(e) {
        console.log("Error while uploading file!", e);
        return null;
    }
}

export const deleteFile = async (fileUrl: string) => {
    const fileRef = ref(storage, fileUrl);
    try{
        await deleteObject(fileRef);
        return null;
    }catch(e) {
        console.log('Error while deleting file!', e);
        return fileUrl;
    }
}