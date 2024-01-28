const Chart = ({ data, height, width }) => {
  const createChart = () => {

    let svg = d3.select("#tree");
    
    let color = d3.scaleOrdinal([1, 10], [...d3.schemeSet3, ...d3.schemePaired]);

    let hierarchy = d3.hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);

    let treemap = d3.treemap()
      .size([width, height])
      .paddingInner(5)
      (hierarchy);

    console.log(treemap);
    
    const leaf = svg.selectAll("g")
      .data(treemap.leaves())
      .enter()
      .append("g");

    let legend = svg.append("g")
      .attr("class", "legend")
      .attr("id", "legend");

    leaf
      .append("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("width", (d) => (d.x1 - d.x0))
      .attr("height", (d) => (d.y1 - d.y0))
      .style("stroke", "black")
      .attr("class", "tile")
      .attr("data-name", (d) => d.data.name)
      .attr("data-category", (d) => d.data.category)
      .attr("data-value", (d) => d.data.value)
      .style("fill", (d) => color(d.data.category));

    leaf
      .append("text")
      .style("fill", "black")
      .style("font-size", 8)
      .attr("x", (d) => d.x0 + 5)
      .attr("y", (d) => d.y0 + 15)
      .text((d) => `${d.data.category} - ${d.data.name}: ${d.data.value}`);
      /*
    leaf.selectAll("text")
      .data(treemap.leaves())
      .join("text")
      .attr("fill", "black")
      .text();
      */

    /*

    

    d3.treemap()
      .size([width, height])
      .padding(1)
      (root)

    Console.log(root.leaves());
    const svg = d3.select("svg");

    const leaf = svg.selectAll("g")
      .data(root.leaves())
      .join("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

    leaf.append("rect")
        .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
        .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
        .attr("fill-opacity", 0.6)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0);

    var cell = svg
      .selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('class', 'group')
      .attr('transform', function (d) {
        return 'translate(' + d.x0 + ',' + d.y0 + ')';
      });

    cell
      .append('rect')
      .attr('id', function (d) {
        return d.data.id;
      })
      .attr('class', 'tile')
      .attr('width', function (d) {
        return d.x1 - d.x0;
      })
      .attr('height', function (d) {
        return d.y1 - d.y0;
      })
      .attr('data-name', function (d) {
        return d.data.name;
      })
      .attr('data-category', function (d) {
        return d.data.category;
      })
      .attr('data-value', function (d) {
        return d.data.value;
      })
      .attr('fill', function (d) {
        return color(d.data.category);
      })
      .on('mousemove', function (event, d) {
        tooltip.style('opacity', 0.9);
        tooltip
          .html(
            'Name: ' +
              d.data.name +
              '<br>Category: ' +
              d.data.category +
              '<br>Value: ' +
              d.data.value
          )
          .attr('data-value', d.data.value)
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function () {
        tooltip.style('opacity', 0);
      });

    cell
      .append('text')
      .attr('class', 'tile-text')
      .selectAll('tspan')
      .data(function (d) {
        return d.data.name.split(/(?=[A-Z][^A-Z])/g);
      })
      .enter()
      .append('tspan')
      .attr('x', 4)
      .attr('y', function (d, i) {
        return 13 + i * 10;
      })
      .text(function (d) {
        return d;
      });
    }
    */
  }
  React.useEffect(() => {
    if (data != null) {
      createChart();
    }
  }, [data]);
  return (
    <div id="Chart">
      <h3 id="title">Tree Map</h3>
      <p id="description">Add description</p>
      <svg id="tree" width={width} height={height}></svg>
    </div>
  );
}

const App = () => {
  const [data, setData] = React.useState(null);
  const url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";
  const getData = async () => {
    try {
      await axios.get(url)
        .then((result) => {
          setData(result.data)
        });
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <main id="App">
      <Chart
        data={data}
        height={504}
        width={896}
      />
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));