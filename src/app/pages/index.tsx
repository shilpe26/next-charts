/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Select from 'react-select';
import Chart from "../components/Chart";
import CandlestickChart from "../components/CandlestickChart";
import { BsInfoSquareFill } from "react-icons/bs";
import { MdOutlineTableRows } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { FcCandleSticks } from "react-icons/fc";
import { FaSearch } from "react-icons/fa";

type ChartType = "line" | "bar" | "mixed" | "doubleAxis" | "candlestick";
const chartOptions = [
    { value: "line", label: "Line Chart" },
    { value: "bar", label: "Bar Chart" },
    { value: "mixed", label: "Mixed Chart" },
    { value: "doubleAxis", label: "Double Axis Chart" },
    { value: "candlestick", label: "Candlestick Chart" },
];

const ChartVisual = () => {
    const [chartType, setChartType] = useState<"line" | "bar" | "mixed" | "doubleAxis" | "candlestick">("line");
    const [searchTerm, setSearchTerm] = useState('');
    const [drawType, setDrawType] = useState<"draw" | "line" | "rectangle" | "circle" | "pen">("Draw");
    const handleChange = (selectedOption: { value: ChartType; label: string }) => {
        setChartType(selectedOption.value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    const drawOptions = [
        { value: "draw", label: "Draw" },
        { value: "line", label: "Line" },
        { value: "rectangle", label: "Rectangle" },
        { value: "circle", label: "Circle" },
        { value: "pen", label: "Pen" },
    ];

    return (
        <div className="text-center p-5">

            <div className="flex flex-col gap-1 md:gap-0 md:flex-row justify-between border border-gray-300 shadow-lg p-4 rounded">
                <div className="relative w-full md:max-w-48">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search Symbol"
                        className="w-full h-9 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-1 md:gap-8 items-center justify-end w-full">


                    <Select
                        options={chartOptions}
                        onChange={handleChange}
                        className="w-full md:w-48"
                        classNamePrefix="custom-select"
                        placeholder={
                            <div className="flex items-center gap-2">
                                <FcCandleSticks className="text-gray-500" />
                                <span>Chart Type</span>
                            </div>
                        }
                    />
                    <div className="w-full md:w-48 cursor-pointer">
                        <Select
                            options={drawOptions}
                            value={drawOptions.find(option => option.value === drawType)}
                            onChange={(selectedOption) => setDrawType(selectedOption?.value as "line" | "rectangle" | "circle" | "pen")}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder={
                                <div className="flex items-center gap-2 w-full">
                                    <FaPen className="text-gray-500" />
                                    <span>Draw</span>
                                </div>
                            }

                        />
                    </div>

                    <div className="flex justify-between gap-4 w-full md:w-auto">

                        <div className="flex justify-center items-center gap-1 md:gap-4 cursor-pointer w-full md:w-auto">
                            <span><BsInfoSquareFill /></span>Info
                        </div>
                        <div className="flex justify-center items-center gap-1 md:gap-4 cursor-pointer w-full md:w-auto">
                            <span><MdOutlineTableRows /></span>Table View
                        </div>
                    </div>
                </div>
            </div>

            {chartType === "candlestick" ? <CandlestickChart /> : <Chart type={chartType} />}
        </div>
    );
};
export default ChartVisual;
