var express = require("express");
const routes = require("./routes");
var cors = require('cors');
var cookieParser = require('cookie-parser');
var PORT = process.env.PORT || 8888;


var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'))
  .use(cors())
  .use(cookieParser());
}


app.use(routes);


app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
