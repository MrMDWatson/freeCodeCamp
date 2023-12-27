function App() {
  const [quote, setQuote] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [author, setAuthor] = React.useState("");

  const getQuote = async () => {
    try {
      const response = await fetch("http://www.iolaunchpad.com/quote", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();
      setQuote(result);
    } catch(error) {
      console.log(error);
    }
  }

  const setNewQuote = async (e) => {
    //e.preventDefault();
    try {
      const response = await fetch("http://www.iolaunchpad.com/newQuote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          description: description,
          author: author
        })
      });
      const result = await response.json();
    } catch(error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getQuote();
  }, []);
  
  return (
    <div id="App">
      <div id="quote-box">
        <div id="quote">
          <h3 id="text">{quote.description}</h3>
        </div>
        <div id="author">
          <p>{quote.author ? `- ${quote.author}`: ""}</p>
        </div>
        <div id="quote-footer">
          <a href="https://twitter.com/intent/tweet" id="tweet-quote">Post on X</a>
          <button id="new-quote" target="_blank" onClick={getQuote}>New Quote</button>
        </div>
      </div>
      {/* Input new quotes
      <form>
        <fieldset id="set-new-quote">
          <label for="description">Enter quote:
            <input
              id="description"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              />
          </label>
          <label for="description-author">Enter author: 
            <input
              id="description-author"
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              />
          </label>
          <button id="quote-submit" type="submit" onClick={setNewQuote}>Enter</button>
        </fieldset>
      </form>
      */}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));