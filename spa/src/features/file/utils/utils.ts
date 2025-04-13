import { Tag } from "../../shared/types/fileTypes";

export const tagsToOptions = (tags: Tag[]) => {
    return tags.map(tag => ({label: tag.name, value: tag.name}));
}