import express from 'express';

const app = express();
app.use(express.json());

import apiRouter from './router/api';

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api', apiRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
