const config = require('config');
const express = require('express');

const app = express();
const port = config.get('port');

app.use(express.json());
app.use('/auth', require('./router/auth.routes'));
app.use('/users', require('./router/users.routes'));

app.listen(port, () => console.log(`App has been started on port ${port}`));
