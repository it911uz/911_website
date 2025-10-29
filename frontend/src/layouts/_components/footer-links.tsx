import type { ReactNode } from "react";

export const FooterLinks = ({ title, children }: Props) => (
    <div className="flex flex-col space-y-4">
        <h4 className="text-lg font-semibold tracking-wide">
            {title}
        </h4>
        <nav className="flex flex-col space-y-2">
            {children}
        </nav>
    </div>
);

interface Props { title: string, children: ReactNode }