let express = require('express');
let bodyParser = require('body-parser');
let app = express();

app.use("/public", express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get(
  "/now",
  (req, res, next) => {
    req.time = Date().toString();
    next();
  },
  (req, res) => {
    res.json({"time": req.time});
  }
);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get("/json", (req, res) => {
  let message = "Hello json";
  
  process.env.MESSAGE_STYLE === "uppercase"
    ? response = message.toUpperCase()
    : response = message;
  res.json({message: response});
});

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({echo: word});
});

app
  .route("/name")
  .get((req, res) => {
    const firstName = req.query.first;
    const lastName = req.query.last;
    res.json({name: `${firstName} ${lastName}`});
  })
  .post((req, res) => {
    const firstName = req.body.first;
    const lastName = req.body.last;
    res.json({name: `${firstName} ${lastName}`});
  });


 module.exports = app;