import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

export default function LineChart() {

    const jsonData = [
        { year: 2023, month: "Jan", revenue: 80000, expenses: 60000 },
        { year: 2023, month: "Feb", revenue: 96000, expenses: 70000 },
        { year: 2023, month: "Mar", revenue: 98000, expenses: 82000 },
        { year: 2023, month: "Apr", revenue: 100000, expenses: 84000 },
        { year: 2023, month: "May", revenue: 96000, expenses: 103000 },
        { year: 2023, month: "Jun", revenue: 125000, expenses: 99000 },
        { year: 2023, month: "Jul", revenue: 128000, expenses: 92000 },
        { year: 2023, month: "Aug", revenue: 130000, expenses: 100000 },
        { year: 2023, month: "Sep", revenue: 128600, expenses: 110000 },
        { year: 2023, month: "Oct", revenue: 132000, expenses: 100000 },
        { year: 2023, month: "Nov", revenue: 134000, expenses: 99000 },
        { year: 2023, month: "Dec", revenue: 137000, expenses: 120000 },
    ];

    const lineChartData = {
        labels: jsonData.map((data) => data.month),
        datasets: [
            {
                label: "Revenue",
                data: jsonData.map((data) => data.revenue),
                backgroundColor: "#CB3CFF",
                borderColor: "#CB3CFF",
            },
            {
                label: "Expenses",
                data: jsonData.map((data) => data.expenses),
                backgroundColor: "#00C2FF",
                borderColor: "#00C2FF",
            },
        ]
    }

    return (
        <Line
            data={lineChartData}
        />
    );
}