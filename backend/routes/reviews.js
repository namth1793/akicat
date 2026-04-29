import { Router } from 'express';
import db from '../db/init.js';

const router = Router();

router.get('/', (req, res) => {
  const rows = db.prepare(`
    SELECT r.*, p.name as product_name, p.slug as product_slug, c.slug as category_slug, c.name as category_name
    FROM reviews r
    JOIN products p ON r.product_id = p.id
    JOIN categories c ON p.category_id = c.id
    ORDER BY r.id ASC
  `).all();
  res.json(rows);
});

export default router;
