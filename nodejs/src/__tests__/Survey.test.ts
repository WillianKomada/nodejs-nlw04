import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";

import createConnection from "../database";

describe("Surveys", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll( async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new survey", async () => {
    const response = await request(app).post("/surveys").send({
      title: "Title Example",
      description: "Description Example"
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    // Posso utilizar quantos expect quiser
  });

  it("Should be able to get all surveys", async () => {
    await request(app).post("/surveys").send({
      title: "Title Example2",
      description: "Description Example2"
    });

    const response = await request(app).get("/surveys");

    expect(response.body.length).toBe(2);
  });
});

/* para executar yarn test -i */

/**
 * para executar yarn test -i e bão yarn test
 * 
 * Por padrão o jest não trabalha com execuções em lines
 * e sim, execuções simultâneas
 * Por conta disso ocorre o erro da leitura na execução
 * 
 * Utilizar rimraf no package.json para remover o BD invés de 'del' ou 'rm'
 */