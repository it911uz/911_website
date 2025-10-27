import type { Metadata } from "next";
import { Navigation } from "@/layouts/navigation";

export const metadata: Metadata = {
	title: "IT 911",
	description: "IT 911",
};

const ClientLayout = async ({ children }: LayoutProps<"/">) => {
	return (
		<>
			<Navigation className="sticky top-0 z-50 shrink-0" />

			<main className="flex-1">{children}</main>
		</>
	);
};

export default ClientLayout;
