const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Usuario } = require("../model/modelos");

exports.cadastro = async function (req, res) {
  const novo_usuario = {
    nome: (req.body.nome || "").trim(),
    usuario: (req.body.usuario || "").trim(),
    senha: req.body.senha,
    perfil: req.body.perfil,
  };

  const errors = [];

  if (!novo_usuario.nome) {
    errors.push({ msg: "Nome é obrigatório" });
  }

  if (!novo_usuario.usuario) {
    errors.push({ msg: "Usuário é obrigatório" });
  }

  if (!novo_usuario.senha || novo_usuario.senha.length < 6) {
    errors.push({ msg: "Senha deve ter no mínimo 6 caracteres" });
  }

  const perfis_permitidos = ["recepcao", "admin", "veterinario"];
  if (novo_usuario.perfil && !perfis_permitidos.includes(novo_usuario.perfil)) {
    errors.push({ msg: "Perfil inválido" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const existente = await Usuario.findOne({
      where: { usuario: novo_usuario.usuario },
    });
    if (existente) {
      return res.status(400).json({
        errors: [
          { msg: "Já existe um usuário cadastrado com este identificador" },
        ],
      });
    }

    const senha_hash = await bcrypt.hash(novo_usuario.senha, 10);

    const usuario_criado = await Usuario.create({
      nome: novo_usuario.nome,
      usuario: novo_usuario.usuario,
      senha_hash: senha_hash,
      perfil: novo_usuario.perfil || "recepcao",
    });

    return res.status(201).json({
      id: usuario_criado.id,
      nome: usuario_criado.nome,
      usuario: usuario_criado.usuario,
      perfil: usuario_criado.perfil,
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};

exports.login = async function (req, res) {
  const usuario = (req.body.usuario || "").trim();
  const senha = req.body.senha;

  const errors = [];

  if (!usuario || !senha) {
    errors.push({ msg: "Usuário e senha são obrigatórios" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const usuario_encontrado = await Usuario.findOne({ where: { usuario } });
    if (!usuario_encontrado) {
      return res
        .status(401)
        .json({ errors: [{ msg: "Credenciais inválidas" }] });
    }

    const senha_confere = await bcrypt.compare(
      senha,
      usuario_encontrado.senha_hash,
    );
    if (!senha_confere) {
      return res
        .status(401)
        .json({ errors: [{ msg: "Credenciais inválidas" }] });
    }

    const token = jwt.sign(
      { id: usuario_encontrado.id, perfil: usuario_encontrado.perfil },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    return res.status(200).json({
      token,
      usuario: {
        id: usuario_encontrado.id,
        nome: usuario_encontrado.nome,
        usuario: usuario_encontrado.usuario,
        perfil: usuario_encontrado.perfil,
      },
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    return res.status(500).json({ error: "Erro ao realizar login" });
  }
};
