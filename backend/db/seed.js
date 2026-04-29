import db from './init.js';

// Skip if already seeded (e.g. server restart on Railway with persistent volume)
const alreadySeeded = db.prepare('SELECT COUNT(*) as n FROM products').get().n > 0;
if (alreadySeeded) {
  console.log('Database already seeded, skipping.');
  process.exit(0);
}

// Fresh seed — clear tables first to avoid stale data
db.exec(`
  DELETE FROM article_reactions;
  DELETE FROM article_comments;
  DELETE FROM reviews;
  DELETE FROM orders;
  DELETE FROM contacts;
  DELETE FROM products;
  DELETE FROM categories;
  DELETE FROM articles;
`);

const categories = [
  { name: 'Gói 8 Lít', slug: 'goi-8l', icon: '🌿', description: 'Cát mèo AKICAT gói 8 Lít — 4kg bentonite trắng + than hoạt tính, phù hợp 1 mèo dùng 3-4 tuần', sort_order: 1 },
  { name: 'Gói 16 Lít', slug: 'goi-16l', icon: '🌿', description: 'Cát mèo AKICAT gói 16 Lít — 8kg bentonite trắng + than hoạt tính, tiết kiệm hơn, phù hợp 2-3 mèo', sort_order: 2 },
];

const catInsert = db.prepare(`INSERT OR IGNORE INTO categories (name, slug, icon, description, sort_order) VALUES (?, ?, ?, ?, ?)`);
categories.forEach(c => catInsert.run(c.name, c.slug, c.icon, c.description, c.sort_order));
const getCatId = (slug) => db.prepare('SELECT id FROM categories WHERE slug = ?').get(slug)?.id;

const flavors = [
  { key: 'tao',   label: 'Mùi Táo',  emoji: '🍎', mainImg: 'Main_02' },
  { key: 'cafe',  label: 'Mùi Cafe', emoji: '☕', mainImg: 'Main_03' },
  { key: 'chanh', label: 'Mùi Chanh',emoji: '🍋', mainImg: 'Main_04' },
];

const sizes = [
  {
    category_slug: 'goi-8l', size: '8L', price: 53000, original_price: null,
    weight: '4kg (4,000g)',
    desc: 'Cát mèo AKICAT 8L — thành phần 60% bentonite trắng + 40% than hoạt tính. Vón cục nhanh sau khi gặp chất thải, ít bụi không ảnh hưởng hô hấp. Khử mùi gần như hoàn toàn, mùi hương thơm dai 7 ngày. Phù hợp 1 mèo dùng 3-4 tuần. Giao từ TP.HCM.',
    features: ['60% bentonite trắng + 40% than hoạt tính', 'Vón cục nhanh, dễ vệ sinh hàng ngày', 'Khử mùi gần như hoàn toàn', 'Mùi hương thơm dai 7 ngày', 'Ít bụi, an toàn đường hô hấp', 'Hạn sử dụng 3 năm'],
    folder: '8L', is_featured: 1,
  },
  {
    category_slug: 'goi-16l', size: '16L', price: 108000, original_price: null,
    weight: '8kg (8,000g)',
    desc: 'Cát mèo AKICAT 16L — gói siêu tiết kiệm cho gia đình nhiều mèo. Cùng công thức 60% bentonite trắng + 40% than hoạt tính cao cấp. Vón cục nhanh, khử mùi gần như hoàn toàn, thơm 7 ngày. Phù hợp 2-3 mèo dùng 3-4 tuần. Giao từ TP.HCM.',
    features: ['Gói lớn tiết kiệm chi phí', '60% bentonite trắng + 40% than hoạt tính', 'Vón cục nhanh, dễ vệ sinh hàng ngày', 'Khử mùi gần như hoàn toàn', 'Mùi hương thơm dai 7 ngày', 'Phù hợp 2-3 mèo'],
    folder: '16L', is_featured: 1,
  },
];

