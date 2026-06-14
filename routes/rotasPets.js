var express = require("express");
var router = express.Router();
var controllerPets = require("../controller/controllerPets.js");
const {
  ehAutenticado,
  ehAdmin,
  ehRecepcao,
} = require("../middlewares/controleUsuario.js");

router.post(
  "/",
  /*
    #swagger.tags = ['Pets']
    #swagger.summary = 'Cadastro de novo pet'
    #swagger.security = [{ "BearerAuth": [] }]
    #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/NovoPet' } }
    #swagger.responses[201] = { schema: { $ref: '#/definitions/Pet' } }
  */
  ehAutenticado,
  ehAdmin,
  controllerPets.cadastro,
);
router.get(
  "/",
  /*
    #swagger.tags = ['Pets']
    #swagger.summary = 'Listagem de pets'
    #swagger.security = [{ "BearerAuth": [] }]
    #swagger.parameters['especie'] = { in: 'query', description: 'Filtra os pets por espécie', type: 'string' }
    #swagger.responses[200] = { schema: [{ $ref: '#/definitions/Pet' }] }
  */
  ehAutenticado,
  ehRecepcao,
  controllerPets.listar,
);

module.exports = router;
