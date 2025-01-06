import { Line } from "react-chartjs-2";

const LineChart = ({ chartData }) => (
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
                usePointStyle: true,
              },
              display: false
            }
          },
          animation: true,
          aspectRatio: 1,
          maintainAspectRatio: false,
          responsive: true
        }}
      />
  </div>
);

export default LineChart;