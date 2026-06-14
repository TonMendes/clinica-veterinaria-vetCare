var express = require("express");
var router = express.Router();
var controllerUsuarios = require("../controller/controllerUsuarios.js");

router.post(
  "/cadastro",
  /*
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Cadastro de novo usuário'
    #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/NovoUsuario' } }
    #swagger.responses[201] = { schema: { $ref: '#/definitions/UsuarioCriado' } }
  */
  controllerUsuarios.cadastro,
);
router.post(
  "/login",
  /*
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Login de usuário'
    #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/LoginUsuario' } }
    #swagger.responses[200] = { schema: { $ref: '#/definitions/LoginResposta' } }
  */
  controllerUsuarios.login,
);

module.exports = router;
