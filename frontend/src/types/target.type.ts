export interface Target {
    created_at: Date | null;
    updated_at: Date | null;
    name: string;
    id: string;
    url: string;
    is_active: boolean;
    clicks_count: number;
    leads_count: number;
}

