export interface User {
    id: number;
    name: string;
    image: string;
    roles: string[];
    storage: {
        allocated: number;
        used: number;
    }
}