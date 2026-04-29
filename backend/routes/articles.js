import { Router } from 'express';
import db from '../db/init.js';

const router = Router();

router.get('/', (req, res) => {
  const { category, limit = 10, offset = 0 } = req.query;
  let sql = 'SELECT id, title, slug, excerpt, image, category, author, read_time, created_at FROM articles WHERE 1=1';
  const params = [];
  if (category) { sql += ' AND category = ?'; params.push(category); }
  sql += ' ORDER BY id DESC LIMIT ? OFFSET ?';
  params.push(Number(limit), Number(offset));
  res.json(db.prepare(sql).all(...params));
});

router.get('/:slug', (req, res) => {
  const article = db.prepare('SELECT * FROM articles WHERE slug = ?').get(req.params.slug);
  if (!article) return res.status(404).json({ error: 'Not found' });
  const likes = db.prepare("SELECT COUNT(*) as n FROM article_reactions WHERE article_id = ? AND type = 'like'").get(article.id).n;
  const dislikes = db.prepare("SELECT COUNT(*) as n FROM article_reactions WHERE article_id = ? AND type = 'dislike'").get(article.id).n;
  const comments = db.prepare('SELECT * FROM article_comments WHERE article_id = ? AND is_approved = 1 ORDER BY id DESC').all(article.id);
  res.json({ ...article, likes, dislikes, comments });
});

router.post('/:id/react', (req, res) => {
  const { type, client_id } = req.body;
  if (!['like', 'dislike'].includes(type) || !client_id) return res.status(400).json({ error: 'Invalid' });
  const existing = db.prepare('SELECT * FROM article_reactions WHERE article_id = ? AND client_id = ?').get(req.params.id, client_id);
  if (existing) {
    if (existing.type === type) {
      db.prepare('DELETE FROM article_reactions WHERE id = ?').run(existing.id);
    } else {
      db.prepare('UPDATE article_reactions SET type = ? WHERE id = ?').run(type, existing.id);
    }
  } else {
    db.prepare('INSERT INTO article_reactions (article_id, client_id, type) VALUES (?, ?, ?)').run(req.params.id, client_id, type);
  }
  const likes = db.prepare("SELECT COUNT(*) as n FROM article_reactions WHERE article_id = ? AND type = 'like'").get(req.params.id).n;
  const dislikes = db.prepare("SELECT COUNT(*) as n FROM article_reactions WHERE article_id = ? AND type = 'dislike'").get(req.params.id).n;
  res.json({ likes, dislikes });
});

router.post('/:id/comments', (req, res) => {
  const { name, content } = req.body;
  if (!name?.trim() || !content?.trim()) return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin' });
  const r = db.prepare('INSERT INTO article_comments (article_id, name, content) VALUES (?, ?, ?)').run(req.params.id, name.trim(), content.trim());
  const now = new Date().toLocaleString('vi-VN');
  res.status(201).json({ id: r.lastInsertRowid, article_id: Number(req.params.id), name: name.trim(), content: content.trim(), created_at: now, is_approved: 1 });
});

export default router;
