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