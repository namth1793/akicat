import { Router } from 'express';
import db from '../db/init.js';

const router = Router();

router.get('/', (req, res) => {
  const { category, featured, search, limit = 20, offset = 0 } = req.query;
  let sql = `
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM products p LEFT JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `;
  const params = [];
  if (category) { sql += ' AND c.slug = ?'; params.push(category); }
  if (featured === '1') { sql += ' AND p.is_featured = 1'; }
  if (search) { sql += ' AND (p.name LIKE ? OR p.short_desc LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
  sql += ' ORDER BY p.is_featured DESC, p.id ASC LIMIT ? OFFSET ?';
  params.push(Number(limit), Number(offset));
  const rows = db.prepare(sql).all(...params);
  const parsed = rows.map(r => ({
    ...r,
    features: r.features ? JSON.parse(r.features) : [],
    images: r.images ? JSON.parse(r.images) : [r.image],
    is_featured: !!r.is_featured
  }));
  res.json(parsed);
});

router.get('/:slug', (req, res) => {
  const row = db.prepare(`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM products p LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ?
  `).get(req.params.slug);
  if (!row) return res.status(404).json({ error: 'Product not found' });
  const reviews = db.prepare('SELECT * FROM reviews WHERE product_id = ? ORDER BY id DESC').all(row.id);
  res.json({
    ...row,
    features: row.features ? JSON.parse(row.features) : [],
    images: row.images ? JSON.parse(row.images) : [row.image],
    is_featured: !!row.is_featured,
    reviews
  });
});

export default router;
