import { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

function fmt(n) { return n.toLocaleString('vi-VN') + 'đ'; }

export default function CartDrawer() {
  const { items, updateQty, removeItem, clearCart, total, isOpen, setIsOpen } = useCart();
  const [step, setStep] = useState('cart'); // cart | checkout | success
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', note: '' });
  const [loading, setLoading] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/orders', { ...form, items, total });
      setOrderCode(res.data.order_code);
      clearCart();
      setStep('success');
    } catch {
      alert('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const close = () => { setIsOpen(false); setTimeout(() => { setStep('cart'); setForm({ name: '', phone: '', email: '', address: '', note: '' }); }, 300); };

  return (
    <>
      {/* Overlay */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={close} />

      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="font-bold text-lg">
            {step === 'cart' ? '🛒 Giỏ Hàng' : step === 'checkout' ? '📦 Thông Tin Đặt Hàng' : '✅ Đặt Hàng Thành Công'}
          </h2>
          <button onClick={close} className="p-1 hover:bg-gray-100 rounded-full">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Cart step */}
        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <div className="text-5xl mb-3">🐱</div>
                  <p className="font-medium">Giỏ hàng đang trống</p>
                  <p className="text-sm mt-1">Thêm sản phẩm để tiếp tục</p>
                </div>
              ) : items.map(item => (
                <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight line-clamp-2">{item.name}</p>
                    <p className="text-primary-600 font-bold text-sm mt-1">{fmt(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-gray-100 text-lg font-bold">−</button>
                      <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-gray-100 text-lg font-bold">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-400 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
            {items.length > 0 && (
              <div className="px-5 py-4 border-t space-y-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng</span>
                  <span className="text-primary-600">{fmt(total)}</span>
                </div>
                <button onClick={() => setStep('checkout')} className="btn-primary w-full text-center">Đặt Hàng Ngay</button>
                <p className="text-xs text-gray-400 text-center">Giao hàng toàn quốc • Thanh toán khi nhận hàng</p>
              </div>
            )}
          </>
        )}

        {/* Checkout step */}
        {step === 'checkout' && (
          <form onSubmit={handleOrder} className="flex-1 flex flex-col overflow-y-auto">
            <div className="flex-1 px-5 py-4 space-y-4">
              <div className="bg-primary-50 rounded-xl p-3 text-sm text-primary-700 font-medium">
                {items.length} sản phẩm • Tổng: {fmt(total)}
              </div>
              {[
                { name: 'name', label: 'Họ và tên *', placeholder: 'Nguyễn Văn A', required: true },
                { name: 'phone', label: 'Số điện thoại *', placeholder: '0901234567', required: true },
                { name: 'email', label: 'Email', placeholder: 'email@example.com' },
                { name: 'address', label: 'Địa chỉ giao hàng *', placeholder: 'Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố', required: true },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                  <input
                    type={f.name === 'email' ? 'email' : f.name === 'phone' ? 'tel' : 'text'}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={form[f.name]}
                    onChange={e => setForm(v => ({ ...v, [f.name]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                <textarea rows={2} placeholder="Ghi chú thêm cho đơn hàng..."
                  value={form.note} onChange={e => setForm(v => ({ ...v, note: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none" />
              </div>
            </div>
            <div className="px-5 py-4 border-t space-y-2">
              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
                {loading ? 'Đang xử lý...' : `Xác Nhận Đặt Hàng • ${fmt(total)}`}
              </button>
              <button type="button" onClick={() => setStep('cart')} className="w-full text-sm text-gray-500 hover:text-gray-700 py-2">← Quay lại giỏ hàng</button>
            </div>
          </form>
        )}

        {/* Success step */}
        {step === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Đặt hàng thành công!</h3>
            <p className="text-gray-500 text-sm mb-3">Mã đơn hàng của bạn:</p>
            <div className="bg-primary-50 text-primary-700 font-black text-2xl px-6 py-3 rounded-xl mb-4">{orderCode}</div>
            <p className="text-sm text-gray-500 mb-6">Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất. Cảm ơn bạn đã tin tưởng AKICAT! 🐾</p>
            <button onClick={close} className="btn-primary">Tiếp Tục Mua Sắm</button>
          </div>
        )}
      </div>
    </>
  );
}
