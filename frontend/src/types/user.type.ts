import type { Comment } from "./leads.type";
import type { Task } from "./tasks.type";

export interface User {
    full_name: string;
    username: string;
    email: string;
    phone_number: null;
    role_id: number;
    id: number;
    is_superuser: boolean;
    role: Role;
}

export interface Role {
    name: string;
    id: number;
    permissions: Permission[];
}

export interface Permission {
    id: number;
    name: string;
    codename: string;
}


export interface UserDetail {
    id: number;
    phone_number: null | string;
    hashed_password: string;
    role_id: number;
    updated_at: Date;
    full_name: string;
    username: string;
    email: string;
    is_superuser: boolean;
    created_at: Date;
    deleted_at: null;
    role: Role;
    lead_comments: Comment[];
    tasks: Task[];
}