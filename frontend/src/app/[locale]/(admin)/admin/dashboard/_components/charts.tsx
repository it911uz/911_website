"use client"

import dynamic from "next/dynamic"
import { useState } from "react"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export const Charts = () => {
    const [chartData] = useState({
        series: [
            {
                name: "Ссылка",
                type: "column",
                data: [14, 20, 25, 15, 25, 28, 38, 46],
            },
            {
                name: "Заявки",
                type: "column",
                data: [11, 30, 31, 40, 41, 49, 65, 85],
            },
            {
                name: "Активность",
                type: "line",
                data: [20, 29, 37, 36, 44, 45, 50, 58],
            },




        ],


        
        options: {
            chart: {
                height: 350,
                type: "line",
                stacked: false,
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: [1, 1, 4],
                curve: "smooth",
            },
            colors: ["#3b82f6", "#10b981", "#f59e0b"],
            title: {
                text: "Аналитика",
                align: "left",
                offsetX: 10,
                style: {
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#374151",
                },
            },
            xaxis: {
                categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
                labels: {
                    style: {
                        colors: "white",
                    },
                },
            },
            yaxis: [
                {
                    title: {
                        text: "Income (kCr)",
                        style: { color: "#3b82f6" },
                    },
                    labels: {
                        style: { colors: "#3b82f6" },
                    },
                },
                {
                    opposite: true,
                    title: {
                        text: "Cashflow (kCr)",
                        style: { color: "#10b981" },
                    },
                    labels: {
                        style: { colors: "#10b981" },
                    },
                },
                {
                    opposite: true,
                    title: {
                        text: "Revenue (kCr)",
                        style: { color: "#f59e0b" },
                    },
                    labels: {
                        style: { colors: "#f59e0b" },
                    },
                },
            ],
            tooltip: {
                theme: "light",
            },
            legend: {
                horizontalAlign: "left",
                offsetX: 10,
                labels: {
                    colors: "#6b7280",
                },
            },
        },
    })

    return (
        <section className="pt-10 px-4 lg:px-6">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm ">
                <Chart
                    options={chartData}
                    series={chartData.series}
                    type="line"
                    height={520}
                />
            </div>
        </section>
    )
}
