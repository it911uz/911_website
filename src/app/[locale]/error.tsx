"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function AppErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const t = useTranslations("ErrorPage");

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 sm:p-12">
			<div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-8 shadow-2xl shadow-red-100 sm:p-10">
				<div className="flex flex-col items-center justify-center text-center">
					<div className="mb-6 rounded-full bg-red-50 p-4">
						<AlertTriangle className="h-10 w-10 text-red-600" />
					</div>
					<h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900">
						{t("error")}
					</h2>
					<p className="mx-auto mb-6 max-w-md text-base text-gray-500">
						{t("serverError")}
					</p>

					<p className="mx-auto mb-8 max-w-md rounded-md bg-gray-50 p-3 text-sm font-mono text-gray-700">
						{error.message}
					</p>

					<button
						onClick={reset}
						type="button"
						className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800"
					>
						<RefreshCw className="mr-2 h-5 w-5" />
						<span>{t("tryAgain")}</span>
					</button>
				</div>
			</div>
		</div>
	);
}
