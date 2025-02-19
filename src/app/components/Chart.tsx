/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import CandlestickChart from "./CandlestickChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartProps {
    type: "line" | "bar" | "mixed" | "doubleAxis" | "candlestick";
}

const Chart: React.FC<ChartProps> = ({ type }) => {
    const [chartData, setChartData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [key, setKey] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7");
                const data = await response.json();

                const prices = data.prices.map((entry: any) => entry[1]);
                const labels = data.prices.map((entry: any) => new Date(entry[0]).toLocaleDateString());

                let datasets;

                if (type === "line") {
                    datasets = [
                        {
                            label: "Bitcoin Price (USD)",
                            data: prices,
                            borderColor: "blue",
                            backgroundColor: "rgba(0, 0, 255, 0.5)",
                            type: "line",
                        },
                    ];
                } else if (type === "bar") {
                    datasets = [
                        {
                            label: "Bitcoin Price (USD)",
                            data: prices,
                            backgroundColor: "green",
                        },
                    ];
                } else if (type === "mixed") {
                    datasets = [
                        {
                            label: "Bitcoin Price (Line)",
                            data: prices,
                            borderColor: "blue",
                            backgroundColor: "rgba(0, 0, 255, 0.5)",
                            type: "line",
                        },
                        {
                            label: "Bitcoin Price (Bar)",
                            data: prices,
                            backgroundColor: "orange",
                            type: "bar",
                        },
                    ];
                } else if (type === "doubleAxis") {
                    datasets = [
                        {
                            label: "Bitcoin Price",
                            data: prices,
                            borderColor: "blue",
                            backgroundColor: "rgba(0, 0, 255, 0.5)",
                            yAxisID: "y",
                        },
                        {
                            label: "Market Volume",
                            data: prices.map((p: number) => p * 1.2),
                            borderColor: "red",
                            backgroundColor: "rgba(255, 0, 0, 0.5)",
                            yAxisID: "y1",
                        },
                    ];
                }

                setChartData({
                    labels,
                    datasets,
                });

                setLoading(false);
                setKey(prevKey => prevKey + 1);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [type]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-20">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
        );

    if (!chartData) return <p>No data available</p>;

    return (
        <div className="mt-8">
            {type === "line" && <Line key={key} data={chartData} />}
            {type === "bar" && <Bar key={key} data={chartData} />}
            {type === "mixed" && (
                <>
                    <Line key={key} data={chartData} />
                    <Bar key={key + 1} data={chartData} />
                </>
            )}
            {type === "doubleAxis" && (
                <Line
                    key={key}
                    data={chartData}
                    options={{
                        scales: {
                            y: { type: "linear", position: "left" },
                            y1: { type: "linear", position: "right" },
                        },
                    }}
                />
            )}
            {type === "candlestick" && <CandlestickChart />}
        </div>
    );
};

export default Chart;
