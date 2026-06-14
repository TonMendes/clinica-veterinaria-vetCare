require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("./config/helmet");
var passport = require("./config/passport");
var swaggerUi = require("swagger-ui-express");
var swaggerDocument = require("./config/swagger_output.json");

var rotasIndex = require("./routes/rotasIndex");
var rotasUsuarios = require("./routes/rotasUsuarios");
var rotasPets = require("./routes/rotasPets");
var rotasAtendimentos = require("./routes/rotasAtendimentos");

var app = express();

var emProd = process.env.ENV === "prod";

app.use(logger("dev"));
app.use(helmet(emProd));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", rotasIndex);
app.use("/api/usuarios", rotasUsuarios);
app.use("/api/pets", rotasPets);
app.use("/api/atendimentos", rotasAtendimentos);

module.exports = app;
