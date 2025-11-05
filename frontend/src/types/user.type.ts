export interface User {
    full_name: string;
    username: string;
    email: string;
    is_superuser: boolean;
    role_id: number;
    id: number;
    role: Role;
}

export interface Role {
    name: string;
    id: number;
    permissions: unknown[];
}
