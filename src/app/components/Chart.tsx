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
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import CandlestickChart from "./CandlestickChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartProps {
    type: "line" | "bar" | "mixed" | "doubleAxis" | "candlestick";
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
    return (
        <div className="mt-8">
            {type === "line" && <Line data={data} />}
            {type === "bar" && <Bar data={data} />}
            {type === "mixed" && <Bar data={{ ...data, datasets: data.datasets }} />}
            {type === "doubleAxis" && <Line data={doubleAxisData} />}
            {type === "candlestick" && <CandlestickChart />}
        </div>
    );
};

export default Chart;
