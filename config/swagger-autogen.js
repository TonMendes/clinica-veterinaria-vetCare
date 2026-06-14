const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "VetCare API",
    version: "1.0.0",
    description:
      "API REST para gerenciamento de pets e atendimentos veterinários com autenticação JWT",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Informe o token no formato: Bearer {token}",
    },
  },
  definitions: {
    UsuarioCriado: {
      id: 1,
      nome: "Admin",
      usuario: "admin",
      perfil: "admin",
    },
    NovoUsuario: {
      nome: "Admin",
      usuario: "admin",
      senha: "senha123",
      perfil: "admin",
    },
    LoginUsuario: {
      usuario: "admin",
      senha: "senha123",
    },
    LoginResposta: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      usuario: {
        id: 1,
        nome: "Admin",
        usuario: "admin",
        perfil: "admin",
      },
    },
    Pet: {
      id: 1,
      nome: "Spike",
      especie: "cachorro",
      criada_em: "2026-06-12T01:35:18.000Z",
      atualizada_em: "2026-06-12T01:35:18.000Z",
    },
    NovoPet: {
      nome: "Spike",
      especie: "cachorro",
    },
    Atendimento: {
      id: 1,
      data_hora: "2026-06-11T14:30:00.000Z",
      motivo: "Consulta de rotina e vacinação",
      status: "agendado",
      pet_id: 1,
      usuario_id: 1,
      criada_em: "2026-06-12T01:45:19.000Z",
      atualizada_em: "2026-06-12T01:45:19.000Z",
    },
    NovoAtendimento: {
      pet_id: 1,
      data_hora: "2026-06-11T14:30:00.000Z",
      motivo: "Consulta de rotina e vacinação",
    },
  },
};

const outputFile = "./config/swagger_output.json";
const routes = ["./app.js"];

swaggerAutogen(outputFile, routes, doc);
