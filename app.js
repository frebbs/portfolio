const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 9000;
const rootRouter = require('./router/rootRouter');
const membersRouter = require('./router/membersRouter');

const cookieSession = require('cookie-session');

const server = app.listen(PORT, () => console.log(`Server running on ${PORT}`))

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.set('view engine', 'ejs')

app.use([
    express.json(),
    express.urlencoded({extended: true}),
    express.static('public'),
    cors(corsOptions),
    cookieSession({
        name: 'ADsession',
        secret: 'this is very specical, hide the real key!',
              // Cookie Options
        maxAge: 60 * 60 * 1000 // 1 hour??
      })
])


app.use('/', rootRouter);
app.use('/members', membersRouter);