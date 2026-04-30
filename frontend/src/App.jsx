import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FloatingContact from './components/FloatingContact';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import ArticleDetail from './pages/ArticleDetail';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-stone-50">
          <Navbar />
          <CartDrawer />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/san-pham" element={<Products />} />
              <Route path="/san-pham/:slug" element={<ProductDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<ArticleDetail />} />
              <Route path="/gioi-thieu" element={<About />} />
              <Route path="/lien-he" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <FloatingContact />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
