import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CATEGORIES = ['Tất cả', 'Hướng Dẫn', 'Chăm Sóc Mèo', 'Kiến Thức', 'Thương Hiệu'];

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  useEffect(() => {
    setLoading(true);
    const params = activeCategory !== 'Tất cả' ? `?category=${encodeURIComponent(activeCategory)}` : '';
    axios.get(`/api/articles${params}`).then(r => {
      setArticles(r.data);
      setLoading(false);
    });
  }, [activeCategory]);

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="pt-16 min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-950 to-violet-800 text-white pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-violet-300 mb-4">Góc Kiến Thức</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Blog AKICAT</h1>
          <p className="text-violet-200 text-lg max-w-xl mx-auto">
            Kiến thức chăm sóc mèo, tips vệ sinh và câu chuyện từ cộng đồng yêu mèo Việt Nam.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-10">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === c
                  ? 'bg-violet-700 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-100 shadow-sm'
              }`}>
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="bg-white rounded-3xl h-80 animate-pulse" />)}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 text-stone-400">
            <div className="text-5xl mb-3">📭</div>
            <p className="font-semibold text-lg">Chưa có bài viết</p>
          </div>
        ) : (
          <>
            {/* Featured article */}
            {featured && activeCategory === 'Tất cả' && (
              <Link to={`/blog/${featured.slug}`} className="group block mb-8">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 md:flex">
                  <div className="md:w-1/2 overflow-hidden">
                    <img src={featured.image} alt={featured.title}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                    <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
                      {featured.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-stone-900 group-hover:text-violet-700 transition-colors leading-tight mb-3">
                      {featured.title}
                    </h2>
                    <p className="text-stone-500 leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-stone-400">
                      <span className="flex items-center gap-1.5">
                        <span className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center text-xs font-bold text-violet-600">
                          {featured.author[0]}
                        </span>
                        {featured.author}
                      </span>
                      <span>·</span>
                      <span>{featured.read_time} phút đọc</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Article grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeCategory === 'Tất cả' ? rest : articles).map(a => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ArticleCard({ article }) {
  const date = new Date(article.created_at).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long' });
  return (
    <Link to={`/blog/${article.slug}`}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="overflow-hidden relative">
        <img src={article.image} alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-violet-700 text-xs font-bold px-3 py-1 rounded-full">
          {article.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-stone-800 group-hover:text-violet-700 transition-colors leading-snug mb-2 flex-1 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-stone-500 line-clamp-2 mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-stone-400 pt-3 border-t border-stone-100">
          <span>{date}</span>
          <span>{article.read_time} phút đọc</span>
        </div>
      </div>
    </Link>
  );
}
