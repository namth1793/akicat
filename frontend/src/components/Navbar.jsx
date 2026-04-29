import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const links = [
    { to: '/', label: 'Trang Chủ' },
    { to: '/san-pham', label: 'Sản Phẩm' },
    { to: '/blog', label: 'Blog' },
    { to: '/gioi-thieu', label: 'Giới Thiệu' },
    { to: '/lien-he', label: 'Liên Hệ' },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-white rounded-xl px-2.5 py-1.5 shadow-sm">
              <img src="/logo.png" alt="AKI EXIM COMPANY" className="h-8 w-auto" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'}
                className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? (scrolled ? 'text-violet-700 bg-violet-50' : 'text-white bg-white/20')
                    : (scrolled ? 'text-stone-600 hover:text-violet-700 hover:bg-stone-50' : 'text-white/80 hover:text-white hover:bg-white/10')
                }`}
              >{l.label}</NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setIsOpen(true)}
              className={`relative p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-stone-100' : 'hover:bg-white/10'}`}>
              <svg className={`w-5 h-5 transition-colors ${scrolled ? 'text-stone-700' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-orange-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            <Link to="/san-pham"
              className={`hidden md:flex btn-primary !py-2 !px-5 !text-sm transition-all ${scrolled ? '' : '!bg-white !text-violet-700 hover:!bg-violet-50'}`}>
              Mua Ngay
            </Link>

            <button className="md:hidden p-2 rounded-lg" onClick={() => setMenuOpen(v => !v)}>
              {menuOpen
                ? <svg className={`w-5 h-5 ${scrolled ? 'text-stone-700' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className={`w-5 h-5 ${scrolled ? 'text-stone-700' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg rounded-b-2xl pb-4 pt-2 mx-2 mb-2">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'}
                className={({ isActive }) => `block px-5 py-3 text-sm font-medium rounded-xl mx-2 ${isActive ? 'text-violet-700 bg-violet-50' : 'text-stone-600'}`}
              >{l.label}</NavLink>
            ))}
            <div className="px-4 pt-3">
              <Link to="/san-pham" className="btn-primary w-full justify-center">Mua Ngay →</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
