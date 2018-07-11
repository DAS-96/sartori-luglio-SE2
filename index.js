"use strict";

const express = require('express'),
    app = express(),
    port = process.env.port || 3000,
    bodyParser = require('body-parser'),
    rotte = require('./routes.js');

app.use(bodyParser.json());

rotte.routes(app);

app.listen(port, () => console.log('Example listening on port ' + port));