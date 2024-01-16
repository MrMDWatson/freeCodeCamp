const Chart = ({ graphData }) => {
  React.useEffect(() => {
    const width = 500;
    const height = 400;
    const padding = 40;
    // Declare the x (horizontal position) scale.
    const xScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([padding, width - padding]);
    // Declare the y (vertical position) scale.
    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height - padding, padding]);
    // Add chart to div
    const svg = d3
      .select("#Chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    // Add bars
    svg.selectAll("rect")
      .data(graphData)
      .enter()
      .append("rect")
      .attr("width", 5)
      .attr("height", (d) => height - yScale(d) - padding)
      .attr("x", (d, i) => (((width - (padding * 2)) / graphData.length) * i) + padding)
      .attr("y", (d, i) => yScale(d))
      .attr("fill", "red");
    // Add text to bar
    svg.selectAll("text")
      .data(graphData)
      .enter()
      .append("text")
      .attr("x", (d, i) => (((width - (padding * 2)) / graphData.length) * i) + padding)
      .attr("y", (d, i) => yScale(d))
      .text((d) => `${d} USD`)
      .style("color", "black");
    // Add the x-axis.
    svg.append("g")
      .attr("transform", `translate(0,${height - padding})`)
      .call(d3.axisBottom(xScale));
    // Add the y-axis.
    svg.append("g")
      .attr("transform", `translate(${padding},0)`)
      .call(d3.axisLeft(yScale));
  }, [graphData]);
  return (
    <div id="Chart"></div>
  );
}

const App = () => {
  const graphData = [70, 34, 89, 50, 66, 75, 23, 7, 99];
  return (
    <div id="App">
      <Chart graphData={graphData} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));