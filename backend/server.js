import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import './db/init.js';
import productsRouter from './routes/products.js';
import categoriesRouter from './routes/categories.js';
import contactsRouter from './routes/contacts.js';
import ordersRouter from './routes/orders.js';
import articlesRouter from './routes/articles.js';
import reviewsRouter from './routes/reviews.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5018;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/reviews', reviewsRouter);

app.get('/api/health', (_, res) => res.json({ status: 'ok', service: 'AKICAT API' }));

app.listen(PORT, () => {
  console.log(`🐱 AKICAT Backend running on http://localhost:${PORT}`);
});
