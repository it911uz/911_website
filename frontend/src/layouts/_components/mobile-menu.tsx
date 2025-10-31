"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { navigation } from "@/const/navigation.const";
import { TargetLinks } from "@/configs/target-links.config";

export const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
    const locale = useLocale();

    const toggleSubmenu = (id: number) => {
        setOpenSubmenu(openSubmenu === id ? null : id);
    };

    return (
        <div className="xl:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-gray-700 hover:text-red-500 transition-colors cursor-pointer"
                aria-label="Открыть меню"
            >
                <Menu className="size-7" />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white shadow-2xl p-6 overflow-y-auto transform transition-transform"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-end mb-8">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-gray-700 hover:text-red-500 transition-colors cursor-pointer"
                                aria-label="Закрыть меню"
                            >
                                <X className="size-7" />
                            </button>
                        </div>

                        <nav className="space-y-4">
                            {navigation.map((item) => (
                                <div key={item.id} className="border-b border-gray-100 last:border-b-0">
                                    {(item.children?.length ?? 0) > 0 ? (
                                        <>
                                            <div
                                                className="flex justify-between items-center py-3 text-lg font-semibold text-gray-800 cursor-pointer hover:text-red-500 transition-colors"
                                                onClick={() => toggleSubmenu(Number(item.id))}
                                            >
                                                {item.name[locale]}
                                                {openSubmenu === item.id ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
                                            </div>
                                            {openSubmenu === item.id && (
                                                <ul className="pl-4 pb-2 space-y-1">
                                                    {item.children?.map((child) => (
                                                        <li key={child.id} onClick={() => setIsOpen(false)}>
                                                            <Link
                                                                className="block py-2 text-base text-gray-600 hover:text-red-500 transition-colors"
                                                                href={child.path ?? "#!"}
                                                            >
                                                                {child.name[locale]}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            className="block py-3 text-lg font-semibold text-gray-800 hover:text-red-500 transition-colors"
                                            href={item.path ?? "#!"}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name[locale]}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </nav>

                        <div className="mt-8 pt-4 border-t border-gray-200">
                            <p className="text-gray-500 text-sm mb-2">Техническая поддержка</p>
                            <a
                                href={`tel:${TargetLinks.phone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl font-bold text-red-600"
                            >
                                +998 (77) 443-33-35
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
