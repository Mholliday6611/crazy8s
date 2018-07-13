const express = require("express")
const mongoose = require('mongoose')
var bodyParser = require("body-parser");

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

const server = app.listen(8080)
// mongoose.connect("mongodb://localhost/crazy8")

const routes = require("./routes")
const sockets = require("./sockets")

routes(app)
sockets(server)