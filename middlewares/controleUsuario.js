const passport = require("../config/passport");

exports.ehAutenticado = passport.authenticate("jwt", { session: false });

exports.ehAdmin = function (req, res, next) {
  if (req.user && req.user.perfil === "admin") {
    return next();
  }
  return res
    .status(403)
    .json({ error: "Acesso negado: apenas Administradores." });
};

exports.ehRecepcao = function (req, res, next) {
  if (req.user && req.user.perfil === "recepcao") {
    return next();
  }
  return res.status(403).json({ error: "Acesso negado: apenas Recepção." });
};

exports.ehVeterinario = function (req, res, next) {
  if (req.user && req.user.perfil === "veterinario") {
    return next();
  }
  return res.status(403).json({ error: "Acesso negado: apenas Veterinários." });
};
