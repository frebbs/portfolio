const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8081
const rootRouter = require('./router/rootRouter')
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
    cors(corsOptions)
])


app.use('/', rootRouter);