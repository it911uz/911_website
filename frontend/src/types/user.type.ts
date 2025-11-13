export interface User {
    full_name: string;
    username: string;
    email: string;
    is_superuser: boolean;
    role_id: number;
    id: number;
    role: Role;
    phone_number: string;
}

interface Role {
    name: string;
    id: number;
    permissions: string[];
}
