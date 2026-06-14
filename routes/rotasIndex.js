var express = require("express");
var router = express.Router();
var controllerIndex = require("../controller/controllerIndex.js");

router.get(
  "/",
  /*
    #swagger.tags = ['Index']
    #swagger.summary = 'Informações básicas sobre o serviço'
  */
  controllerIndex.index,
);

module.exports = router;
