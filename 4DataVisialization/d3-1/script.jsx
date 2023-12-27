function BarChart() {
  return (
    <div>
      <div className="BarChart">
        <h1>Hello</h1>

      </div>
      <Chart />
    </div>
  );
}

function Chart() {
  const tes = "";
  React.useEffect(() => {
    tes = d3
      .select(".BarChart")
      .append("h1")
      .text("Bye");
  }, []);
  return tes;
  
}

ReactDOM.render(<BarChart />, document.getElementById("root"));