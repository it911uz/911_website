import { Frown } from "lucide-react";

export const ServerNoData = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-6 gap-6">
            <div className="relative mb-4">
                <div className="absolute -inset-4 rounded-full bg-red-500/10 blur-xl" />
                <Frown className="relative size-14 text-red-500 drop-shadow-lg animate-pulse" />
            </div>

            <h2 className="text-xl font-semibold text-foreground mb-2">
                Ошибка сервера
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm">
                Произошла ошибка при загрузке данных. Попробуйте обновить страницу или
                проверить соединение.
            </p>

            <button
                onClick={() => window.location.reload()}
                className="mt-6 px-4 py-2 rounded-lg bg-red-500/80 hover:bg-red-600 text-white font-medium transition-all shadow-md hover:shadow-lg"
            >
                Повторить попытку
            </button>
        </div>
    );
};
