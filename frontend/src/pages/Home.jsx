import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function fmt(n) { return n.toLocaleString('vi-VN') + 'đ'; }

const marqueeItems = [
  '🌿 Bentonite Tự Nhiên', '⚡ Vón Cục Siêu Nhanh', '💨 Khử Mùi 7 Ngày',
  '🖤 Than Hoạt Tính 40%', '💧 Ít Bụi Mịn', '🐾 An Toàn Cho Mèo',
  '🌿 Bentonite Tự Nhiên', '⚡ Vón Cục Siêu Nhanh', '💨 Khử Mùi 7 Ngày',
  '🖤 Than Hoạt Tính 40%', '💧 Ít Bụi Mịn', '🐾 An Toàn Cho Mèo',
];

const features = [
  { icon: '🌿', title: 'Bentonite Tự Nhiên', desc: '60% bentonite trắng chất lượng cao, không hóa chất độc hại, an toàn tuyệt đối cho mèo.' },
  { icon: '⚡', title: 'Vón Cục Siêu Nhanh', desc: 'Hút ẩm tức thì, vón cục chắc chắn, dễ xúc dọn sạch không để lại cặn.' },
  { icon: '🖤', title: 'Khử Mùi Gần Như Hoàn Toàn', desc: '40% than hoạt tính hấp thụ và trung hòa mùi hôi, thơm dai 7 ngày liên tục.' },
  { icon: '💧', title: 'Ít Bụi Mịn', desc: 'Công thức đặc biệt hạn chế bụi tối đa, bảo vệ đường hô hấp cho mèo và chủ.' },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [reviewTab, setReviewTab] = useState('goi-8l');

  useEffect(() => {
    axios.get('/api/products?limit=6').then(r => setProducts(r.data));
    axios.get('/api/articles?limit=3').then(r => setArticles(r.data));
    axios.get('/api/reviews').then(r => setAllReviews(r.data));
  }, []);

  const p8variants = products.filter(p => p.category_slug === 'goi-8l');
  const p16variants = products.filter(p => p.category_slug === 'goi-16l');
  const visibleReviews = allReviews.filter(r => r.category_slug === reviewTab);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-gradient-to-br from-violet-950 via-violet-900 to-violet-800 flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm text-white/90 font-medium mb-8">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Thương hiệu cát mèo #1 Việt Nam
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
                Sạch Từ<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-500">Thiên Nhiên</span>
              </h1>
              <p className="text-lg text-violet-200 leading-relaxed mb-10 max-w-md">
                Cát mèo AKICAT — 60% bentonite trắng + 40% than hoạt tính, vón cục nhanh, khử mùi gần như hoàn toàn, thơm 7 ngày.
              </p>
              <div className="flex flex-wrap gap-3 mb-12">
                <a href="#san-pham" className="btn-white">
                  Chọn Gói Ngay
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </a>
                <Link to="/blog" className="inline-flex items-center gap-2 border border-white/30 text-white/90 hover:bg-white/10 font-medium px-7 py-3 rounded-full transition-all">
                  Đọc Blog
                </Link>
              </div>
              <div className="flex flex-wrap gap-6">
                {[{ num: '10K+', label: 'Khách hàng' }, { num: '4.9★', label: 'Đánh giá' }, { num: '100%', label: 'Tự nhiên' }].map(t => (
                  <div key={t.label}>
                    <p className="text-2xl font-black text-white">{t.num}</p>
                    <p className="text-xs text-violet-300 mt-0.5">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero images */}
            <div className="hidden md:flex justify-center items-end gap-5">
              {/* 8L — slightly lower */}
              <div className="relative mb-6">
                <div className="rounded-3xl overflow-hidden shadow-2xl ring-2 ring-white/20 w-56">
                  <img src="/8L/Main_02.jpg" alt="Gói 8 Lít" className="w-full h-auto" />
                </div>
                <div className="text-center mt-3">
                  <p className="text-white font-bold">Gói 8 Lít</p>
                  <p className="text-orange-300 font-black text-lg">53.000đ</p>
                </div>
              </div>

              {/* 16L — popular badge */}
              <div className="relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-orange-500 text-white text-xs font-black px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg">
                  PHỔ BIẾN NHẤT
                </div>
                <div className="rounded-3xl overflow-hidden shadow-2xl ring-2 ring-orange-400 w-64">
                  <img src="/16L/Main_02.jpg" alt="Gói 16 Lít" className="w-full h-auto" />
                </div>
                <div className="text-center mt-3">
                  <p className="text-white font-bold">Gói 16 Lít</p>
                  <p className="text-orange-300 font-black text-lg">108.000đ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-stone-50 to-transparent" />
      </section>

      {/* ── MARQUEE ── */}
      <section className="bg-violet-700 py-3.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {marqueeItems.map((item, i) => (
            <span key={i} className="text-sm font-semibold text-white/90 mx-8 flex-shrink-0">{item}</span>
          ))}
        </div>
      </section>

      {/* ── 2 PRODUCTS SHOWCASE ── */}
      <section id="san-pham" className="py-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-violet-500">Sản Phẩm</p>
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 mt-2">Chọn Gói Phù Hợp Với Bạn</h2>
            <p className="text-stone-500 mt-3 max-w-lg mx-auto">Cùng công thức bentonite + than hoạt tính cao cấp — 2 kích thước phù hợp mọi nhu cầu</p>
          </div>

          {products.length === 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map(i => <div key={i} className="bg-white rounded-3xl h-[580px] animate-pulse" />)}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
              {p8variants.length > 0 && <ProductShowcaseCard variants={p8variants} />}
              {p16variants.length > 0 && <ProductShowcaseCard variants={p16variants} popular />}
            </div>
          )}

          {/* Comparison table */}
          <div className="mt-12 bg-white rounded-3xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 text-center text-sm font-bold border-b border-stone-100">
              <div className="py-4 text-stone-500">Tiêu chí</div>
              <div className="py-4 text-violet-700 bg-violet-50">Gói 8 Lít</div>
              <div className="py-4 text-orange-600 bg-orange-50">Gói 16 Lít</div>
            </div>
            {[
              ['Phù hợp', '1 mèo', '2–3 mèo'],
              ['Khối lượng', '4kg (4,000g)', '8kg (8,000g)'],
              ['Thời gian dùng', '3–4 tuần', '3–4 tuần'],
              ['Giá mỗi lít', '~6.625đ/L', '~6.750đ/L'],
              ['Freeship', 'Đơn ≥ 300k', '✓ Tất cả'],
            ].map(([label, v1, v2]) => (
              <div key={label} className="grid grid-cols-3 text-center text-sm border-b border-stone-50 last:border-0">
                <div className="py-3.5 px-4 text-stone-500 font-medium">{label}</div>
                <div className="py-3.5 text-stone-700 bg-violet-50/50">{v1}</div>
                <div className="py-3.5 text-stone-700 bg-orange-50/50 font-semibold">{v2}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-violet-500">Tại Sao Chọn AKICAT</p>
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 mt-2">Ưu Điểm Vượt Trội</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="text-center p-6 rounded-2xl bg-stone-50 hover:bg-violet-50 transition-colors group">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-stone-800 mb-2 group-hover:text-violet-700 transition-colors">{f.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND MANIFESTO ── */}
      <section className="bg-stone-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-violet-400 mb-6">Triết Lý Thương Hiệu</p>
          <blockquote className="text-2xl md:text-4xl font-black text-white leading-tight mb-8">
            "Mỗi chú mèo xứng đáng được sống trong môi trường{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-500">sạch sẽ, thơm mát</span>
            {' '}và an toàn."
          </blockquote>
          <p className="text-stone-400 text-sm mb-12">— Đội ngũ sáng lập AKICAT</p>
          <div className="grid grid-cols-3 gap-px bg-stone-700 rounded-2xl overflow-hidden">
            {[{ n: '10,000+', l: 'Chủ mèo tin dùng' }, { n: '4.9 / 5', l: 'Điểm đánh giá' }, { n: '3 mùi hương', l: 'Táo · Cafe · Chanh' }].map(s => (
              <div key={s.l} className="bg-stone-800 py-8 px-4 text-center">
                <p className="text-2xl md:text-3xl font-black text-white">{s.n}</p>
                <p className="text-stone-400 text-xs mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOMER REVIEWS ── */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-violet-500">Đánh Giá</p>
            <h2 className="text-3xl font-black text-stone-900 mt-2">Khách Hàng Nói Gì</h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-8">
            {[
              { key: 'goi-8l', label: '📦 Gói 8 Lít' },
              { key: 'goi-16l', label: '📦 Gói 16 Lít' },
            ].map(tab => (
              <button key={tab.key}
                onClick={() => setReviewTab(tab.key)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                  reviewTab === tab.key
                    ? 'bg-violet-700 text-white shadow-md shadow-violet-200'
                    : 'bg-white text-stone-600 hover:bg-violet-50 border border-stone-200'
                }`}
              >{tab.label}</button>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {visibleReviews.length > 0
              ? visibleReviews.map(r => (
                <div key={r.id} className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex gap-0.5 mb-3">
                    {[1,2,3,4,5].map(i => <span key={i} className={`text-sm ${i <= r.rating ? 'text-yellow-400' : 'text-stone-200'}`}>★</span>)}
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">"{r.comment}"</p>
                  <div className="flex items-center gap-2.5 pt-3 border-t border-stone-100">
                    <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-violet-700 font-bold text-sm flex-shrink-0">
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-stone-800">{r.name}</p>
                      <p className="text-xs text-stone-400">{r.product_name?.replace('AKICAT Cát Mèo ', '')}</p>
                    </div>
                  </div>
                </div>
              ))
              : [1,2,3].map(i => <div key={i} className="bg-white rounded-2xl h-36 animate-pulse" />)
            }
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ── */}
      {articles.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-violet-500">Góc Kiến Thức</p>
                <h2 className="text-3xl font-black text-stone-900 mt-2">Kiến Thức Cho Chủ Mèo</h2>
              </div>
              <Link to="/blog" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-800">
                Xem tất cả <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {articles.map(a => (
                <Link key={a.id} to={`/blog/${a.slug}`} className="group bg-stone-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <img src={a.image} alt={a.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-4">
                    <span className="text-xs font-bold text-violet-500 uppercase tracking-wide">{a.category}</span>
                    <h3 className="font-bold text-stone-800 mt-1 leading-snug line-clamp-2 group-hover:text-violet-700 transition-colors">{a.title}</h3>
                    <p className="text-xs text-stone-400 mt-2">{a.read_time} phút đọc</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-br from-violet-900 to-violet-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="text-5xl mb-5">🐾</div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Sẵn Sàng Cho Trải Nghiệm AKICAT?</h2>
          <p className="text-violet-200 mb-8 text-lg">Giao hàng toàn quốc · Thanh toán khi nhận · Đổi trả 7 ngày</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#san-pham" className="btn-white">Chọn Gói Ngay →</a>
            <Link to="/lien-he" className="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 font-medium px-7 py-3 rounded-full transition-all">
              Tư Vấn Miễn Phí
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const flavorOrder = ['tao', 'cafe', 'chanh'];
const flavorData = [
  { key: 'tao',   emoji: '🍎', label: 'Táo' },
  { key: 'cafe',  emoji: '☕', label: 'Cafe' },
  { key: 'chanh', emoji: '🍋', label: 'Chanh' },
];

function ProductShowcaseCard({ variants, popular }) {
  const { addItem } = useCart();
  const [selectedFlavor, setSelectedFlavor] = useState(0);
  const [activeImg, setActiveImg] = useState(0);

  const sorted = [...variants].sort((a, b) => {
    const ak = a.slug.split('-').pop();
    const bk = b.slug.split('-').pop();
    return flavorOrder.indexOf(ak) - flavorOrder.indexOf(bk);
  });

  const product = sorted[selectedFlavor] || sorted[0];
  if (!product) return null;

  const images = product.images || [product.image];

  const handleFlavorChange = (i) => {
    setSelectedFlavor(i);
    setActiveImg(i); // Main_02=Táo(0), Main_03=Cafe(1), Main_04=Chanh(2)
  };

  return (
    <div className={`bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col relative ${popular ? 'ring-2 ring-orange-400 shadow-xl' : ''}`}>
      {popular && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-orange-500 text-white text-xs font-black px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg">
          ⭐ PHỔ BIẾN NHẤT
        </div>
      )}

      {/* Images */}
      <div className="relative overflow-hidden bg-stone-100">
        <img
          src={images[activeImg] || product.image}
          alt={product.name}
          className="w-full h-72 object-cover transition-all duration-300"
        />
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-4">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${i === activeImg ? 'border-violet-500 scale-105' : 'border-white/80'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-bold text-violet-500 uppercase tracking-wide mb-1">{product.category_name}</p>
            <h3 className="text-xl font-black text-stone-900">AKICAT {product.category_name}</h3>
          </div>
          <div className="text-right flex-shrink-0 ml-3">
            <p className="text-2xl font-black text-violet-700">{fmt(product.price)}</p>
            <p className="text-xs text-stone-400 mt-0.5">{product.weight}</p>
          </div>
        </div>

        {/* Flavor selector */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-stone-500 mb-2.5">Chọn mùi hương:</p>
          <div className="flex gap-2">
            {flavorData.map((fd, i) => (
              <button key={fd.key}
                onClick={() => handleFlavorChange(i)}
                className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                  i === selectedFlavor
                    ? 'border-violet-500 bg-violet-50 text-violet-700'
                    : 'border-stone-200 text-stone-500 hover:border-violet-300'
                }`}
              >
                {fd.emoji} {fd.label}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-1.5 mb-5 flex-1">
          {product.features?.slice(0, 4).map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-stone-600">
              <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex gap-3 mt-auto">
          <button
            onClick={() => addItem(product)}
            className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 ${
              popular
                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-200'
                : 'bg-violet-700 hover:bg-violet-800 text-white shadow-md shadow-violet-200'
            }`}
          >
            Thêm Vào Giỏ
          </button>
          <Link to={`/san-pham/${product.slug}`}
            className="px-4 py-3 rounded-2xl border-2 border-stone-200 hover:border-violet-400 text-stone-500 hover:text-violet-700 font-semibold text-sm transition-all">
            Chi Tiết
          </Link>
        </div>
      </div>
    </div>
  );
}
