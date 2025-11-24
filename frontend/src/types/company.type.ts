import type { Service } from "./service.type";

export interface Company {
    name: string;
    info: string;
    status: string;
    phone_number: string;
    id: number;
    contacts: string[];
}


export interface CompanyComment {
    created_at: Date;
    updated_at: Date;
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

export interface CompanySubscription {
    service_id: number;
    start_date: Date;
    end_date: Date;
    payment_type: string;
    price: number;
    next_payment_due: Date;
    id: number;
    service: Service;
}

export interface CompanyPayment {
    amount: string;
    status: string;
    id: number;
}