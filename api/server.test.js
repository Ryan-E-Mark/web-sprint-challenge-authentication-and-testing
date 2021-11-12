const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig')
const bcrypt = require('bcryptjs')



beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true);
})

describe('/api/auth', () => {
  describe('/login', () => {
    test('[POST] responds with a 200 status on successful login', async () => {
      const resp = await request(server).post('/api/auth/login')
      .send({ username: "Billy", password: "1234" });
      expect(resp.status).toEqual(200);
    })
    test('[POST] responds with a 404 status with incorrect password', async () => {
      const resp = await request(server).post('/api/auth/login')
      .send({ username: "Billy", password: "1234444" });
      expect(resp.status).toEqual(404);
    })
  })
  describe('/register', () => {
    test('[POST] responds with 201 status on successful register', async () => {
      const resp = await request(server).post('/api/auth/register')
      .send({username: "Timmy", password: "1234"});
      expect(resp.status).toBe(201);
    })
    test('[POST] responds with newly posted user on successful register', async () => {
      const resp = await request(server).post('/api/auth/register')
      .send({username: "Timmy", password: "1234"});
      expect(resp.body).toMatchObject({ "id": 3, "username": "Timmy"});
    })
  })
})