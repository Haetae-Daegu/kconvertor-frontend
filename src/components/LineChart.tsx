import { Line } from "react-chartjs-2";

interface LineChartProps {
  chartData: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      fill: boolean;
      borderColor: string;
      borderWidth: number;
    }[];
  };
}

const LineChart = ({chartData}: LineChartProps) => (
  <div>
    <Line
        data={chartData}
        height="120px"
        width="200px"
        options={{
          plugins: {
            title: {
              display: true,
              text: "Korean won"
            },
            legend: {
              labels: {
                usePointStyle: false,
              },
              display: false
            }
          },
          animation: false,
          aspectRatio: 2.5,
          maintainAspectRatio: true,
          responsive: true
        }}
      />
  </div>
);

export default LineChart;