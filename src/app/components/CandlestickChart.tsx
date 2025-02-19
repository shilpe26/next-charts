"use client";

import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const CandlestickChart = () => {
    const [chartOptions] = useState<ApexOptions>({
        chart: { type: "candlestick", height: 400 },
        title: { text: "", align: "left" },
        plotOptions: {
            candlestick: {
                colors: { upward: "#00E396", downward: "#FF4560" },
            },
        },
        xaxis: { type: "datetime" },
        yaxis: { show: true },
    });

    const [chartSeries, setChartSeries] = useState([{ data: [] }]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
                );
                if (!response.ok) throw new Error("Failed to fetch data");

                const data = await response.json();

                const transformedData = data.prices.map((price: number[], index: number) => {
                    if (index < 4) return null;
                    return {
                        x: new Date(price[0]).getTime(),
                        y: [
                            data.prices[index - 3][1],
                            Math.max(...data.prices.slice(index - 3, index + 1).map(p => p[1])),
                            Math.min(...data.prices.slice(index - 3, index + 1).map(p => p[1])),
                            price[1],
                        ],
                    };
                }).filter(Boolean);

                setChartSeries([{ data: transformedData }]);
            } catch (error) {
                console.error("Error fetching candlestick data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="candlestick"
                height={400}
            />
        </div>
    );
};

export default CandlestickChart;
