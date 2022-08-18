var express = require('express');
var app = express();
var router = express.Router();

var apiKey = 'YOUR_API_KEY';
var apiSecret = 'YOUR_API_SECRET';

app.use(function(req, res, next) {
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
app.use(function(req, res, next) {
  // check for rate limit header
  if (!req.headers.hasOwnProperty('x-rate-limit-limit')) {
    return res.status(429).json({
      error: 'No rate limit provided'
    });
  }

  // verify rate limit
  if (req.headers['x-rate-limit-limit'] !== '60') {
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

app.use('/api', router);

app.listen(3000);
