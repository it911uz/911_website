import type { Comment } from "./leads.type";
import type { Task } from "./tasks.type";

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