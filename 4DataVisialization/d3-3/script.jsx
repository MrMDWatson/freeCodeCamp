
const CreateBarChart = data => {

	// create html element for d3 to work on
	const node = document.createElement('div');

	// establish margins based on user input
	const margin = 30;
	const width = 600;
	const height = 400;

	// ordinal scale for x-axis since not a numerical range
	const x = d3.scale.scaleBand().rangeRoundBands([0, width], 0.1);

	// linear scale for y-axis as it will entail numerical values
	const y = d3.scaleLinear().range([height, 0]);

	// scales x-axis based on user's defined width
	const xAxis = d3.svg.axis()
    .scale(x)
    // applies labels below x-axis
    .orient("bottom");

	// scales y-axis based on user's defined height
	const yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    // apply tick intervals based on user input
    .ticks(data);

	// select created html element and append svg
	// apply attributes to svg and append g elements
	const svg = d3.select(node).append("svg")
	    .attr("width", width + (margin * 2))
	    .attr("height", height + (margin * 2))
	  .append("g")
	    .attr("transform", 
	          "translate(" + margin + "," + margin + ")");
	
	// scale x-axis based on amount of labels provided by user
	x.domain(data.map(d => d.country));

	// scale y-axis based on range of values provided by user
	y.domain([0, d3.max(data.cases, d => d/1000)]);

	// append g elements responsible for x-axis label properties
	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)
	  .selectAll("text")
	    .style("text-anchor", "end")
	    .attr("dx", "-.8em")
	    .attr("dy", "-.55em")
	    .attr("transform", "rotate(-90)" );

	// append g elements responsible for y-axis tick and label properties
	svg.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	  .append("text")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text(data.yAxisLabel);

	// bind user data to rectangles that will be appended to svg
	svg.selectAll("bar")
	    .data(data)
	  .enter().append("rect")
	  	// if user defined fill colors, they will be assigned here
	    .style("fill", d => d.fill || "steelblue")
	    .attr("x", d => x(d.country))
	    .attr("width", x.rangeBand())
	    .attr("y", d => y(d.cases/1000))
	    .attr("height", d => height - y(d.cases/1000))
	    .attr('fill', d => d.fill);

	// return built up html tree to be compiled to react elements
	return node;
}

function Chart() {
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
    <CreateBarChart data={countryData} />
  )
}

ReactDOM.render(<Chart />, document.getElementById("root"));