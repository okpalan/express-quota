var express = require('express');
var app = express();
const api= require('./api');

var apiKey = 'myapikey';
var apiSecret = 'myapisecret';

app.use(function (req, res, next) {
  // check for API key in header
  if (!req.headers.hasOwnProperty('x-api-key')) {
    return res.status(401).json({
      error: 'No API key provided'
    });
  }

  // verify API key
  if (req.headers['x-api-key'] !== apiKey) {
    return res.status(401).json({
      error: 'Invalid API key'
    });
  }

  // check for API secret in header
  if (!req.headers.hasOwnProperty('x-api-secret')) {
    return res.status(401).json({
      error: 'No API secret provided'
    });
  }

  // verify API secret
  if (req.headers['x-api-secret'] !== apiSecret) {
    return res.status(401).json({
      error: 'Invalid API secret'
    });
  }

  next();
});

// rate limit middleware
app.use(function (req, res, next) {
  // check for rate limit header
  if (!req.headers.hasOwnProperty('x-rate-limit')) {
    return res.status(429).json({
      error: 'No rate limit provided'
    });
  }

  // verify rate limit
  if (req.headers['x-rate-limit'] !== '60') {
    return res.status(429).json({
      error: 'Invalid rate limit'
    });
  }

  // check for rate limit remaining header
  if (!req.headers.hasOwnProperty('x-rate-limit-remaining')) {
    return res.status(429).json({
      error: 'No rate limit remaining provided'
    });
  }

  // verify rate limit remaining
  if (req.headers['x-rate-limit-remaining'] === '0') {
    return res.status(429).json({
      error: 'Rate limit exceeded'
    });
  }

  next();
});

// your API routes go here
app.use('/api', api);

// usage:
// curl -X POST -H "x-api-key: myapikey" -H "x-api-secret: myapisecret" -H "x-rate-limit: 60" -H "x-rate-limit-remaining: 59" -H "Content-Type: application/json" -d '{"name": "John"}' http://localhost:3000/api/users


console.log("Node server running on port 3000");
app.listen(3000);
