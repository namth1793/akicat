import Database from 'better-sqlite3';
import { mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
mkdirSync(`${__dirname}/../data`, { recursive: true });

const db = new Database(`${__dirname}/../data/akicat.db`);

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT,
    description TEXT,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    price INTEGER NOT NULL,
    original_price INTEGER,
    unit TEXT DEFAULT 'túi',
    weight TEXT,
    short_desc TEXT,
    description TEXT,
    features TEXT,
    image TEXT,
    images TEXT,
    stock INTEGER DEFAULT 100,
    rating REAL DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    is_featured INTEGER DEFAULT 0,
    badge TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    name TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    comment TEXT,
    avatar TEXT,
    created_at TEXT DEFAULT (datetime('now','localtime')),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    message TEXT,
    created_at TEXT DEFAULT (datetime('now','localtime'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_code TEXT UNIQUE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    address TEXT NOT NULL,
    items_json TEXT NOT NULL,
    total INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    note TEXT,
    created_at TEXT DEFAULT (datetime('now','localtime'))
  );

  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    image TEXT,
    category TEXT DEFAULT 'Kiến Thức',
    author TEXT DEFAULT 'AKICAT Team',
    read_time INTEGER DEFAULT 5,
    created_at TEXT DEFAULT (datetime('now','localtime'))
  );

  CREATE TABLE IF NOT EXISTS article_reactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id INTEGER,
    client_id TEXT NOT NULL,
    type TEXT CHECK(type IN ('like','dislike')),
    created_at TEXT DEFAULT (datetime('now','localtime')),
    FOREIGN KEY (article_id) REFERENCES articles(id),
    UNIQUE(article_id, client_id)
  );

  CREATE TABLE IF NOT EXISTS article_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id INTEGER,
    name TEXT NOT NULL,
    content TEXT NOT NULL,
    is_approved INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now','localtime')),
    FOREIGN KEY (article_id) REFERENCES articles(id)
  );
`);

export default db;
