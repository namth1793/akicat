import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <div className="bg-white rounded-xl px-3 py-2 inline-block shadow-sm">
                <img src="/logo.png" alt="AKI EXIM COMPANY" className="h-8 w-auto" />
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Thương hiệu cát vệ sinh mèo hàng đầu Việt Nam. Tự nhiên, an toàn, thấm hút và khử mùi vượt trội.
            </p>
            <div className="flex gap-3">
              {['facebook', 'instagram', 'tiktok'].map(s => (
                <a key={s} href="#" className="w-8 h-8 bg-gray-700 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors text-xs font-medium text-white uppercase">
                  {s[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-white mb-4">Sản Phẩm</h4>
            <ul className="space-y-2 text-sm">
              {['Cát Đậu Phụ', 'Cát Bentonite', 'Cát Tinh Thể', 'Cát Pha Trộn', 'Phụ Kiện'].map(c => (
                <li key={c}><Link to={`/san-pham`} className="hover:text-white transition-colors">{c}</Link></li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Hỗ Trợ</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Blog Kiến Thức', to: '/blog' },
                { label: 'Giới Thiệu', to: '/gioi-thieu' },
                { label: 'Liên Hệ', to: '/lien-he' },
                { label: 'Chính Sách Đổi Trả', to: '/lien-he' },
              ].map(l => (
                <li key={l.label}><Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Liên Hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <span className="flex-shrink-0">📍</span>
                <span>123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex gap-2">
                <span>📞</span>
                <a href="tel:0901234567" className="hover:text-white transition-colors">0901 234 567</a>
              </li>
              <li className="flex gap-2">
                <span>✉️</span>
                <a href="mailto:hello@akicat.vn" className="hover:text-white transition-colors">hello@akicat.vn</a>
              </li>
              <li className="flex gap-2">
                <span>🕘</span>
                <span>8:00 - 21:00 (Thứ 2 - CN)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© 2024 AKICAT. All rights reserved.</p>
          <p>Made with ❤️ for cat lovers 🐱</p>
        </div>
      </div>
    </footer>
  );
}
