var express = require("express");
const routes = require("./routes");
var PORT = process.env.PORT || 3001;


var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'))
}

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
