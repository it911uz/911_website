export interface Target {
    created_at: Date;
    updated_at: Date;
    name: string;
    id: string;
    url: string;
    is_active: boolean;
    clicks_count: number;
    leads_count: number;
}
