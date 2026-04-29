import { Router } from 'express';
import db from '../db/init.js';

const router = Router();

router.post('/', (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !message) return res.status(400).json({ error: 'Vui lòng nhập tên và nội dung' });
  const r = db.prepare('INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)').run(name, email, phone, message);
  res.status(201).json({ id: r.lastInsertRowid, message: 'Đã gửi thành công!' });
});

router.get('/', (_, res) => {
  res.json(db.prepare('SELECT * FROM contacts ORDER BY id DESC').all());
});

export default router;
