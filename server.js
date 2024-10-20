// server.js
import { create } from 'json-server';
import cors from 'cors';
import express from 'express';

const server = create();
const router = jsonServer.router('db.json');  // Ensure db.json exists
const middlewares = jsonServer.defaults();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
  origin: 'http://localhost:5175', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

server.use(middlewares);

server.use('/api', router);

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on http://localhost:${PORT}`);
});
