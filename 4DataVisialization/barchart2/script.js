function App() {
  React.useEffect(() => {
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
      d3.select("#Chart").selectAll("p")
      .data(dataset)
      .enter()
      .append("p")
      .text((d) => `${d} USD`)
      .style("color", (d) => 
          d > 20 ? "green" : "red"
      )
      .attr("class", "bar")
      .style("height", ((d) => (d * 10) + "px"));
  })
  return (
    <div id="Chart">
      <h1>Hello</h1>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));