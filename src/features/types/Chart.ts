export interface DataPoint {
  period: string;
  ratio: number;
  group: string;
}

export interface ChartData {
  title: string;
  keyword: string[];
  data: DataPoint[] | undefined;
}

export interface LineChartProps {
  data: DataPoint[];
  width: number;
  height: number;
}
