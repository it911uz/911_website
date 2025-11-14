"use client";

import { useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const MultiSelect = ({ items, onValueChange, placeholder, defaultValue }: MultiSelectProps) => {
    const [values, setValues] = useState<string[]>(defaultValue ?? []);

    useEffect(() => {
        if (defaultValue) setValues(defaultValue);
    }, [defaultValue]);

    const toggleValue = (value: string) => {
        setValues((prev) => {
            const exists = prev.includes(value);
            const next = exists ? prev.filter((v) => v !== value) : [...prev, value];
            setTimeout(() => {
                onValueChange(next);
            }, 0);
            return next;
        });
    };

    return (
        <Select>
            <SelectTrigger size="lg" className="w-72">
                <SelectValue>
                    {values.length
                        ? `${values.length} выбрано`
                        : placeholder || "Выберите"}
                </SelectValue>
            </SelectTrigger>

            <SelectContent className="max-h-64">
                {items.length ? (
                    items.map((item) => {
                        const id = String(item.value);
                        const selected = values.includes(id);

                        return (
                            <SelectItem
                                key={id}
                                value={id}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleValue(id);
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selected}
                                        readOnly
                                        className="h-4 w-4"
                                    />
                                    {item.label}
                                </div>
                            </SelectItem>
                        );
                    })
                ) : (
                    <p className="px-3 py-2 text-sm text-muted-foreground">Нет данных</p>
                )}
            </SelectContent>
        </Select>
    );
};

interface MultiSelectProps {
    items: { value: string | number; label: string }[];
    onValueChange(value: string[]): void;
    placeholder?: string;
    defaultValue?: string[];
}
