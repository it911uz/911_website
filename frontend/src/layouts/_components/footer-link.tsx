import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

export const FooterLink = ({ href, children }: Props) => (
    <Link
        href={href}
        className="transition-colors duration-200 text-lg font-medium"
    >
        {children}
    </Link>
);

interface Props { href: string, children: ReactNode }