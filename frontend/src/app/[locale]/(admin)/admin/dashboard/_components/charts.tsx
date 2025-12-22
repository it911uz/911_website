"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"
import type { ApexOptions } from "apexcharts"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export const Charts = () => {
    const options: ApexOptions = useMemo(
        () => ({
            chart: {
                type: "line",
                stacked: false,
                toolbar: {
                    show: true,
                    autoSelected: "zoom",
                },
                zoom: {
                    enabled: true,
                    type: "x",
                },
                selection: {
                    enabled: true,
                    xaxis: {
                        min: new Date("2024-12-03").getTime(),
                        max: new Date("2024-12-15").getTime(),
                    },
                },
            },
            dataLabels: { enabled: false },
            stroke: { width: [1, 1, 3], curve: "smooth" },
            colors: ["#3b82f6", "#10b981", "#f59e0b"],
            title: {
                text: "Аналитика",
                align: "left",
            },
            xaxis: {
                type: "datetime",
            },
            tooltip: {
                x: { format: "dd MMM" },
            },
            legend: {
                horizontalAlign: "left",
            },
        }),
        [],
    )

    const series = useMemo(
        () => [
            {
                name: "Переходы",
                type: "column" as const,
                data: [
                    { x: "2024-12-01", y: 12 },
                    { x: "2024-12-02", y: 18 },
                    { x: "2024-12-03", y: 25 },
                    { x: "2024-12-04", y: 14 },
                    { x: "2024-12-05", y: 22 },
                    { x: "2024-12-06", y: 30 },
                    { x: "2024-12-07", y: 28 },
                    { x: "2024-12-08", y: 35 },
                    { x: "2024-12-09", y: 40 },
                    { x: "2024-12-10", y: 38 },
                    { x: "2024-12-11", y: 45 },
                    { x: "2024-12-12", y: 42 },
                    { x: "2024-12-13", y: 50 },
                    { x: "2024-12-14", y: 48 },
                    { x: "2024-12-15", y: 55 },
                ],
            },
            {
                name: "Заявки",
                type: "column" as const,
                data: [
                    { x: "2024-12-01", y: 5 },
                    { x: "2024-12-02", y: 7 },
                    { x: "2024-12-03", y: 9 },
                    { x: "2024-12-04", y: 6 },
                    { x: "2024-12-05", y: 8 },
                    { x: "2024-12-06", y: 10 },
                    { x: "2024-12-07", y: 11 },
                    { x: "2024-12-08", y: 13 },
                    { x: "2024-12-09", y: 15 },
                    { x: "2024-12-10", y: 14 },
                    { x: "2024-12-11", y: 16 },
                    { x: "2024-12-12", y: 15 },
                    { x: "2024-12-13", y: 18 },
                    { x: "2024-12-14", y: 17 },
                    { x: "2024-12-15", y: 20 },
                ],
            },
            {
                name: "Активность",
                type: "line" as const,
                data: [
                    { x: "2024-12-01", y: 20 },
                    { x: "2024-12-02", y: 22 },
                    { x: "2024-12-03", y: 26 },
                    { x: "2024-12-04", y: 24 },
                    { x: "2024-12-05", y: 28 },
                    { x: "2024-12-06", y: 30 },
                    { x: "2024-12-07", y: 32 },
                    { x: "2024-12-08", y: 35 },
                    { x: "2024-12-09", y: 38 },
                    { x: "2024-12-10", y: 36 },
                    { x: "2024-12-11", y: 40 },
                    { x: "2024-12-12", y: 42 },
                    { x: "2024-12-13", y: 45 },
                    { x: "2024-12-14", y: 47 },
                    { x: "2024-12-15", y: 50 },
                ],
            },
        ],
        [],
    )

    return (
        <section className="px-4 lg:px-6 w-full">
            <div className="rounded-xl border border-gray-02 bg-white p-4 shadow-sm sm:p-6">
                <Chart options={options} series={series} type="line" height={420} />
            </div>
        </section>
    )
}
