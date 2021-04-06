const path = require('path');

const { config } = require('./config');
const port = config.port || 1337;

const express = require('express');
const app = express();

/**
 * Middleware
 */

app.use(require('morgan')('dev'));
app.use(require('cors')());
app.use(require('./middleware').handleError);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));

/**
 * Routes
 */

require('./routes/entry.js')(app);
require('./routes/search.js')(app);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
