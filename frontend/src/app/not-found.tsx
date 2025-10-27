import { AlertOctagon } from "lucide-react";
import Link from "next/link";
import { Routers } from "@/configs/router.config";

export default function NotFound() {
	return (
		<html lang="ru">
			<head>
				<title>404 - Page Not Found</title>
			</head>
			<body className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
				<main className="mx-auto w-full max-w-xl space-y-10 text-center rounded-2xl bg-white p-10 shadow-2xl shadow-red-50">
					<div className="animate-pulse">
						<AlertOctagon className="mx-auto h-20 w-20 text-red-500" />
					</div>

					<div className="space-y-4">
						<h2 className="text-6xl font-extrabold text-gray-900 tracking-tight">
							404
						</h2>
						<p className="text-3xl font-semibold text-gray-800">
							Глобальная 404
						</p>
						<p className="mx-auto max-w-md text-lg text-gray-500">
							Страница, которую вы ищете, не найдена. Возможно, она была удалена
							или вы ввели неверный адрес.
						</p>
					</div>

					<Link
						href={Routers.home}
						className="inline-flex transform items-center justify-center rounded-lg bg-red-600 px-8 py-3 text-base font-semibold text-white shadow-xl transition-all duration-300 hover:bg-red-700 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-red-300"
					>
						Вернуться на главную
					</Link>
				</main>
			</body>
		</html>
	);
}