const products = sizes.flatMap(s => flavors.map(f => ({
  category_slug: s.category_slug,
  name: `AKICAT Cát Mèo ${s.size} ${f.label}`,
  slug: `akicat-${s.size.toLowerCase()}-${f.key}`,
  price: s.price,
  original_price: s.original_price,
  unit: 'túi',
  weight: s.weight,
  short_desc: `${f.emoji} ${f.label} — bentonite trắng + than hoạt tính, vón cục nhanh, thơm 7 ngày`,
  description: s.desc,
  features: JSON.stringify(s.features),
  image: `/${s.folder}/${f.mainImg}.jpg`,
  images: JSON.stringify([
    `/${s.folder}/Main_02.jpg`,
    `/${s.folder}/Main_03.jpg`,
    `/${s.folder}/Main_04.jpg`,
    `/${s.folder}/Main_05.jpg`,
  ]),
  stock: 300,
  rating: 4.9,
  review_count: Math.floor(Math.random() * 100) + 80,
  is_featured: s.is_featured,
  badge: f.key === 'cafe' ? 'Yêu Thích' : null,
})));

const prodInsert = db.prepare(`
  INSERT OR IGNORE INTO products (category_id, name, slug, price, original_price, unit, weight, short_desc, description, features, image, images, stock, rating, review_count, is_featured, badge)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
products.forEach(p => {
  const catId = getCatId(p.category_slug);
  prodInsert.run(catId, p.name, p.slug, p.price, p.original_price, p.unit, p.weight, p.short_desc, p.description, p.features, p.image, p.images, p.stock, p.rating, p.review_count, p.is_featured ? 1 : 0, p.badge);
});

const reviews = [
  { slug: 'akicat-8l-tao',    name: 'Ngọc Anh',    rating: 5, comment: 'Mùi táo nhẹ nhàng, mèo nhà mình thích ngay từ lần đầu! Vón cục rất chắc, dễ dọn sạch.' },
  { slug: 'akicat-8l-cafe',   name: 'Minh Khôi',   rating: 5, comment: 'Mùi cafe thơm thoang thoảng, không hắc. Nhà luôn có mùi dễ chịu. Rất ưng!' },
  { slug: 'akicat-8l-chanh',  name: 'Thu Hằng',    rating: 4, comment: 'Mùi chanh tươi mát, khử mùi tốt. Gói 8L dùng vừa đủ 1 tháng cho 1 mèo.' },
  { slug: 'akicat-16l-tao',   name: 'Bảo Long',    rating: 5, comment: 'Nhà 2 mèo dùng gói 16L táo, gần 2 tháng mới hết. Tiết kiệm hơn rất nhiều!' },
  { slug: 'akicat-16l-cafe',  name: 'Phương Linh', rating: 5, comment: 'Mùi cafe của 16L rất sang, nhà 3 mèo không còn ngửi thấy mùi hôi nữa!' },
  { slug: 'akicat-16l-chanh', name: 'Gia Huy',     rating: 5, comment: 'Mùi chanh sạch sẽ, tươi mát. Gói to tiện không phải mua liên tục. Tuyệt!' },
];
const revInsert = db.prepare(`
  INSERT OR IGNORE INTO reviews (product_id, name, rating, comment)
  SELECT p.id, ?, ?, ? FROM products p WHERE p.slug = ?
`);
reviews.forEach(r => revInsert.run(r.name, r.rating, r.comment, r.slug));

const articles = [
  {
    title: 'Cách Chọn Cát Vệ Sinh Phù Hợp Cho Mèo Cưng',
    slug: 'cach-chon-cat-ve-sinh-phu-hop',
    excerpt: 'Gói 8L hay 16L? Mùi táo, cafe hay chanh? Hướng dẫn chi tiết để chọn đúng ngay từ lần đầu.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
    category: 'Hướng Dẫn', author: 'AKICAT Team', read_time: 5,
    content: `<p class="lead">Chọn đúng loại cát ngay từ đầu giúp mèo cưng hài lòng và bạn tiết kiệm được rất nhiều công sức thử nghiệm.</p>
<h2>Gói 8L hay 16L?</h2>
<p><strong>Gói 8L (53.000đ)</strong> phù hợp nếu bạn nuôi 1 mèo, dùng được 3-4 tuần. Lý tưởng để thử lần đầu.</p>
<p><strong>Gói 16L (108.000đ)</strong> tiết kiệm hơn nếu bạn nuôi 2-3 mèo hoặc muốn mua ít lần hơn. Giá mỗi lít thấp hơn gần 10%.</p>
<h2>Chọn Mùi Hương Nào?</h2>
<p><strong>🍎 Mùi Táo:</strong> Nhẹ nhàng, tươi mát, dễ chịu cho cả người và mèo nhạy cảm.</p>
<p><strong>☕ Mùi Cafe:</strong> Ấm áp, sang trọng. Khử mùi mạnh nhờ hương cafe tự nhiên.</p>
<p><strong>🍋 Mùi Chanh:</strong> Sạch sẽ, sảng khoái. Có tính kháng khuẩn tự nhiên từ citrus.</p>
<h2>Lời Khuyên</h2>
<p>Bắt đầu với gói 8L để thử mùi mèo thích. Khi đã biết sở thích, chuyển sang 16L để tiết kiệm chi phí dài hạn.</p>`
  },
  {
    title: '5 Dấu Hiệu Cho Thấy Đã Đến Lúc Phải Thay Cát Cho Mèo',
    slug: '5-dau-hieu-thay-cat-meo',
    excerpt: 'Nhiều chủ mèo không biết khi nào cần thay cát hoàn toàn, dẫn đến môi trường không vệ sinh.',
    image: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800&q=80',
    category: 'Chăm Sóc Mèo', author: 'Dr. Minh Anh', read_time: 4,
    content: `<p class="lead">Thay cát đúng thời điểm là yếu tố quan trọng để mèo luôn dùng khay vệ sinh và giữ sức khỏe tốt.</p>
<h2>1. Mùi Hôi Dù Đã Dọn Hàng Ngày</h2>
<p>Cát đã bão hòa — cần thay toàn bộ, rửa khay và để khô trước khi đổ cát mới.</p>
<h2>2. Cát Không Còn Vón Cục Tốt</h2>
<p>Cát ướt nhão thay vì tạo cục chắc — dấu hiệu cần thay ngay.</p>
<h2>3. Mèo Từ Chối Vào Khay</h2>
<p>Mèo có khứu giác nhạy gấp 14 lần người. Khi mèo tránh khay, đó là tín hiệu cần vệ sinh.</p>
<h2>4. Màu Cát Chuyển Đậm</h2>
<p>Cát đổi màu tối, vón không đều — cát đã bẩn và cần thay mới.</p>
<h2>5. Đã Quá Lịch Khuyến Nghị</h2>
<ul><li>Gói 8L (1 mèo): thay sau 3-4 tuần</li><li>Gói 16L (2-3 mèo): thay sau 3-4 tuần</li><li>Hàng ngày: vớt vón cục và phân 1-2 lần</li></ul>`
  },
  {
    title: 'Tại Sao Nên Chọn Gói 16L Thay Vì Mua 2 Gói 8L?',
    slug: 'tai-sao-nen-chon-goi-16l',
    excerpt: 'Phân tích chi phí thực tế và lợi ích khi chọn gói lớn — tiết kiệm cả tiền lẫn bao bì rác thải.',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80',
    category: 'Kiến Thức', author: 'AKICAT Team', read_time: 3,
    content: `<p class="lead">Hai gói 8L = 106.000đ. Một gói 16L = 108.000đ. Cùng lượng cát nhưng bạn có thêm lợi ích gì?</p>
<h2>So Sánh Chi Phí</h2>
<p>Gói 16L chỉ tốn thêm 2.000đ so với 2 gói 8L nhưng bạn chỉ cần mở 1 túi, ít bao bì hơn và ít lần đặt hàng hơn.</p>
<h2>Tiết Kiệm Thời Gian</h2>
<p>Mua 16L 1 lần/tháng thay vì 8L 2 lần/tháng — tiết kiệm thời gian và công sức đặt hàng.</p>
<h2>Lợi Ích Môi Trường</h2>
<p>Ít bao bì hơn đồng nghĩa ít rác thải hơn. Gói 16L dùng lượng bao bì ít hơn ~35% so với 2 gói 8L.</p>
<h2>Khi Nào Nên Dùng 8L?</h2>
<p>Dùng thử lần đầu, hoặc bạn chỉ có 1 mèo và không có chỗ lưu trữ nhiều.</p>`
  },
  {
    title: 'Tập Cho Mèo Con Sử Dụng Khay Vệ Sinh Đúng Cách',
    slug: 'tap-meo-con-su-dung-khay-ve-sinh',
    excerpt: 'Bắt đầu đúng cách giúp mèo con hình thành thói quen tốt chỉ trong 3–5 ngày.',
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&q=80',
    category: 'Hướng Dẫn', author: 'Dr. Thu Hương', read_time: 5,
    content: `<p class="lead">Mèo là loài vật sạch sẽ bản năng — nhiệm vụ của bạn chỉ là hướng dẫn chúng đúng nơi.</p>
<h2>Bước 1: Chuẩn Bị</h2>
<p>Khay thành thấp (dưới 8cm), đổ cát AKICAT dày 4-5cm. Cát AKICAT ít bụi, không hóa chất độc hại, an toàn cho mèo con.</p>
<h2>Bước 2: Vị Trí Đặt Khay</h2>
<p>Góc yên tĩnh, xa nơi ăn uống ít nhất 1-2 mét. Tránh cạnh máy giặt, tủ lạnh.</p>
<h2>Bước 3: Hướng Dẫn Và Khen</h2>
<p>Đặt mèo vào khay sau ăn hoặc sau ngủ dậy. Khi thành công, khen và thưởng ngay. Không la mắng khi mèo đi sai chỗ.</p>
<p><strong>Quy tắc:</strong> Số khay = số mèo + 1.</p>`
  },
  {
    title: 'AKICAT Và Cam Kết Hướng Đến Sản Phẩm Xanh',
    slug: 'akicat-va-cam-ket-moi-truong',
    excerpt: 'Câu chuyện đằng sau những quyết định thiết kế sản phẩm của AKICAT và hành trình bền vững.',
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800&q=80',
    category: 'Thương Hiệu', author: 'Sáng Lập Viên AKICAT', read_time: 4,
    content: `<p class="lead">Chúng tôi muốn chứng minh rằng kinh doanh có trách nhiệm và lợi nhuận có thể đi cùng nhau.</p>
<h2>Tại Sao Bentonite & Than Hoạt Tính?</h2>
<p>Bentonite là khoáng sét tự nhiên, không qua xử lý hóa chất độc hại. Than hoạt tính từ nguồn nguyên liệu tái tạo có khả năng hấp thụ mùi vượt trội. AKICAT chọn 2 nguyên liệu hoàn toàn tự nhiên này để tạo sản phẩm an toàn cho mèo và gia đình bạn.</p>
<h2>Không Hóa Chất Độc Hại</h2>
<p>Không nước hoa tổng hợp, không chất bảo quản hóa học, không phẩm màu nhân tạo. AKICAT khử mùi bằng than hoạt tính tự nhiên — an toàn 100% dù mèo vô tình liếm tay sau khi đào bới.</p>
<h2>Bao Bì Thân Thiện Môi Trường</h2>
<p>Túi AKICAT thiết kế để tối thiểu hóa rác thải. Gói 16L giúp giảm rác thải bao bì so với mua 2 gói 8L riêng lẻ.</p>
<h2>Một Sản Phẩm, Một Cây Xanh</h2>
<p>Mỗi đơn hàng AKICAT đóng góp vào quỹ trồng rừng ngập mặn Cà Mau. Đến nay cộng đồng AKICAT đã trồng được <strong>hơn 3,200 cây</strong>.</p>`
  },
];

const artInsert = db.prepare(`INSERT OR IGNORE INTO articles (title, slug, excerpt, content, image, category, author, read_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
articles.forEach(a => artInsert.run(a.title, a.slug, a.excerpt, a.content, a.image, a.category, a.author, a.read_time));

console.log('✅ Seeded AKICAT database successfully!');
console.log(`   → ${categories.length} categories`);
console.log(`   → ${products.length} products (3 flavors × 2 sizes)`);
console.log(`   → ${reviews.length} reviews`);
console.log(`   → ${articles.length} articles`);
