import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export const Cards = () => {
    return (
        <>
            <div className="px-4 lg:px-6 pt-10">
                <h2 className="text-3xl font-bold ">
                    Главная
                </h2>
                <p className="text-muted-foreground mt-1">
                    Просмотр и анализ данных на основе вашего сайта
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 sm:grid-cols-2 xl:grid-cols-4 pt-10">
                <Card className="bg-linear-to-t from-blue-50 to-white shadow-sm border border-gray-200">
                    <CardHeader>
                        <CardDescription className="text-gray-500">Total Revenue</CardDescription>
                        <CardTitle className="text-3xl font-semibold text-gray-900">$1,250.00</CardTitle>
                        <CardAction>
                            <Badge variant="outline" className="flex items-center gap-1 text-green-600 border-green-300">
                                <TrendingUp className="w-4 h-4" />
                                +12.5%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="flex gap-2 font-medium text-gray-800">
                            Trending up this month <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="text-gray-500">Visitors for the last 6 months</div>
                    </CardFooter>
                </Card>

                <Card className="bg-linear-to-t from-red-50 to-white shadow-sm border border-gray-200">
                    <CardHeader>
                        <CardDescription className="text-gray-500">New Customers</CardDescription>
                        <CardTitle className="text-3xl font-semibold text-gray-900">1,234</CardTitle>
                        <CardAction>
                            <Badge variant="outline" className="flex items-center gap-1 text-red-600 border-red-300">
                                <TrendingDown className="w-4 h-4" />
                                -20%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="flex gap-2 font-medium text-gray-800">
                            Down 20% this period <TrendingDown className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="text-gray-500">Acquisition needs attention</div>
                    </CardFooter>
                </Card>

                <Card className="bg-linear-to-t from-green-50 to-white shadow-sm border border-gray-200">
                    <CardHeader>
                        <CardDescription className="text-gray-500">Active Accounts</CardDescription>
                        <CardTitle className="text-3xl font-semibold text-gray-900">45,678</CardTitle>
                        <CardAction>
                            <Badge variant="outline" className="flex items-center gap-1 text-green-600 border-green-300">
                                <TrendingUp className="w-4 h-4" />
                                +12.5%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="flex gap-2 font-medium text-gray-800">
                            Strong user retention <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="text-gray-500">Engagement exceed targets</div>
                    </CardFooter>
                </Card>

                <Card className="bg-linear-to-t from-emerald-50 to-white shadow-sm border border-gray-200">
                    <CardHeader>
                        <CardDescription className="text-gray-500">Growth Rate</CardDescription>
                        <CardTitle className="text-3xl font-semibold text-gray-900">4.5%</CardTitle>
                        <CardAction>
                            <Badge variant="outline" className="flex items-center gap-1 text-green-600 border-green-300">
                                <TrendingUp className="w-4 h-4" />
                                +4.5%
                            </Badge>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="flex gap-2 font-medium text-gray-800">
                            Steady performance increase <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="text-gray-500">Meets growth projections</div>
                    </CardFooter>
                </Card>
            </div>

        </>
    )
}
