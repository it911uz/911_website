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
    id: number;
    name: string;
    description: string;
    deadline: Date;
    status_id: number;
    users: number[];
    tags: number[];
}
