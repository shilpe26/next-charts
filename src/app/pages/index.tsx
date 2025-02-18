import React, { useState } from "react";
import Chart from "../components/Chart";

const ChartVisual = () => {
  const [chartType, setChartType] = useState<"line" | "bar" | "mixed" | "doubleAxis">("line");

  return (
    <div className="container">
      <h1>Chart Visualization</h1>

      <div className="button-group">
        <button onClick={() => setChartType("line")}>Line Chart</button>
        <button onClick={() => setChartType("bar")}>Bar Chart</button>
        <button onClick={() => setChartType("mixed")}>Mixed Chart</button>
        <button onClick={() => setChartType("doubleAxis")}>Double Axis Chart</button>
      </div>

      <Chart type={chartType} />

      <style jsx>{`
        .container {
          text-align: center;
          padding: 20px;
        }
        .button-group button {
          margin: 10px;
          padding: 10px 20px;
          border: none;
          background: #0070f3;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }
        .button-group button:hover {
          background: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default ChartVisual;
