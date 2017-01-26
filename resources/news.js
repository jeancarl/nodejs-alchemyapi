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

app.get("/news", function (req, res) {
  var alchemyDataNews = new watson.AlchemyDataNewsV1({
    // api_key: '<api-key>'
  });

  var fields = [
    "enriched.url.image",
    "enriched.url.url",
    "enriched.url.title"
  ];

  var params = {
    maxResults: req.query.hasOwnProperty("max") ? req.query.max : 10,
    return: fields.join(",")
  };

  // For more search fields, please refer to ibm.biz/nodejs-alchemyapi-parameters
  if (req.query.hasOwnProperty("title")) {
    params["q.enriched.url.title"] = req.query.title;
  }

  alchemyDataNews.getNews(params, function (err, news) {
    if (err) {
      res.send(err);
    } else {
      if (req.query.format == "json") {
        res.send(news);
      } else {
        res.send(mustache.render(templates.news, news));
      }
    }
  });
});
