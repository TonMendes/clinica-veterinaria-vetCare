exports.index = function (req, res) {
  res.set("Cache-Control", "no-store");
  const informacoes = {
    nome: "API VetCare",
    descricao: "API RESTful para gerenciamento de atendimentos veterinários",
    versao: "1.0",
    tecnologias: ["Node.js", "Express", "Sequelize", "JWT", "Swagger"],
    status: "online",
    timestamp: new Date().toLocaleString("pt-BR"),
    documentacao: `${req.protocol}://${req.get("host")}/api-docs`,
  };
  return res.json(informacoes);
};
