"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";


export const SwitchLang = () => {
    const pathname = usePathname();
    const locale = useLocale();

    return <div className="flex gap-2 items-center">
        <Link
            href={pathname}
            locale={"ru"}
            className={cn("text-base lg:text-xl transition-colors hover:text-red-500", { "font-bold text-red-500": locale === "ru", "text-gray-500": locale !== "ru" })}
        >
            РУС
        </Link>

        <div className="w-px h-4 bg-gray-300" />

        <Link
            href={pathname}
            locale={"uz"}
            className={cn("text-base lg:text-xl transition-colors hover:text-red-500", { "font-bold text-red-500": locale === "uz", "text-gray-500": locale !== "uz" })}
        >
            O'ZB
        </Link>

        <div className="w-px h-4 bg-gray-300" />

        <Link
            href={pathname}
            locale={"en"}
            className={cn("text-base lg:text-xl transition-colors hover:text-red-500", { "font-bold text-red-500": locale === "en", "text-gray-500": locale !== "en" })}
        >
            ENG
        </Link>
    </div>
}