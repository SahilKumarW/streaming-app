// server.js
import { create } from 'json-server';
import cors from 'cors';

const server = create();
const router = jsonServer.router('db.json');  // Ensure db.json exists
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);

server.use('/api', router);

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on http://localhost:${PORT}`);
});
