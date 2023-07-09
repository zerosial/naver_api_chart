import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { DataPoint, LineChartProps } from "../features/types/Chart";

const colors = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
];
const color = (i: any) => colors[i % colors.length];

function LineChart({ data, width, height }: LineChartProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // create margins
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    let tickFormat = d3.timeFormat("%m/%d");

    const svg = d3.select(ref.current).html("");
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.period)) as [Date, Date])
      .range([0, innerWidth]);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.ratio) as number])
      .range([innerHeight, 0]);
    const line = d3
      .line<DataPoint>()
      .curve(d3.curveBasis)
      .x((d) => x(new Date(d.period)))
      .y((d) => y(d.ratio));

    // axes
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(10)
          .tickFormat((d: any) => tickFormat(d))
          .tickSize(-innerHeight)
      )
      .attr("stroke-width", 0.5)
      .style("color", "gray");

    g.append("g")
      .call(d3.axisLeft(y).ticks(5).tickSize(-innerWidth))
      .attr("stroke-width", 0.5)
      .style("color", "gray");

    // data grouping
    const groups = d3.group(data, (d) => d.group);

    // draw lines
    Array.from(groups, ([group, values], i) => {
      g.append("path")
        .datum(values)
        .attr("fill", "none")
        .attr("stroke", color(i))
        .attr("stroke-width", 1.5)
        .attr("d", line as any);
    });

    // legend
    const legend = g
      .selectAll(".legend")
      .data(Array.from(groups.keys()))
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legend
      .append("rect")
      .attr("x", innerWidth - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d, i) => color(i));

    legend
      .append("text")
      .attr("x", innerWidth - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .style("font-size", "18px")
      .style("color", "black")
      .text((d) => `${d}대`);
  }, [data, width, height]);

  return <svg ref={ref} width={width} height={height}></svg>;
}
export default LineChart;
