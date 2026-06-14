const { Atendimento, Pet } = require("../model/modelos");

exports.cadastro = async function (req, res) {
  const novo_atendimento = {
    data_hora: req.body.data_hora,
    motivo: (req.body.motivo || "").trim(),
    pet_id: req.body.pet_id,
  };

  const errors = [];

  if (!novo_atendimento.data_hora) {
    errors.push({ msg: "Data e hora é obrigatória" });
  } else if (isNaN(new Date(novo_atendimento.data_hora).getTime())) {
    errors.push({ msg: "Data e hora inválida" });
  }

  if (!novo_atendimento.motivo) {
    errors.push({ msg: "Motivo é obrigatório" });
  }

  const pet_id_numero = Number(novo_atendimento.pet_id);
  if (
    !novo_atendimento.pet_id ||
    !Number.isInteger(pet_id_numero) ||
    pet_id_numero <= 0
  ) {
    errors.push({ msg: "Pet é obrigatório" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const pet = await Pet.findByPk(pet_id_numero);
    if (!pet) {
      return res.status(404).json({ error: "Pet não encontrado" });
    }

    const atendimento_criado = await Atendimento.create({
      data_hora: novo_atendimento.data_hora,
      motivo: novo_atendimento.motivo,
      pet_id: pet_id_numero,
      usuario_id: req.user.id,
    });
    return res.status(201).json(atendimento_criado);
  } catch (error) {
    console.error("Erro ao cadastrar atendimento:", error);
    return res.status(500).json({ error: "Erro ao cadastrar atendimento" });
  }
};

exports.consulta = async function (req, res) {
  res.set("Cache-Control", "private, max-age=86400, no-cache");

  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const atendimento = await Atendimento.findByPk(id, {
      include: [{ model: Pet, attributes: ["id", "nome", "especie"] }],
    });
    if (!atendimento) {
      return res.status(404).json({ error: "Atendimento não encontrado" });
    }
    return res.json(atendimento);
  } catch (error) {
    console.error("Erro ao consultar atendimento:", error);
    return res.status(500).json({ error: "Erro ao consultar atendimento" });
  }
};

exports.iniciar = async function (req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const atendimento = await Atendimento.findByPk(id);
    if (!atendimento) {
      return res.status(404).json({ error: "Atendimento não encontrado" });
    }
    if (atendimento.status === "em_atendimento") {
      return res
        .status(400)
        .json({ error: "Atendimento já está com este status" });
    }
    atendimento.status = "em_atendimento";
    await atendimento.save();
    return res.json(atendimento);
  } catch (error) {
    console.error("Erro ao iniciar atendimento:", error);
    return res.status(500).json({ error: "Erro ao iniciar atendimento" });
  }
};

exports.finalizar = async function (req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const atendimento = await Atendimento.findByPk(id);
    if (!atendimento) {
      return res.status(404).json({ error: "Atendimento não encontrado" });
    }
    if (atendimento.status === "finalizado") {
      return res
        .status(400)
        .json({ error: "Atendimento já está com este status" });
    }
    atendimento.status = "finalizado";
    await atendimento.save();
    return res.json(atendimento);
  } catch (error) {
    console.error("Erro ao finalizar atendimento:", error);
    return res.status(500).json({ error: "Erro ao finalizar atendimento" });
  }
};
