import express from 'express';

const app = express();
app.use(express.json());

import vendorsRouter from './router/vendors';
import productsRouter from './router/products';

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api/v1/vendors', vendorsRouter);
app.use('/api/v1/products', productsRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
