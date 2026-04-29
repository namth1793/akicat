import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function getClientId() {
  let id = localStorage.getItem('akicat_cid');
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('akicat_cid', id);
  }
  return id;
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [myReaction, setMyReaction] = useState(null); // 'like' | 'dislike' | null
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({ name: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);
  const commentRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(`akicat_reaction_${slug}`);
    if (saved) setMyReaction(saved);
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/articles/${slug}`).then(r => {
      setArticle(r.data);
      setLikes(r.data.likes);
      setDislikes(r.data.dislikes);
      setComments(r.data.comments || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  const handleReact = async (type) => {
    const client_id = getClientId();
    const newType = myReaction === type ? null : type;
    try {
      const res = await axios.post(`/api/articles/${article.id}/react`, { type, client_id });
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
      setMyReaction(newType);
      if (newType) localStorage.setItem(`akicat_reaction_${slug}`, newType);
      else localStorage.removeItem(`akicat_reaction_${slug}`);
    } catch {/* ignore */}
  };

  const handleComment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post(`/api/articles/${article.id}/comments`, commentForm);
      setComments(prev => [res.data, ...prev]);
      setCommentForm({ name: '', content: '' });
      setCommentSuccess(true);
      setTimeout(() => setCommentSuccess(false), 3000);
    } catch {
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center text-stone-400">
        <div className="text-5xl mb-3 animate-bounce">🐾</div>
        <p>Đang tải bài viết...</p>
      </div>
    </div>
  );

  if (!article) return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl font-bold text-stone-700 mb-4">Không tìm thấy bài viết</p>
        <Link to="/blog" className="btn-primary">← Quay lại Blog</Link>
      </div>
    </div>
  );

  const date = new Date(article.created_at).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="pt-16 min-h-screen bg-stone-50">
      {/* Hero image */}
      <div className="w-full h-72 md:h-[420px] overflow-hidden relative">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 max-w-4xl mx-auto">
          <span className="inline-block bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            {article.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight max-w-2xl">
            {article.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb + meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200">
          <nav className="text-sm text-stone-400">
            <Link to="/" className="hover:text-violet-600 transition-colors">Trang chủ</Link>
            <span className="mx-2">›</span>
            <Link to="/blog" className="hover:text-violet-600 transition-colors">Blog</Link>
            <span className="mx-2">›</span>
            <span className="text-stone-600 font-medium line-clamp-1 max-w-[200px] inline-block align-bottom">{article.title}</span>
          </nav>
          <div className="flex items-center gap-4 text-sm text-stone-400">
            <span className="flex items-center gap-1.5">
              <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center text-xs font-bold text-violet-600">
                {article.author[0]}
              </div>
              {article.author}
            </span>
            <span>·</span>
            <span>{date}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {article.read_time} phút đọc
            </span>
          </div>
        </div>

        {/* Article content */}
        <div
          className="prose-article max-w-none mb-10"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Reactions */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm mb-8">
          <p className="font-bold text-stone-800 text-lg mb-2">Bài viết này có hữu ích không?</p>
          <p className="text-stone-500 text-sm mb-5">Phản hồi của bạn giúp chúng tôi tạo ra nội dung tốt hơn.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleReact('like')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95 ${
                myReaction === 'like'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                  : 'bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              <svg className="w-5 h-5" fill={myReaction === 'like' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              Hữu ích
              <span className={`font-black text-base ${myReaction === 'like' ? 'text-white' : 'text-emerald-600'}`}>{likes}</span>
            </button>

            <button
              onClick={() => handleReact('dislike')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95 ${
                myReaction === 'dislike'
                  ? 'bg-red-500 text-white shadow-md shadow-red-200'
                  : 'bg-stone-100 text-stone-600 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <svg className="w-5 h-5" fill={myReaction === 'dislike' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
              Chưa hữu ích
              <span className={`font-black text-base ${myReaction === 'dislike' ? 'text-white' : 'text-red-500'}`}>{dislikes}</span>
            </button>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm mb-8" ref={commentRef}>
          <h2 className="text-xl font-black text-stone-900 mb-6 flex items-center gap-2">
            💬 Bình Luận
            <span className="text-sm font-medium text-stone-400 bg-stone-100 px-2.5 py-0.5 rounded-full">{comments.length}</span>
          </h2>

          {/* Comment form */}
          <div className="bg-stone-50 rounded-2xl p-5 mb-8">
            <h3 className="font-bold text-stone-700 mb-4 text-sm">Để lại bình luận của bạn</h3>
            {commentSuccess && (
              <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Bình luận của bạn đã được đăng!
              </div>
            )}
            <form onSubmit={handleComment} className="space-y-3">
              <input
                type="text" required placeholder="Tên của bạn *"
                value={commentForm.name}
                onChange={e => setCommentForm(v => ({ ...v, name: e.target.value }))}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent"
              />
              <textarea
                required rows={3} placeholder="Chia sẻ suy nghĩ của bạn về bài viết này..."
                value={commentForm.content}
                onChange={e => setCommentForm(v => ({ ...v, content: e.target.value }))}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent resize-none"
              />
              <button type="submit" disabled={submitting}
                className="btn-primary !py-2.5 !px-6 !text-sm disabled:opacity-60">
                {submitting ? 'Đang gửi...' : 'Gửi Bình Luận →'}
              </button>
            </form>
          </div>

          {/* Comment list */}
          {comments.length === 0 ? (
            <div className="text-center py-8 text-stone-400">
              <div className="text-3xl mb-2">💭</div>
              <p className="text-sm">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map(c => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-violet-400 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {c.name[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 bg-stone-50 rounded-2xl px-4 py-3">
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="font-bold text-stone-800 text-sm">{c.name}</span>
                      <span className="text-xs text-stone-400">
                        {new Date(c.created_at).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back */}
        <div className="text-center">
          <Link to="/blog" className="btn-outline">← Quay Lại Blog</Link>
        </div>
      </div>
    </div>
  );
}
