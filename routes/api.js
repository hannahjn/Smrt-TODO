"use strict";

const secrets = require("../secrets");
const request = require("request");
const convert = require("xml-js");

const yelpKey = secrets.YELP_KEY;
const GRKey = secrets.GR_KEY;
const traktKey = secrets.TRAKT_KEY;

// exports helper functions used by GET to "/api"
module.exports = function makeAPIHelpers() {
  return {
    
    toTrakt: function(query, cb) {
      let newEntry = {};

      const options = {
        method: "GET",
        url: 'https://api.trakt.tv/search',
        qs: { query, type: "movie,show" },
        headers: {
          "Cache-Control": "no-cache",
          "trakt-api-version": "2",
          "trakt-api-key": traktKey,
          "Content-type": "application/json"
        }
      };

      request(options, function(error, response, body) {
        if (error) throw new Error(error);
        const res = JSON.parse(body);
        console.log(res);
        newEntry.name = res[0].show.title;
        newEntry.description =
          res[0].type + ", " + res[0].show.overview.slice(0, 50) + "...";
        cb(error, newEntry);
      });
    },

    toYelp: function(query, cb) {
      let newEntry = {};

      const options = {
        method: "GET",
        url: "https://api.yelp.com/v3/businesses/search",
        qs: { term: query, location: "Montreal" },
        headers: { Authorization: "Bearer " + yelpKey }
      };

      request(options, function(error, response, body) {
        if (error) throw new Error(error);
        const res = JSON.parse(body);
        newEntry.name = res.businesses[0].name;
        newEntry.description =
          res.businesses[0].categories[0].alias +
          ", " +
          res.businesses[0].location.display_address[0];
        cb(error, newEntry);
      });
    },

    toGR: function(query, cb) {
      let newEntry = {};

      var options = {
        method: "GET",
        url: "https://www.goodreads.com/search.xml",
        qs: { key: GRKey, q: query }
      };

      request(options, function(error, response, body) {
        if (error) throw new Error(error);
        const res = JSON.parse(
          convert.xml2json(body, { compact: true, spaces: 4 })
        );
        newEntry.name =
          res.GoodreadsResponse.search.results.work[0].best_book.title._text +
          ", by " +
          res.GoodreadsResponse.search.results.work[0].best_book.author.name
            ._text;
        newEntry.description =
          res.GoodreadsResponse.search.results.work[0].best_book._attributes.type;

        cb(error, newEntry);
      });
    }
  };
};
