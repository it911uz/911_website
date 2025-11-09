export interface Lead {
    created_at: Date;
    updated_at: Date;
    full_name: string;
    email: string;
    phone: string;
    company_name: string;
    company_info: string;
    target_id: null;
    id: number;
    status_id: number | null;
    comments: Comment[];
    status: Status | null;
}

export interface Comment {
    created_at: Date;
    updated_at: Date;
    comment: string;
    id: number;
    lead_id: number;
    user_id: number | null;
    user: User | null;
}

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
}

export interface Status {
    name: string;
    hex: string;
    id: number;
    level: number;
    can_delete: boolean;
    can_edit: boolean;
}


export interface LeadComment {
    created_at: Date;
    updated_at: Date;
    comment: string;
    id: number;
    lead_id: number;
    user_id: number;
    user: User;
}


export interface LeadFile {
    id: string;
    filename: string;
    url: string;
}