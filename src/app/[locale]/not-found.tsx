import { getTranslations } from "next-intl/server";
import { Routers } from "@/configs/router.config";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
	const t = await getTranslations("ErrorPage");

	return (
		<main className="flex min-h-screen items-center justify-center bg-gray-50 p-6 sm:p-12">
			<div className="space-y-8 p-10 text-center rounded-2xl bg-white shadow-xl max-w-lg w-full">
				<h2 className="text-8xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-red-500 to-red-700 select-none drop-shadow-lg md:text-9xl">
					404
				</h2>

				<div className="space-y-3">
					<p className="text-2xl font-semibold text-gray-800 md:text-3xl">
						{t("notFound")}
					</p>
					<p className="text-base text-gray-500">{t("description")}</p>
				</div>

				<Link
					href={Routers.home}
					className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
				>
					{t("goHomePage")}
				</Link>
			</div>
		</main>
	);
}
