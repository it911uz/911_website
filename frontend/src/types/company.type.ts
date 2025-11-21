export interface Company {
    name: string;
    info: string;
    status: string;
    phone_number: string;
    id: number;
    contacts: string[];
}


export interface CompanyComment {
    comment: string;
    id: number;
}

export interface CompanyContact {
    full_name: string;
    phone_number: string;
    email: string;
    relation: string;
    id: number;
}