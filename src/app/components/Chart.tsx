"use client";

import React from "react";
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
    ChartOptions,
    ChartData,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartProps {
    type: "line" | "bar" | "mixed" | "doubleAxis";
}

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const data = {
    labels,
    datasets: [
        {
            label: "Sales ($)",
            data: [300, 400, 350, 600, 500, 700, 650],
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.5)",
            type: "line" as const,
        },
        {
            label: "Revenue ($)",
            data: [200, 300, 250, 400, 350, 500, 450],
            backgroundColor: "green",
        },
    ],
};

const doubleAxisData = {
    labels,
    datasets: [
        {
            label: "Sales",
            data: [100, 200, 150, 300, 250, 400, 350],
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.5)",
            yAxisID: "y",
        },
        {
            label: "Revenue",
            data: [150, 250, 200, 350, 300, 450, 400],
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            yAxisID: "y1",
        },
    ],
};

const Chart: React.FC<ChartProps> = ({ type }) => {
    const options: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
        scales: type === "doubleAxis"
            ? {
                y: {
                    type: "linear",
                    position: "left" as "left", // Explicitly type it
                },
                y1: {
                    type: "linear",
                    position: "right" as "right",
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            }
            : {
                y: {
                    type: "linear",
                },
            },
    };
    const barData: ChartData<"bar", number[], string> = {
        labels: data.labels,
        datasets: data.datasets.filter((dataset) => dataset.type !== "line"), 
    };
    const barOptions: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };


    return (
        <div className="chart-container">
            {type === "line" && <Line data={data} options={options} />}
            {type === "bar" && <Bar data={barData} options={barOptions} />}
            {type === "mixed" && <Bar data={{ ...data, datasets: data.datasets }} options={options} />}
            {type === "doubleAxis" && <Line data={doubleAxisData} options={options} />}
        </div>
    );
};

export default Chart;