const dataset = [
  [ 34,    78 ],
  [ 109,   280 ],
  [ 310,   120 ],
  [ 79,    411 ],
  [ 420,   220 ],
  [ 233,   145 ],
  [ 333,   96 ],
  [ 222,   333 ],
  [ 78,    320 ],
  [ 21,    123 ]
];

function App() {
  const [countryData, setCountryData] = React.useState([]);
  React.useState(() => {
    setCountryData(dataset);
  }, [])
  return (
    <div>
      <BarChart
        data={countryData}
        height={500}
        barWidth={5}
        width={500}
        dataType={"casesPerOneMillion"}/>
    </div>
  );
}

function BarChart({ data, height, width, barWidth, dataType }) {
  React.useEffect(() => {
    createBarChart();
  }, [data]);
  function createBarChart() {
    const xMin = d3.min(data, (d) => d[0]);
    const xMax = d3.max(data, (d) => d[0]);
    const yMin = d3.min(data, (d) => d[1]);
    const yMax = d3.max(data, (d) => d[1]);

    const w = 500;
    const h = 500;
    const padding = 30;

    const xScale = d3
        .scaleLinear()
        .domain([0, xMax])
        .range([0, width]);
    const yScale = d3
        .scaleLinear()
        .domain([0, yMax])
        .range([height, 0]);

    const svg = d3
        .select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "gray");

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", (d, i) => xScale(d[0]))
        .attr("cy", (d, i) => yScale(d[1]))
        .attr("fill", "red")
        .attr("class", "circle");

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .attr("x", (d, i) => xScale(d[0] + 10))
        .attr("y", (d, i) => yScale(d[1]))
        .text((d) => `[${d[0]}, ${d[1]}]`)
        .attr("font-size", 10)
        .attr("fill", "navy");

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("transform", "translate(0," + height - 40 + ")")
        .call(xAxis);
    svg.append("g")
        .attr("transform", "translate(" + 40 + ",0)")
        .call(yAxis)
  }
  return (
    <div>
      <svg width={width} height={height}></svg>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));