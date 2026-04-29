import { Link } from 'react-router-dom';

const values = [
  { icon: '🌿', title: 'Tự Nhiên', desc: 'Cam kết sử dụng 100% nguyên liệu thiên nhiên, không hóa chất độc hại' },
  { icon: '🔬', title: 'Khoa Học', desc: 'Nghiên cứu và phát triển dựa trên khoa học thú y, kiểm nghiệm nghiêm ngặt' },
  { icon: '💚', title: 'Bền Vững', desc: 'Bao bì tái chế, quy trình sản xuất thân thiện môi trường' },
  { icon: '🐱', title: 'Yêu Thú Cưng', desc: 'Đội ngũ sáng lập đều là những người yêu mèo, hiểu rõ nhu cầu thực tế' },
];

const milestones = [
  { year: '2020', title: 'Thành Lập', desc: 'AKICAT được thành lập bởi nhóm kỹ sư và bác sĩ thú y đam mê' },
  { year: '2021', title: 'Ra Mắt Sản Phẩm', desc: 'Dòng cát đậu phụ đầu tiên ra mắt, được đón nhận tích cực' },
  { year: '2022', title: '5,000 Khách Hàng', desc: 'Mở rộng dòng bentonite và tinh thể, đạt 5,000 khách hàng tin dùng' },
  { year: '2023', title: 'Phủ Toàn Quốc', desc: 'Phân phối tại 63 tỉnh thành, 10,000+ khách hàng trung thành' },
  { year: '2024', title: 'Nâng Cấp Công Thức', desc: 'Ra mắt than hoạt tính và crystal pro thế hệ mới với hiệu suất vượt trội' },
];

export default function About() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-800 to-primary-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-6xl mb-6">🐾</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Về AKICAT</h1>
          <p className="text-xl text-purple-100 leading-relaxed">
            Chúng tôi tin rằng mỗi chú mèo xứng đáng có môi trường sống sạch sẽ, thoải mái và an toàn.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">Câu Chuyện Của Chúng Tôi</span>
              <h2 className="text-3xl font-black text-gray-900 mt-2 mb-5">Bắt Đầu Từ Tình Yêu Với Mèo</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                AKICAT ra đời từ một vấn đề thực tế: những người yêu mèo không tìm được sản phẩm cát vệ sinh vừa tự nhiên, vừa hiệu quả, vừa có giá phải chăng tại Việt Nam.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Năm 2020, nhóm sáng lập gồm kỹ sư hóa học và bác sĩ thú y bắt tay nghiên cứu công thức cát đậu phụ đặc biệt, lấy cảm hứng từ công nghệ Nhật Bản nhưng được tối ưu cho điều kiện khí hậu nhiệt đới Việt Nam.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Sau hàng trăm lần thử nghiệm và phản hồi từ cộng đồng yêu mèo, AKICAT chính thức ra mắt với sứ mệnh mang lại giải pháp vệ sinh tốt nhất cho mèo cưng Việt Nam.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600&q=80"
                alt="Mèo cưng"
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary-600 text-white rounded-2xl p-4 shadow-lg">
                <p className="text-3xl font-black">4+</p>
                <p className="text-sm text-purple-200">Năm Kinh Nghiệm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900">Giá Trị Cốt Lõi</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900">Hành Trình Phát Triển</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-100" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-6">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-black text-sm shadow-md">
                      {m.year}
                    </div>
                  </div>
                  <div className="pt-3">
                    <h3 className="font-bold text-gray-800 text-lg">{m.title}</h3>
                    <p className="text-gray-500 mt-1">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { n: '10,000+', l: 'Khách hàng tin dùng' },
              { n: '12', l: 'Sản phẩm đa dạng' },
              { n: '63', l: 'Tỉnh thành phủ sóng' },
              { n: '4.9★', l: 'Điểm đánh giá TB' },
            ].map(s => (
              <div key={s.l}>
                <p className="text-4xl font-black mb-2">{s.n}</p>
                <p className="text-purple-200 text-sm">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-black text-gray-800 mb-3">Sẵn Sàng Thử AKICAT?</h2>
          <p className="text-gray-500 mb-6">Hàng nghìn chủ mèo đã tin tưởng. Đến lượt bạn khám phá sự khác biệt!</p>
          <Link to="/san-pham" className="btn-primary inline-block">Xem Sản Phẩm →</Link>
        </div>
      </section>
    </div>
  );
}
