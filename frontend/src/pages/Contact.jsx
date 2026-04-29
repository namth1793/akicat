import { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('/api/contacts', form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl font-black mb-3">Liên Hệ AKICAT</h1>
          <p className="text-purple-200 text-lg">Chúng tôi luôn sẵn sàng hỗ trợ bạn 7 ngày/tuần</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-black text-gray-800 mb-6">Thông Tin Liên Hệ</h2>
            <div className="space-y-5 mb-8">
              {[
                { icon: '📍', title: 'Địa chỉ', value: '123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh' },
                { icon: '📞', title: 'Hotline', value: '0901 234 567', href: 'tel:0901234567' },
                { icon: '✉️', title: 'Email', value: 'hello@akicat.vn', href: 'mailto:hello@akicat.vn' },
                { icon: '🕘', title: 'Giờ làm việc', value: '8:00 - 21:00, Thứ 2 - Chủ Nhật' },
              ].map(c => (
                <div key={c.title} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm">
                  <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{c.icon}</div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{c.title}</p>
                    {c.href ? (
                      <a href={c.href} className="font-semibold text-primary-600 hover:text-primary-800 transition-colors">{c.value}</a>
                    ) : (
                      <p className="font-semibold text-gray-700">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3">Theo Dõi Chúng Tôi</h3>
              <div className="flex gap-3">
                {[
                  { name: 'Facebook', icon: '📘', color: 'bg-blue-500' },
                  { name: 'Instagram', icon: '📷', color: 'bg-pink-500' },
                  { name: 'TikTok', icon: '🎵', color: 'bg-gray-800' },
                ].map(s => (
                  <button key={s.name} className={`${s.color} text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 hover:opacity-90 transition-opacity`}>
                    {s.icon} {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-black text-gray-800 mb-6">Gửi Tin Nhắn</h2>

            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Gửi thành công!</h3>
                <p className="text-gray-500 mb-4">Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
                <button onClick={() => setStatus('idle')} className="btn-outline">Gửi tin khác</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: 'name', label: 'Họ và tên *', type: 'text', placeholder: 'Nguyễn Văn A', required: true },
                  { name: 'phone', label: 'Số điện thoại', type: 'tel', placeholder: '0901 234 567' },
                  { name: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      required={f.required}
                      placeholder={f.placeholder}
                      value={form[f.name]}
                      onChange={e => setForm(v => ({ ...v, [f.name]: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nội dung *</label>
                  <textarea
                    required rows={4}
                    placeholder="Mô tả câu hỏi hoặc yêu cầu của bạn..."
                    value={form.message}
                    onChange={e => setForm(v => ({ ...v, message: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent resize-none"
                  />
                </div>
                {status === 'error' && (
                  <p className="text-red-500 text-sm">Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ qua hotline.</p>
                )}
                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-60">
                  {status === 'loading' ? 'Đang gửi...' : 'Gửi Tin Nhắn →'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gray-100 h-64 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="font-medium">Bản đồ</p>
              <p className="text-sm">123 Nguyễn Văn Linh, Quận 7, TP.HCM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
