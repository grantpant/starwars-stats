const express = require("express");
const app = express();
const request = require("request");

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home.ejs");
});

app.get("/searchresults", function(req, res) {
  var inputNum = req.query.inputNum;
  console.log(inputNum);

  let charSearch = `https://swapi.co/api/people/${inputNum}`;

  callback = (err, resp, body) => {
    if (!err && resp.statusCode == 200) {
      var returnData = JSON.parse(body);
      console.log(returnData);
      res.render("searchresults.ejs", { stuff: returnData });    }
  };

  request(charSearch, callback);

});



/*
  // Yelp-fusion code sampled from "https://github.com/Yelp/yelp-fusion/blob/master/fusion/node/sample.js"
  var searchRequest = {
    location: city,
    limit: 10
  };

  ("use strict");

  const apiKey =
    "NVnRqA_Yk1SeKQVxxbBnE37tM9N7sPxAs7o2JwglhPty2RvxgFzoqGP75O_7dyKhw8PWY1iLuDVPe7VfK6OhkHacxRQYw0Q5i0oN1BqQNVDQUfO2lEPf4AmU7l0kW3Yx";

  const client = yelp.client(apiKey);
  client
    .search(searchRequest)
    .then(response => {
      var prettyStuff = JSON.stringify(response.jsonBody.businesses, null, 4);

      var stuff = JSON.parse(prettyStuff);

      res.render("searchresults.ejs", { stuff: stuff });
    })
    .catch(e => {
      console.log(e);
    });

*/

app.listen(3000, function() {
  console.log("Listening on port 3000...");
});
