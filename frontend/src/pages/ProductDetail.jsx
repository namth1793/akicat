import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function fmt(n) { return n.toLocaleString('vi-VN') + 'đ'; }

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/products/${slug}`).then(r => {
      setProduct(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <div className="text-center text-gray-400"><div className="text-5xl mb-3 animate-bounce">🐾</div><p>Đang tải...</p></div>
    </div>
  );

  if (!product) return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <div className="text-center"><p className="text-xl font-bold text-gray-700 mb-4">Không tìm thấy sản phẩm</p><Link to="/san-pham" className="btn-primary">Xem tất cả sản phẩm</Link></div>
    </div>
  );

  const discount = product.original_price ? Math.round((1 - product.price / product.original_price) * 100) : 0;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary-600">Trang chủ</Link>
          <span className="mx-2">›</span>
          <Link to="/san-pham" className="hover:text-primary-600">Sản phẩm</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* Images */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-3">
              <img
                src={product.images?.[activeImg] || product.image}
                alt={product.name}
                className="w-full h-80 md:h-96 object-cover"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${i === activeImg ? 'border-primary-500' : 'border-gray-200'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.badge && (
              <span className="inline-block bg-accent-500 text-white text-sm font-bold px-3 py-1 rounded-full mb-3">{product.badge}</span>
            )}
            <p className="text-primary-500 font-medium text-sm mb-1">{product.category_name}</p>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className={`w-5 h-5 ${i <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating}/5 ({product.review_count} đánh giá)</span>
            </div>

            <p className="text-gray-600 mb-5 leading-relaxed">{product.short_desc}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl font-black text-primary-700">{fmt(product.price)}</span>
              {product.original_price && (
                <>
                  <span className="text-xl text-gray-400 line-through">{fmt(product.original_price)}</span>
                  <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded-full">-{discount}%</span>
                </>
              )}
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'Khối lượng', value: product.weight },
                { label: 'Tình trạng', value: product.stock > 0 ? '✅ Còn hàng' : '❌ Hết hàng' },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 rounded-xl px-3 py-2.5">
                  <p className="text-xs text-gray-400">{s.label}</p>
                  <p className="font-semibold text-sm text-gray-800 mt-0.5">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Detailed specs */}
            <div className="bg-violet-50 rounded-2xl p-4 mb-5 text-sm">
              <p className="font-bold text-stone-700 mb-3 text-xs uppercase tracking-wider">Chi Tiết Sản Phẩm</p>
              <div className="space-y-2">
                {[
                  ['Thương hiệu', 'AKICAT'],
                  ['Vật liệu', 'Đất sét, Bentonite, Than Hoạt Tính'],
                  ['Thành phần', '60% Bentonite trắng + 40% Than hoạt tính'],
                  ['Hạn sử dụng', '3 năm'],
                  ['Khử mùi', 'Thơm dai 7 ngày'],
                  ['Gửi từ', 'Thành phố Hồ Chí Minh'],
                  ['Loại thú cưng', 'Mèo'],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <span className="text-stone-400 w-28 flex-shrink-0">{k}</span>
                    <span className="text-stone-700 font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-2.5 hover:bg-gray-100 transition-colors text-lg font-bold">−</button>
                <span className="px-4 py-2.5 font-bold min-w-[3rem] text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-4 py-2.5 hover:bg-gray-100 transition-colors text-lg font-bold">+</button>
              </div>
              <button
                onClick={handleAdd}
                className={`flex-1 font-bold py-3 px-6 rounded-xl transition-all active:scale-95 ${added ? 'bg-green-500 text-white' : 'bg-primary-600 hover:bg-primary-700 text-white'}`}
              >
                {added ? '✓ Đã thêm vào giỏ!' : 'Thêm Vào Giỏ Hàng'}
              </button>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-2">
              {['🚚 Freeship >300k', '🔄 Đổi trả 7 ngày', '💯 Hàng chính hãng'].map(b => (
                <span key={b} className="bg-primary-50 text-primary-700 text-xs font-medium px-3 py-1.5 rounded-full">{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Description + Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Mô Tả Sản Phẩm</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ưu Điểm Nổi Bật</h2>
            <ul className="space-y-2">
              {product.features?.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-primary-500 mt-0.5 flex-shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reviews */}
        {product.reviews?.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Đánh Giá Từ Khách Hàng</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.reviews.map(r => (
                <div key={r.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex gap-0.5 mb-2">
                    {[1,2,3,4,5].map(i => <span key={i} className={`text-sm ${i <= r.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>)}
                  </div>
                  <p className="text-sm text-gray-600 italic mb-3">"{r.comment}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{r.name}</p>
                      <p className="text-xs text-gray-400">{new Date(r.created_at).toLocaleDateString('vi-VN')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
