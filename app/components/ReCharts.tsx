import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="average" stroke="#FF5858" />
        <Line type="monotone" dataKey="variance" stroke="#279EFF" />
        <XAxis dataKey="date" padding={{ left: 20, right: 20 }} />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RenderLineChart;
