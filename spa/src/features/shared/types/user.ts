export type User = {
    id: number;
    name: string;
    image: string;
    roles: string[];
    storage: {
        used: number;
        allocated: number;  
    }
}