const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("./server");

class Usuario extends Model {}
Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    perfil: {
      type: DataTypes.ENUM("recepcao", "admin", "veterinario"),
      allowNull: false,
      defaultValue: "recepcao",
    },
  },
  {
    sequelize,
    modelName: "Usuario",
    freezeTableName: true,
    createdAt: "criada_em",
    updatedAt: "atualizada_em",
  },
);

class Pet extends Model {}
Pet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    especie: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Pet",
    freezeTableName: true,
    createdAt: "criada_em",
    updatedAt: "atualizada_em",
  },
);

class Atendimento extends Model {}
Atendimento.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    data_hora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "agendado",
        "em_atendimento",
        "finalizado",
        "cancelado",
      ),
      allowNull: false,
      defaultValue: "agendado",
    },
    pet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Atendimento",
    freezeTableName: true,
    createdAt: "criada_em",
    updatedAt: "atualizada_em",
  },
);

Pet.hasMany(Atendimento, { foreignKey: "pet_id" });
Atendimento.belongsTo(Pet, { foreignKey: "pet_id" });

Usuario.hasMany(Atendimento, { foreignKey: "usuario_id" });
Atendimento.belongsTo(Usuario, { foreignKey: "usuario_id" });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Modelos sincronizados com o banco de dados.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar modelos: ", error);
  });

module.exports = { Usuario, Pet, Atendimento };
