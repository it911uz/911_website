export interface TaskStatus {
    name: string;
    is_completed: boolean;
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
