"use client";

import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const CandlestickChart = () => {
    const [chartOptions] = useState<ApexOptions>({
        chart: {
            type: "candlestick",
            height: 400,
        },
        title: {
            text: "",
            align: "left",
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: "#00E396",
                    downward: "#FF4560",
                },
            },
        },
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            show: true,
        },
    });

    const [chartSeries] = useState([
        {
            data: [
                { x: new Date("2024-02-01").getTime(), y: [100, 110, 95, 105] },
                { x: new Date("2024-02-02").getTime(), y: [105, 98, 95, 96] },
                { x: new Date("2024-02-03").getTime(), y: [96, 105, 90, 102] },
                { x: new Date("2024-02-04").getTime(), y: [102, 110, 100, 107] },
                { x: new Date("2024-02-05").getTime(), y: [107, 100, 98, 99] },
                { x: new Date("2024-02-06").getTime(), y: [99, 104, 96, 101] },
                { x: new Date("2024-02-07").getTime(), y: [101, 98, 94, 96] },
                { x: new Date("2024-02-08").getTime(), y: [96, 105, 95, 102] },
                { x: new Date("2024-02-09").getTime(), y: [102, 99, 96, 97] },
                { x: new Date("2024-02-10").getTime(), y: [97, 100, 94, 95] },
                { x: new Date("2024-02-11").getTime(), y: [95, 103, 93, 100] },
            ],
        },
    ]);

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
