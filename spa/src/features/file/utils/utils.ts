import { Tag } from "../../shared/types/fileTypes";

export const tagsToOptions = (tags: Tag[]) => {
    return tags.map(tag => ({label: tag.name, value: tag.name}));
}

export const parseSettings = (settings: Setting[]) => {
    const storage = settings.find(setting => setting.key === 'storage')?.value;
    const fileSizeLimit = settings.find(setting => setting.key === 'file_size_limit')?.value;
    const storageSizeLimit = settings.find(setting => setting.key === 'storage_size_limit')?.value;
    return {storage, fileSizeLimit, storageSizeLimit};
}