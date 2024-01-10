function Chart() {
  React.useEffect(() => {
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
      d3.select("#Chart").selectAll("p")
        .data(dataset)
        .enter()
        .append("p")
        .text((d) => `${d} USD`)
        .style("color", "black")
        .attr("class", (d) => (
          d > 20 ? "green" : "red"
        ))
        .style("height", ((d) => (d * 10) + "px"));
  })
  return (
    <div id="Chart">
      
    </div>
  )
}

function App() {
  return (
    <div id="App">
      <h1>Chart</h1>
      <Chart />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));