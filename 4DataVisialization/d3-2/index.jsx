const Scattorplot = ({ graphData }) => {
  const createScattorplot = () => {
    console.log(graphData);
    const timeArray = graphData.map((d) => {
      return new Date(d["Time"]);
    });
    const gdpArray = graphData.map((d) => d[1]);
    const yMax = d3.max(gdpArray);
    const yMin = d3.min(gdpArray);
    const xMax = d3.max(dateArray);
    const xMin = d3.min(dateArray);

    const height = 400;
    const width = 500
    const padding = 80;
    // Declare the x (horizontal position) scale.
    const xScale = d3
      .scaleLinear()
      .domain([0, xMax])
      .range([padding, width - padding]);
    // Declare the y (vertical position) scale.
    const yScale = d3
      .scaleLinear()
      .domain([0, yMax])
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
    svg.selectAll("circle")
      .data(graphData)
      .enter()
      .append("circle")
      .attr("data-gdp", (d) => d[1])
      .attr("data-date", (d) => d[0])
      .attr("r", "2")
      .attr("cx", (d, i) => xScale(d[0]))
      .attr("cy", (d, i) => yScale(d[1]))
      .attr("class", "circle");
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
      })*/
    // 
    svg.append("text")
      .attr("font-size", 16)
      .attr("transform", "rotate(-90)")
        .attr("x", "-250")
      .attr("y", "30")
      .attr("fill", "black")
      .text("GDP");
    
    // Add the x-axis.
    svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0,${height - padding})`)
      .call(d3.axisBottom(xScale));
    // Add the y-axis.
    svg.append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${padding},0)`)
      .call(d3.axisLeft(yScale));
  }
  React.useEffect(() => {
    if (graphData != "") {
      createScattorplot();
    }
  }, [graphData]);
  return (
    <div id="Chart">
      <h3 id="title">Scattorplot</h3>
    </div>
  );
}

const App = () => {
  const [graphData, setGraphData] = React.useState([]);
  const getGraphData = async () => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json");
      const result = await response.json();
      console.log(result);
      setGraphData(result);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getGraphData();
  }, []);
  return (
    <div id="App">
      <Scattorplot graphData={graphData} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));