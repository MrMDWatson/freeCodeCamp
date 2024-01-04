function BarChart({ data, height, width, barWidth, dataType }) {
  React.useEffect(() => {
    createBarChart();
  }, [data]);
  function createBarChart() {
    
    const countryData = data
    .map((country) => country["casesPerOneMillion"])
    .sort((a, b) => a - b)
    const countries = data.map((country) => country.country);
    
    let tooltip = d3
    .select(".visHolder")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);
    
    const yMax = d3.max(countryData);
    const yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([0, height]);
    
    
    d3.select("svg")
    .selectAll("rect")
    .data(countryData)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * barWidth)
    .attr("y", (d, i) => height - yScale(d + yMax * .1))
    .attr("height", (d, i) => yScale(d + yMax * .1))
    .attr("width", barWidth)
    .attr("fill", (d, i) => i % 2 === 0 ? "green" : "red")
    .on("mouseover", (d, i) => {
      tooltip.style("opacity", 0.9);
      tooltip
      .html(countries[i] + `<br /> ${dataType}: ` + d)
      .style("left", i * barWidth + 20 + "px")
      .style("top", d3.event.pageY - 170 + "px")
    });
  }
  return (
    <div>
      <svg width={width} height={height}></svg>
    </div>
  );
}

function App() {
  const [countryData, setCountryData] = React.useState([]);
  React.useState(() => {
    async function fetchData() {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await response.json();
      console.log(data);
      setCountryData(data);
    }
    fetchData();
  }, [])
  return (
    <div>
      <h1>Hello</h1>
      <BarChart
        data={countryData}
        height={500}
        barWidth={5}
        width={countryData.length * 5}
        dataType={"casesPerOneMillion"}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));