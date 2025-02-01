import { LineChart, Line, XAxis, YAxis } from 'recharts';

interface ChartData {
  date: string;
  average: number;
  variance: number;
  constrastAvg: string;
  constrastVariance: string;
}

interface LineChartProps {
  data: ChartData[];
}
const RenderLineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <LineChart width={400} height={400} data={data}>
      <Line type="monotone" dataKey="average" stroke="#8884d8" />
      <Line type="monotone" dataKey="variance" stroke="#82ca9d" />
      <XAxis dataKey="date" />
      <YAxis />
    </LineChart>
  );
};

export default RenderLineChart;
