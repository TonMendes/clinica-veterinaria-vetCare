var express = require("express");
var router = express.Router();
var controllerAtendimentos = require("../controller/controllerAtendimentos.js");
const {
  ehAutenticado,
  ehRecepcao,
  ehVeterinario,
} = require("../middlewares/controleUsuario.js");

router.post(
  "/",
  /*
    #swagger.tags = ['Atendimentos']
    #swagger.summary = 'Cadastro de novo atendimento'
    #swagger.security = [{ "BearerAuth": [] }]
    #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/NovoAtendimento' } }
    #swagger.responses[201] = { schema: { $ref: '#/definitions/Atendimento' } }
  */
  ehAutenticado,
  ehRecepcao,
  controllerAtendimentos.cadastro,
);
router.get(
  "/:id",
  /*
    #swagger.tags = ['Atendimentos']
    #swagger.summary = 'Consulta de atendimento por ID'
    #swagger.security = [{ "BearerAuth": [] }]
    #swagger.responses[200] = { schema: { $ref: '#/definitions/Atendimento' } }
  */
  ehAutenticado,
  ehRecepcao,
  controllerAtendimentos.consulta,
);
router.put(
  "/:id/iniciar",
  /*
    #swagger.tags = ['Atendimentos']
    #swagger.summary = 'Inicia o atendimento (status em_atendimento)'
    #swagger.security = [{ "BearerAuth": [] }]
    #swagger.responses[200] = { schema: { $ref: '#/definitions/Atendimento' } }
  */
  ehAutenticado,
  ehVeterinario,
  controllerAtendimentos.iniciar,
);
router.put(
  "/:id/finalizar",
  /*
    #swagger.tags = ['Atendimentos']
    #swagger.summary = 'Finaliza o atendimento (status finalizado)'
    #swagger.security = [{ "BearerAuth": [] }]
    #swagger.responses[200] = { schema: { $ref: '#/definitions/Atendimento' } }
  */
  ehAutenticado,
  ehVeterinario,
  controllerAtendimentos.finalizar,
);

module.exports = router;
