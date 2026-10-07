# VIỆT NAM - BẢN ĐỒ SỐ ĐỊA BÀN CHIẾN LƯỢC (1939 – 1945)
> **Dự án số hóa dữ liệu lịch sử phục vụ học tập và nghiên cứu môn học: Lịch sử Đảng Cộng sản Việt Nam.**  
> *Chủ đề: Phong trào giải phóng dân tộc và Tổng khởi nghĩa Cách mạng Tháng Tám (1939 – 1945).*

[![Deploy with Vercel](https://img.shields.io/badge/Deployed%20with-Vercel-black?style=flat&logo=vercel)](https://phongtraogiaiphongquan1939-1945.site)
[![React](https://img.shields.io/badge/Framework-React-blue?style=flat&logo=react)](https://react.dev/)
[![Leaflet](https://img.shields.io/badge/Mapping-Leaflet.js-green?style=flat&logo=leaflet)](https://leafletjs.com/)

---

## 🌐 Trải Nghiệm Trực Tuyến (Live Demo)

* **Tên miền chính thức:** [phongtraogiaiphongquan1939-1945.site](https://phongtraogiaiphongquan1939-1945.site)
* **Dự phòng (Vercel):** Đã cấu hình SSL/HTTPS và tối ưu phản hồi trên thiết bị di động.

---

## 📌 Giới Thiệu Đề Tài

Ứng dụng trực quan hóa không gian địa lý - lịch sử giai đoạn 1939 – 1945 thông qua bản đồ số tương tác (Interactive Web Map). Dự án tái hiện sinh động 11 mốc son chói lọi từ khi Chiến tranh thế giới thứ hai bùng nổ, Hội nghị Trung ương 8 hoàn chỉnh chuyển hướng chiến lược cách mạng, cho đến thắng lợi trọn vẹn của Cách mạng Tháng Tám năm 1945 khai sinh ra nước Việt Nam Dân chủ Cộng hòa.

---

## 🚀 Tính Năng Nổi Bật

- **Bản đồ số tương tác mượt mà:** Định vị tọa độ chính xác các chiến khu, căn cứ địa, điểm nổ ra khởi nghĩa vũ trang trên nền bản đồ độ phân giải cao.
- **Tư liệu lịch sử & Video chính thống:** Kết hợp trích dẫn văn kiện, phân tích diễn biến và tích hợp các phim tài liệu được phát hành bởi các cơ quan báo chí, truyền hình nhà nước (*Đài Truyền hình Việt Nam - VTV, Báo Nhân Dân, Đài PT-TH Lạng Sơn*).
- **Hệ thống âm thanh thích ứng (Adaptive Audio Engine):**
  - Vận hành nhạc nền hành khúc cách mạng hào hùng.
  - Tự động hạ âm lượng êm dịu khi người dùng chọn xem chi tiết mốc son hoặc khi phát video tư liệu.
  - Sử dụng **Web Audio API (`AudioContext` & `GainNode`)** khắc phục giới hạn điều khiển âm lượng của Apple trên iOS / Safari.
- **Thanh dòng thời gian (Interactive Timeline):** Cho phép theo dõi tiến trình lịch sử theo trình tự biên niên, lọc nhanh theo từng nhóm nội dung (*Chủ trương chiến lược, Khởi nghĩa vũ trang, Cao trào kháng Nhật, Tổng khởi nghĩa*).
- **Tương thích đa nền tảng (Responsive UI/UX):** Tối ưu giao diện dạng Bottom Sheet vuốt chạm trên điện thoại và Sidebar mở rộng trên máy tính.

---

## 📂 Danh Sách 11 Mốc Son Lịch Sử Tích Hợp

1. **27/09/1940:** Khởi nghĩa Bắc Sơn (Lạng Sơn) – *Ra đời Đội du kích Bắc Sơn*.
2. **23/11/1940:** Khởi nghĩa Nam Kỳ – *Lần đầu tiên xuất hiện lá cờ đỏ sao vàng*.
3. **13/01/1941:** Binh biến Đô Lương (Nghệ An) – *Tinh thần phản kháng bất khuất*.
4. **01/1941 – 05/1941:** Pác Bó: Bác Hồ về nước & Hội nghị Trung ương 8 – *Hoàn chỉnh đường lối giải phóng dân tộc*.
5. **22/12/1944:** Thành lập Đội VN Tuyên truyền Giải phóng quân – *Tiền thân QĐND Việt Nam*.
6. **15/05/1945:** Hội nghị Quân sự cách mạng Bắc Kỳ (Hiệp Hòa, Bắc Giang).
7. **13 – 16/08/1945:** Tân Trào: Quân lệnh số 1 & Đại hội Quốc dân.
8. **19/08/1945:** Khởi nghĩa giành chính quyền tại Hà Nội.
9. **23/08/1945:** Khởi nghĩa giành chính quyền tại Huế (chấm dứt chế độ phong kiến).
10. **25/08/1945:** Khởi nghĩa giành chính quyền tại Sài Gòn.
11. **02/09/1945:** Quảng trường Ba Đình: Tuyên ngôn Độc lập khai sinh nước Việt Nam dân chủ Cộng Hòa.

---

## 🛠 Công Nghệ Sử Dụng

- **Frontend:** React.js, JavaScript (ES6+), HTML5, CSS3 (Modern Flexbox/Grid)
- **Bản đồ số:** Leaflet.js, Google Map Tiles / Web Map Services
- **Xử lý âm thanh:** Web Audio API (`AudioContext`, `MediaElementAudioSourceNode`, `GainNode`)
- **Triển khai hạ tầng:** Vercel, Quản lý DNS tùy chỉnh (Custom Domain)

---

## 💻 Cài Đặt Và Chạy Cục Bộ (Local Development)

### 1. Yêu cầu hệ thống
- Đã cài đặt [Node.js](https://nodejs.org/) (phiên bản 16.x trở lên)
- Trình quản lý gói `npm` hoặc `yarn`

### 2. Các bước khởi chạy

```bash
# Clone kho mã nguồn về máy tính
git clone [https://github.com/](https://github.com/)<tai-khoan-cua-ban>/<ten-repository>.git

# Di chuyển vào thư mục dự án
cd <ten-repository>

# Cài đặt các thư viện phụ thuộc
npm install

# Khởi động máy chủ phát triển cục bộ
npm start
# hoặc
npm run dev
