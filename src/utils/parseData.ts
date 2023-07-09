export const parseData = (response: any) => {
  if (response) {
    const chartData = response?.results[0];
    return chartData?.data.map((d: any) => ({
      ...d,
      period: new Date(d.period),
    }));
  }
};
