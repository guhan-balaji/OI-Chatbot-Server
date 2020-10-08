require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const textQuery = require("./routes/textQuery");

const app = express();

app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true, 
  })
);

app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//session management requied
app.use("/api", cors(corsOptions), textQuery);

app.listen(process.env.PORT || 8080, () => {
  console.log("listenig on http://localhost:8080");
});
