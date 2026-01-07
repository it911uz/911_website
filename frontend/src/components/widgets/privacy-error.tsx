import { ShieldAlert } from "lucide-react";

export const PrivacyError = () => {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
            <div className="flex max-w-md flex-col items-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                    <ShieldAlert className="h-7 w-7 text-red-600" />
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Нет доступа
                </h1>

                <p className="mt-3 text-base text-gray-500">
                    У вас нет прав для просмотра этой страницы.
                </p>

                <p className="mt-1 text-sm text-gray-400">
                    Если вы считаете, что это ошибка — обратитесь к администратору.
                </p>
            </div>
        </div>
    );
};
