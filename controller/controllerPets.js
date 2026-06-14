const { Pet } = require("../model/modelos");

exports.cadastro = async function (req, res) {
  const novo_pet = {
    nome: (req.body.nome || "").trim(),
    especie: (req.body.especie || "").trim(),
  };

  const errors = [];

  if (!novo_pet.nome) {
    errors.push({ msg: "Nome é obrigatório" });
  }

  if (!novo_pet.especie) {
    errors.push({ msg: "Espécie é obrigatória" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const pet_criado = await Pet.create({
      nome: novo_pet.nome,
      especie: novo_pet.especie,
    });
    return res.status(201).json(pet_criado);
  } catch (error) {
    console.error("Erro ao cadastrar pet:", error);
    return res.status(500).json({ error: "Erro ao cadastrar pet" });
  }
};

exports.listar = async function (req, res) {
  res.set("Cache-Control", "public, max-age=15768000, no-cache");

  const filtro = {};
  if (req.query.especie) {
    filtro.especie = req.query.especie.trim();
  }

  try {
    const pets = await Pet.findAll({ where: filtro });
    return res.json(pets);
  } catch (error) {
    console.error("Erro ao listar pets:", error);
    return res.status(500).json({ error: "Erro ao listar pets" });
  }
};
