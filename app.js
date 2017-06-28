/* globals require */

const config = require('./config');
const app = require('./config/application');
const data = require('./data')(config);

//require('./routers')(app, data);

const port = config.port;
app.listen(config.port, () => console.log(`App running at ${port}`));


