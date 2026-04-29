import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function fmt(n) { return n.toLocaleString('vi-VN') + 'đ'; }

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const { addItem } = useCart();
  const activeCategory = searchParams.get('category') || '';

  useEffect(() => {
    axios.get('/api/categories').then(r => setCategories(r.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory) params.set('category', activeCategory);
    if (search) params.set('search', search);
    axios.get(`/api/products?${params}`).then(r => {
      setProducts(r.data);
      setLoading(false);
    });
  }, [activeCategory, search]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-black mb-2">Sản Phẩm AKICAT</h1>
          <p className="text-purple-200">Đa dạng lựa chọn, phù hợp mọi nhu cầu của mèo cưng</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text" placeholder="Tìm sản phẩm..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSearchParams({})}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${!activeCategory ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
            >Tất cả</button>
            {categories.map(c => (
              <button
                key={c.slug}
                onClick={() => setSearchParams({ category: c.slug })}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${activeCategory === c.slug ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
              >{c.icon} {c.name}</button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">{loading ? 'Đang tải...' : `${products.length} sản phẩm`}</p>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-lg font-medium">Không tìm thấy sản phẩm</p>
            <p className="text-sm mt-1">Thử từ khóa khác hoặc xóa bộ lọc</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                <div className="relative overflow-hidden">
                  <Link to={`/san-pham/${p.slug}`}>
                    <img src={p.image} alt={p.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{p.badge}</span>
                  )}
                  {p.original_price && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{Math.round((1 - p.price / p.original_price) * 100)}%
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-primary-500 font-medium mb-1">{p.category_name}</p>
                  <Link to={`/san-pham/${p.slug}`}>
                    <h3 className="font-bold text-gray-800 hover:text-primary-700 transition-colors line-clamp-2 text-sm leading-snug mb-1">{p.name}</h3>
                  </Link>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{p.short_desc}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.round(p.rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                    <span className="text-xs text-gray-400 ml-1">({p.review_count})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-black text-primary-700">{fmt(p.price)}</span>
                      {p.original_price && <span className="text-xs text-gray-400 line-through ml-1">{fmt(p.original_price)}</span>}
                    </div>
                    <button
                      onClick={() => addItem(p)}
                      className="w-8 h-8 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center shadow transition-all active:scale-95"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
