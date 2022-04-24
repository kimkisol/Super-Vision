import styled from "@emotion/styled";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Context} from 'chartjs-plugin-datalabels';
Chart.register(...registerables);
Chart.register(ChartDataLabels)

type BarChartProps = {
    indexAxis: string;
    barThickness: number;
    width: string;
    height: string;
    data: number[];
    labels: string[];
    colors: string[];
    maxTick?: number;
};

declare module 'chartjs-plugin-datalabels' {
  interface Context {
    anchor: string;
  }
}

type alignType = "start" | "left" | "center" | "right" | "bottom" | "end" | "top";
type anchorType = "start" | "center" | "end";
type indexAxisType = "x" | "y";

function BarChart ({ indexAxis, barThickness, width, height, data, labels, colors, maxTick=110 }: BarChartProps){
  const options = {
    indexAxis: indexAxis as indexAxisType,
    barThickness,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: true,
        color: "#F2FFFF",
        offset: 6,
        anchor: "end" as anchorType,
        align: "end" as alignType,
        font: {
          size: 22,
        },
      },
      legend: {
        display: false,
        labels: {
          font: {
            size: 22,
          }
        }
      },
    },
    scales: indexAxis === 'x' ? {
      y: {
        suggestedMin: 0,
        suggestedMax: maxTick,
        display: false,
        ticks: {
          color: '#F2FFFF',
          font: {
            family: 'Pretendard-Regular',
            size: 18,
          }
        }
      },
      x: {
        ticks: {
          color: '#F2FFFF',
          font: {
            family: 'Pretendard-Regular',
            size: 18,
          }
        }
      }
    } : {
      x: {
        suggestedMin: 0,
        suggestedMax: maxTick,
        display: false,
        ticks: {
          color: '#F2FFFF',
          font: {
            family: 'Pretendard-Regular',
            size: 18,
          }
        }
      },
      y: {
        ticks: {
          color: '#F2FFFF',
          font: {
            family: 'Pretendard-Regular',
            size: 18,
          }
        }
      }
    },
  };

  const generateChartData = {
      labels,
      datasets: [
        {
          label: "New Confirmed",
          data,
          backgroundColor: colors,
          borderColor: colors,
        },
      ],
    };

  return (
    <div className="" style={{width: width, height: height}}>
      <Bar data={generateChartData} options={options} />
    </div>
  );
};

export default BarChart;