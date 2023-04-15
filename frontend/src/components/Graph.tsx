import { Line } from "react-chartjs-2";
import { IGraphData } from "@/types/graphData";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

Chart.register(LineElement, PointElement, LinearScale, CategoryScale);

const Graph = (props: { graphData: IGraphData }) => {
  const labelsColor = "#9333cd";
  const fontSize = 14;
  return (
    <Line
      data={{
        datasets: [
          {
            data: props.graphData.y,
            label: "Data",
            borderColor: "rgb(75, 192, 192)",
            fill: false,
          },
        ],
        labels: props.graphData.x.map((x) => x.toString()),
      }}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Real Time Value",
              color: labelsColor,
              font: {
                size: fontSize,
              },
            },
            grid: {
              display: false,
              color: "white",
            },
            ticks: {
              color: labelsColor,
              font: {
                size: fontSize,
              },
            },
          },
          y: {
            title: {
              display: true,
              text: "Amplitude",
              color: labelsColor,
              font: {
                size: fontSize,
              },
            },
            ticks: {
              color: labelsColor,
              font: {
                size: fontSize,
              },
            },
          },
        },
      }}
    />
  );
};

export default Graph;
