import { Router } from 'express';
import db from '../db/init.js';

const router = Router();

function genCode() {
  return 'AKI' + Date.now().toString().slice(-7);
}

router.post('/', (req, res) => {
  const { name, phone, email, address, items, total, note } = req.body;
  if (!name || !phone || !address || !items?.length) {
    return res.status(400).json({ error: 'Thiếu thông tin đặt hàng' });
  }
  const code = genCode();
  const r = db.prepare(`
    INSERT INTO orders (order_code, name, phone, email, address, items_json, total, note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(code, name, phone, email, address, JSON.stringify(items), total, note);
  res.status(201).json({ id: r.lastInsertRowid, order_code: code, message: 'Đặt hàng thành công!' });
});

router.get('/', (_, res) => {
  const orders = db.prepare('SELECT * FROM orders ORDER BY id DESC').all();
  res.json(orders.map(o => ({ ...o, items: JSON.parse(o.items_json) })));
});

export default router;
