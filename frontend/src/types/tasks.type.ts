import type { User } from "./user.type";

export interface TaskStatus {
    name: string;
    hex: string;
    is_completed: boolean;
    id: number;
    order: number;
}

export interface Tag {
    name: string;
    hex: string;
    id: number;
}

export interface Task {
    created_at: Date;
    updated_at: Date;
    name: string;
    description: string;
    deadline: Date;
    id: number;
    status_id: number;
    status: TaskStatus;
    tags: Tag[];
    users: User[];
    comments: Comment[];
    files: TaskFile[];
}

export interface TaskComment {
    created_at: Date;
    updated_at: Date;
    comment: string;
    id: number;
    user_id: number;
    task_id: number;
    user: User;
}

export interface TaskFile {
    id: string;
    filename: string;
    url: string;
}
