import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TrendingDown, TrendingUp } from "lucide-react"

export const Cards = () => {
    return (
        <section className="space-y-8 w-full">
            <header className="px-4 lg:px-6">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Главная
                </h2>
                <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                    Просмотр и анализ данных на основе вашего сайта
                </p>
            </header>

            <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 xl:grid-cols-4 lg:px-6">
                <Card className="bg-linear-to-t from-blue-50 to-white border shadow-sm transition hover:shadow-md">
                    <CardHeader className="space-y-2">
                        <CardDescription>Общий доход</CardDescription>
                        <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-2xl sm:text-3xl">1 250 $</CardTitle>
                            <CardAction>
                                <Badge
                                    variant="outline"
                                    className="flex items-center gap-1 border-green-300 text-green-600"
                                >
                                    <TrendingUp className="h-4 w-4" />
                                    +12,5%
                                </Badge>
                            </CardAction>
                        </div>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                        <div className="flex items-center gap-1 font-medium">
                            Рост в текущем месяце
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-muted-foreground">
                            Посещения за последние 6 месяцев
                        </span>
                    </CardFooter>
                </Card>

                <Card className="bg-linear-to-t from-red-50 to-white border shadow-sm transition hover:shadow-md">
                    <CardHeader className="space-y-2">
                        <CardDescription>Новые клиенты</CardDescription>
                        <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-2xl sm:text-3xl">1 234</CardTitle>
                            <CardAction>
                                <Badge
                                    variant="outline"
                                    className="flex items-center gap-1 border-red-300 text-red-600"
                                >
                                    <TrendingDown className="h-4 w-4" />
                                    -20%
                                </Badge>
                            </CardAction>
                        </div>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                        <div className="flex items-center gap-1 font-medium">
                            Снижение на 20% за период
                            <TrendingDown className="h-4 w-4 text-red-600" />
                        </div>
                        <span className="text-muted-foreground">
                            Требуется улучшение привлечения
                        </span>
                    </CardFooter>
                </Card>

                <Card className="bg-linear-to-t from-green-50 to-white border shadow-sm transition hover:shadow-md">
                    <CardHeader className="space-y-2">
                        <CardDescription>Активные аккаунты</CardDescription>
                        <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-2xl sm:text-3xl">45 678</CardTitle>
                            <CardAction>
                                <Badge
                                    variant="outline"
                                    className="flex items-center gap-1 border-green-300 text-green-600"
                                >
                                    <TrendingUp className="h-4 w-4" />
                                    +12,5%
                                </Badge>
                            </CardAction>
                        </div>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                        <div className="flex items-center gap-1 font-medium">
                            Высокая удерживаемость пользователей
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-muted-foreground">
                            Вовлечённость превышает цели
                        </span>
                    </CardFooter>
                </Card>

                <Card className="bg-linear-to-t from-emerald-50 to-white border shadow-sm transition hover:shadow-md">
                    <CardHeader className="space-y-2">
                        <CardDescription>Темп роста</CardDescription>
                        <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-2xl sm:text-3xl">4,5%</CardTitle>
                            <CardAction>
                                <Badge
                                    variant="outline"
                                    className="flex items-center gap-1 border-green-300 text-green-600"
                                >
                                    <TrendingUp className="h-4 w-4" />
                                    +4,5%
                                </Badge>
                            </CardAction>
                        </div>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                        <div className="flex items-center gap-1 font-medium">
                            Стабильное увеличение показателей
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-muted-foreground">
                            Соответствует прогнозам роста
                        </span>
                    </CardFooter>
                </Card>
            </div>
        </section>
    )
}
