const express = require("express");
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());
app.use(cors());

app.get("/nickname", (req, res) => {
    const name = req.query.name;
    console.log('api', req);
    res.json({name: name.split("").reverse().join("")});
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});