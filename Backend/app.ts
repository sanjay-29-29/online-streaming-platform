import express from 'express';

const server = express();

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Hello world');
});

server.use(router);

server.listen(5000, () => {
  console.log('Server is running');
});
