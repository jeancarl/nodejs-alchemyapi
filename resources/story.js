/**
****************************************************************************
* Copyright 2017 IBM
*
*   AlchemyAPI in Node.js
*
*   By JeanCarl Bisson (@dothewww)
*   More info: https://ibm.biz/nodejs-alchemyapi
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
****************************************************************************
*/

app.get("/story", function (req, res) {
  var alchemyLanguage = new watson.AlchemyLanguageV1({
    // api_key: '<api-key>'
  });

  var features = [
    "entities",
    "keywords",
    "title",
    "authors",
    "taxonomy",
    "concepts",
    "relations",
    "pub-date",
    "doc-sentiment",
    "doc-emotion",
    "page-image",
    "feeds"
  ];

  var parameters = {
    extract: features.join(","),
    sentiment: 1,
    emotion: 1,
    maxRetrieve: 1,
    url: req.query.url
  };

  alchemyLanguage.combined(parameters, function (err, response) {
    if (err) {
      res.send(err);
    } else {
      if (req.query.format == "json") {
        res.send(response);
      } else {
        res.send(mustache.render(templates.story, response));
      }
    }
  });
});
