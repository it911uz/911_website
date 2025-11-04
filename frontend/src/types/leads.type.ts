export interface Lead {
    full_name: string;
    email: string;
    phone: string;
    company_name: string;
    company_info: string;
    target_id: null | string;
    id: number;
    status_id: number;
    comments: string[];
    status: Status;
}

export interface Status {
    name: string;
    hex: string;
    id: number;
    level: number;
}
