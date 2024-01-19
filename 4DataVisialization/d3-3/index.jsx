const Chart = ({ graphData }) => {
  const createBarChart = () => {
    const yearArray = graphData.map((d) => d["year"]);
    console.log(yearArray);
    const monthArray = graphData.map((d) => d["month"]);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const xMax = d3.max(yearArray);
    const xMin = d3.min(yearArray);
    const yMax = d3.max(monthArray);
    const yMin = d3.min(monthArray);
    const barWidth = 2;
    const height = 400;
    const width = 650;
    const padding = 80;
    // Declare the x (horizontal position) scale.
    const xScale = d3
      .scaleLinear()
      .domain([xMin - 5, xMax + 5])
      .range([padding, width - padding]);
    // Declare the y (vertical position) scale.
    const yScale = d3
      .scaleBand()
      .domain(months)
      .range([height - padding, padding]);
    // Add tooltip
    let tooltip = d3
      .select("#Chart")
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0);
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
      /*
      .attr("data-gdp", (d) => d[1])
      .attr("data-date", (d) => d[0])
      */
      .attr("height", 8)
      .attr("width", 4)
      
      .attr("x", (d, i) => xScale(d["year"]))
      .attr("y", (d, i) => yScale(d[1]))
      .attr("class", "bar");
      /*
      .on("mouseover", (d, i) => {
        tooltip.style("opacity", 0.9);
        tooltip
        .html(d[0] + `<br /> GDP: ` + d[1])
        .attr("data-date", d[0])
        .style("left", (((width - (padding * 2)) / graphData.length) * i) + padding + "px")
        .style("top", d3.event.pageY - 60 + "px")
      })
      .on("mouseout", (d, i) => {
        tooltip.style("opacity", 0);
      });
      */
    // 
    svg.append("text")
      .attr("font-size", 16)
      .attr("transform", "rotate(-90)")
        .attr("x", "-250")
      .attr("y", "30")
      .attr("fill", "black")
      .text("GDP");
    
    // Add the x-axis.
    let xAxis = d3.axisBottom(xScale);
    svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0,${height - padding})`)
      .call(xAxis);
    // Add the y-axis.
    let yAxis = d3.axisLeft(yScale);
    svg.append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${padding},0)`)
      .call(yAxis);
  }
  React.useEffect(() => {
    if (graphData != "") {
      createBarChart();
    }
  }, [graphData]);
  return (
    <div id="Chart">
      <h3 id="title">Bar Chart</h3>
    </div>
  );
}

const App = () => {
  const [graphData, setGraphData] = React.useState([]);
  const getGraphData = async () => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json");
      const result = await response.json();
      console.log(result);
      setGraphData(result.monthlyVariance);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getGraphData();
  }, []);
  return (
    <div id="App">
      <Chart graphData={graphData} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));