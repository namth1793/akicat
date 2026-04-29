import { Router } from 'express';
import db from '../db/init.js';

const router = Router();

router.get('/', (_, res) => {
  const cats = db.prepare('SELECT * FROM categories ORDER BY sort_order').all();
  const result = cats.map(c => ({
    ...c,
    product_count: db.prepare('SELECT COUNT(*) as n FROM products WHERE category_id = ?').get(c.id).n
  }));
  res.json(result);
});

export default router;
