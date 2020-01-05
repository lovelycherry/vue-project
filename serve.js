const express = require('express');
const app = express();

app.listen('8080', function() {
	console.log('mock server success');
});
app.get('/newsdata', function(req, res) {
	res.json(require('./api/news.json'));
});
