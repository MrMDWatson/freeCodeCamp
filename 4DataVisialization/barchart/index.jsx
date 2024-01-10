function Chart({ data }) {
  React.useEffect(() => {
    d3.select("#Chart").selectAll("p")
      .data(data)
      .enter()
      .append("p")
      .text((d) => `${d.casesPerOneMillion} USD`)
      .style("color", "black")
      .attr("class", "red")
      .style("height", ((d) => (d.casesPerOneMillion/100) + "px"));
  });
  return (
    <div id="Chart">
      
    </div>
  );
}

function App() {
  const [countryData, setCountryData] = React.useState([]);
  const getData = async () => {
    try {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const result = await response.json();
      console.log(result);
      setCountryData(result);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div id="App">
      <h1>Chart</h1>
      <Chart data={countryData} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));