import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './digital_map.css';
import themeSong from './themesong.mp3';

// 1. TẬP DỮ LIỆU CÁC MỐC LỊCH SỬ PHONG TRÀO 1939 - 1945
const historicalEvents = [
  {
    id: 'bac-son',
    title: 'Khởi nghĩa Bắc Sơn (Lạng Sơn)',
    date: '27/09/1940',
    category: 'Khởi nghĩa vũ trang',
    coords: [21.9038, 106.3262],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/nkuDKjhNTy0',
    desc: 'Khởi nghĩa Bắc Sơn nổ ra, đội du kích Bắc Sơn được thành lập, đánh dấu bước phát triển mới của đấu tranh vũ trang vì độc lập dân tộc. Đội sau này phát triển thành Cứu quốc quân.',
    highlight: 'Ra đời Đội du kích Bắc Sơn – mầm mống lực lượng vũ trang cách mạng.'
  },
  {
    id: 'nam-ky',
    title: 'Khởi nghĩa Nam Kỳ',
    date: '23/11/1940',
    category: 'Khởi nghĩa vũ trang',
    coords: [10.8856, 106.5946],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/cbdFNXkPiLk',
    desc: 'Khởi nghĩa bùng nổ mạnh mẽ tại nhiều tỉnh Nam Bộ với tinh thần quả cảm phi thường. Dù bị thực dân Pháp đàn áp khốc liệt và chịu tổn thất nặng nề, khởi nghĩa Nam Kỳ đã để lại bài học xương máu về khởi nghĩa vũ trang.',
    highlight: 'Lần đầu tiên lá cờ đỏ sao vàng xuất hiện trong phong trào đấu tranh.'
  },
  {
    id: 'do-luong',
    title: 'Binh biến Đô Lương (Nghệ An)',
    date: '13/01/1941',
    category: 'Khởi nghĩa vũ trang',
    coords: [18.9167, 105.3000],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    desc: 'Cuộc binh biến do Đội Cung (Nguyễn Văn Cung) chỉ huy cùng các binh lính người Việt yêu nước trong quân đội Pháp nổi dậy tại đồn Rạng và tiến về Vinh, tuy bị dập tắt nhanh chóng nhưng thể hiện tinh thần phản kháng bất khuất.',
    highlight: 'Phát súng báo hiệu tinh thần binh lính giác ngộ theo tiếng gọi non sông.'
  },
  {
    id: 'pac-bo',
    title: 'Pác Bó: Bác Hồ Về Nước & Hội Nghị TW 8',
    date: '01/1941 – 05/1941',
    category: 'Chủ trương chiến lược',
    coords: [22.9818, 106.0506],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    desc: 'Lãnh tụ Nguyễn Ái Quốc về nước sau 30 năm bôn ba và chủ trì Hội nghị Trung ương 8 (5/1941) tại lán Khuổi Nặm. Hội nghị hoàn chỉnh chủ trương chuyển hướng chiến lược: đặt nhiệm vụ giải phóng dân tộc lên hàng đầu, quyết định thành lập Mặt trận Việt Minh và coi chuẩn bị khởi nghĩa vũ trang là nhiệm vụ trung tâm.',
    highlight: 'Hoàn chỉnh đường lối cách mạng giải phóng dân tộc.'
  },
  {
    id: 'tran-hung-dao',
    title: 'Thành lập Đội VN Tuyên truyền Giải phóng quân',
    date: '22/12/1944',
    category: 'Căn cứ & Quân sự',
    coords: [22.6105, 105.8972],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    desc: 'Tại khu rừng giữa hai tổng Hoàng Hoa Thám và Trần Hưng Đạo, Đội Việt Nam Tuyên truyền Giải phóng quân được thành lập gồm 34 chiến sĩ do đồng chí Võ Nguyên Giáp chỉ huy. Đội đã lập nên chiến thắng Phai Khắt, Nà Ngần vang dội ngay sau khi ra đời.',
    highlight: 'Tiền thân của Quân đội nhân dân Việt Nam anh hùng.'
  },
  {
    id: 'hiep-hoa',
    title: 'Hội nghị Quân sự cách mạng Bắc Kỳ',
    date: '15/05/1945',
    category: 'Cao trào kháng Nhật',
    coords: [21.3444, 105.9861],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    desc: 'Sau chỉ thị "Nhật - Pháp bắn nhau và hành động của chúng ta" (12/3/1945), Hội nghị quyết định thống nhất Việt Nam Tuyên truyền Giải phóng quân và Cứu quốc quân thành Việt Nam Giải phóng quân, phát triển lực lượng bán vũ trang và xây dựng 7 chiến khu trong cả nước.',
    highlight: 'Hợp nhất toàn bộ lực lượng vũ trang chuẩn bị chớp thời cơ.'
  },
  {
    id: 'tan-trao',
    title: 'Tân Trào: Quân Lệnh Số 1 & Đại Hội Quốc Dân',
    date: '13 – 16/08/1945',
    category: 'Tổng khởi nghĩa',
    coords: [21.7589, 105.3789],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    desc: 'Tại Thủ đô Khu Giải phóng Tân Trào, Ủy ban Khởi nghĩa toàn quốc ban bố "Quân lệnh số 1" vào đêm 13/8 phát động Tổng khởi nghĩa. Đại hội Quốc dân (16/8) thông qua 10 chính sách lớn của Việt Minh và bầu Ủy ban Dân tộc Giải phóng Việt Nam do Bác Hồ làm Chủ tịch.',
    highlight: '“Dù phải đốt cháy cả dãy Trường Sơn cũng phải kiên quyết giành cho được độc lập!”'
  },
  {
    id: 'ha-noi',
    title: 'Hà Nội Khởi Nghĩa Giành Chính Quyền',
    date: '19/08/1945',
    category: 'Tổng khởi nghĩa',
    coords: [21.0245, 105.8575],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    desc: 'Cuộc mít tinh lớn tại Nhà hát Thành phố nhanh chóng biến thành cuộc biểu tình vũ trang thị uy. Quần chúng cách mạng có lực lượng tự vệ hỗ trợ đã đánh chiếm Phủ Khâm sai, Tòa Thị chính, Trại Bảo an binh, giành toàn bộ chính quyền về tay nhân dân.',
    highlight: 'Thắng lợi ở Hà Nội tạo hiệu ứng dây chuyền cổ vũ cả nước nổi dậy.'
  },
  {
    id: 'hue',
    title: 'Khởi Nghĩa Giành Chính Quyền Tại Huế',
    date: '23/08/1945',
    category: 'Tổng khởi nghĩa',
    coords: [16.4637, 107.5909],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    desc: 'Nhân dân Thừa Thiên - Huế dưới sự lãnh đạo của Mặt trận Việt Minh đồng loạt nổi dậy khởi nghĩa giành chính quyền thắng lợi. Ngày 30/8/1945, vua Bảo Đại đọc Chiếu thoái vị và trao nộp ấn kiếm, chấm dứt chế độ phong kiến tồn tại hàng ngàn năm.',
    highlight: 'Xóa bỏ hoàn toàn ngai vàng phong kiến chuyên chế.'
  },
  {
    id: 'sai-gon',
    title: 'Sài Gòn Khởi Nghĩa Giành Chính Quyền',
    date: '25/08/1945',
    category: 'Tổng khởi nghĩa',
    coords: [10.7769, 106.7009],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    desc: 'Hơn 1 triệu đồng bào Sài Gòn - Chợ Lớn và các tỉnh lân cận rầm rộ xuống đường biểu tình vũ trang, chiếm các công sở chỉ huy đầu não của địch. Cuộc khởi nghĩa toàn thắng chớp nhoáng và trọn vẹn.',
    highlight: 'Góp phần quyết định đưa cuộc Tổng khởi nghĩa 15 ngày toàn thắng.'
  },
  {
    id: 'ba-dinh',
    title: 'Ba Đình: Tuyên Ngôn Độc Lập Khai Sinh Đất Nước',
    date: '02/09/1945',
    category: 'Thắng lợi hoàn toàn',
    coords: [21.0378, 105.8344],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    desc: 'Tại Quảng trường Ba Đình rực rỡ cờ hoa, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập bất hủ, tuyên bố nước Việt Nam Dân chủ Cộng hòa ra đời, chấm dứt hơn 80 năm đô hộ của thực dân Pháp và ách thống trị của phát xít Nhật.',
    highlight: 'Mở ra kỷ nguyên độc lập, tự do cho dân tộc Việt Nam.'
  }
];

export default function HistoricalMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const timelineRef = useRef(null);
  const audioRef = useRef(null);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoTab, setInfoTab] = useState('authors');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);

  const categories = [
    { key: 'ALL', label: 'Tất cả' },
    { key: 'Chủ trương chiến lược', label: 'Chủ trương' },
    { key: 'Khởi nghĩa vũ trang', label: 'Khởi nghĩa' },
    { key: 'Cao trào kháng Nhật', label: 'Kháng Nhật' },
    { key: 'Tổng khởi nghĩa', label: 'Tổng khởi nghĩa' }
  ];

  const filteredEvents = filterCategory === 'ALL'
    ? historicalEvents
    : historicalEvents.filter(ev => ev.category === filterCategory);

  // 1. KHỞI TẠO BẢN ĐỒ TỰ ĐỘNG CÂN TỶ LỆ THEO THIẾT BỊ
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const strictBounds = [
      [7.5, 101.0],
      [26.5, 110.5] // Đã nới từ 24.0 lên 26.5
    ]

    const isMobile = window.innerWidth <= 768;

    const map = L.map(mapContainerRef.current, {
      center: isMobile ? [16.0, 107.2] : [16.2, 107.5],
      zoom: isMobile ? 5.4 : 6.3,
      minZoom: isMobile ? 5.0 : 6.0,
      maxZoom: 14,
      maxBounds: strictBounds,
      maxBoundsViscosity: 1.0,
      zoomControl: false
    });

    L.control.zoom({ position: isMobile ? 'topright' : 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map);

    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    mapInstanceRef.current = map;

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. HIỂN THỊ MARKER & HIỆU ỨNG RADAR THEO BỘ LỌC
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    filteredEvents.forEach((ev) => {
      const isSelected = selectedEvent?.id === ev.id;
      const markerHtml = `
        <div class="custom-pin ${isSelected ? 'is-active' : ''}">
          <div class="pin-pulse"></div>
          <div class="pin-core">★</div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'marker-container',
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker(ev.coords, { icon: customIcon }).addTo(map);
      marker.on('click', () => {
        setSelectedEvent(ev);
        const isMobile = window.innerWidth <= 768;
        const targetLat = isMobile ? ev.coords[0] - 0.4 : ev.coords[0];
        map.flyTo([targetLat, ev.coords[1]], 8.5, { duration: 1.0 });
      });
    });
  }, [filterCategory, selectedEvent]);

  // 3. QUẢN LÝ ĐỐI TƯỢNG ÂM THANH
  const getAudioInstance = () => {
    if (!audioRef.current) {
      const audio = new Audio(themeSong);
      audio.loop = true;
      audio.volume = 0.2;

      audio.onplay = () => setIsPlayingMusic(true);
      audio.onpause = () => setIsPlayingMusic(false);

      audioRef.current = audio;
    }
    return audioRef.current;
  };
  useEffect(() => {
    if (audioRef.current) {
      if (selectedEvent) {
        audioRef.current.volume = 0.02; // Đang mở bảng xem sự kiện / video -> giảm nhỏ
      } else {
        audioRef.current.volume = 0.2;  // Đóng bảng sự kiện -> tăng lại bình thường
      }
    }
  }, [selectedEvent]);
  // Dọn dẹp audio khi unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Xử lý khi đồng ý bật nhạc ở popup xin phép
  const handleEnableAudio = () => {
    const audio = getAudioInstance();
    audio.play()
      .then(() => setIsPlayingMusic(true))
      .catch((err) => console.error("Lỗi phát audio:", err));
    setShowAudioPrompt(false);
  };

  // Xử lý khi từ chối bật nhạc
  const handleDismissAudio = () => {
    setShowAudioPrompt(false);
  };

  // Bật/tắt bằng nút biểu tượng loa
  const toggleMusic = () => {
    const audio = getAudioInstance();
    if (audio.paused) {
      audio.play().catch((err) => console.error("Lỗi khi mở nhạc:", err));
    } else {
      audio.pause();
    }
  };

  const handleCategoryChange = (categoryKey) => {
    setFilterCategory(categoryKey);
    if (timelineRef.current) {
      timelineRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    if (selectedEvent && categoryKey !== 'ALL' && selectedEvent.category !== categoryKey) {
      setSelectedEvent(null);
    }
  };

  const handleSelectEvent = (ev) => {
    setSelectedEvent(ev);
    if (mapInstanceRef.current) {
      const isMobile = window.innerWidth <= 768;
      const targetLat = isMobile ? ev.coords[0] - 0.4 : ev.coords[0];
      mapInstanceRef.current.flyTo([targetLat, ev.coords[1]], 8.5, { duration: 1.0 });
    }
  };

  const scrollTimeline = (direction) => {
    if (timelineRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      timelineRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="map-page-layout">
      {/* 1. HEADER (TỰ ĐỘNG THU GỌN 2 TẦNG TRÊN ĐIỆN THOẠI) */}
      <header className="map-header">
        <div className="header-top-row">
          <div className="header-brand">
            <span className="brand-flag">☭</span>
            <div className="brand-titles">
              <h1>BẢN ĐỒ CHIẾN LƯỢC (1939 - 1945)</h1>
              <p>Cách mạng Tháng Tám toàn thắng</p>
            </div>
          </div>

          <div className="header-actions">
            <button
              className={`music-btn ${isPlayingMusic ? 'playing' : ''}`}
              onClick={toggleMusic}
              title={isPlayingMusic ? "Tắt nhạc nền" : "Bật nhạc nền"}
            >
              {isPlayingMusic ? '🔊' : '🔇'}
            </button>

            <button 
              className="info-nav-btn" 
              onClick={() => setShowInfoModal(true)}
              title="Xem tác giả & tài liệu"
            >
              Tác giả & Tài liệu
            </button>
          </div>
        </div>

        {/* Danh mục lọc vuốt ngang */}
        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`filter-btn ${filterCategory === cat.key ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* 2. KHUNG HIỂN THỊ BẢN ĐỒ */}
      <div className="map-viewport" ref={mapContainerRef} />

      {/* 3. THANH ĐIỀU HƯỚNG MỐC THỜI GIAN ĐÁY MÀN HÌNH */}
      <div className={`timeline-wrapper ${selectedEvent ? 'with-sidebar' : ''}`}>
        <button
          className="scroll-btn prev desktop-only"
          onClick={() => scrollTimeline('left')}
        >
          ‹
        </button>

        <div
          className="quick-timeline-bar"
          ref={timelineRef}
        >
          {filteredEvents.map((ev) => (
            <button
              key={ev.id}
              className={`timeline-chip ${selectedEvent?.id === ev.id ? 'active' : ''}`}
              onClick={() => handleSelectEvent(ev)}
            >
              <span className="chip-date">{ev.date}</span>
              <span className="chip-name">{ev.title.split(':')[0]}</span>
            </button>
          ))}
        </div>

        <button
          className="scroll-btn next desktop-only"
          onClick={() => scrollTimeline('right')}
        >
          ›
        </button>
      </div>

      {/* 4. SIDEBAR CHI TIẾT (MÁY TÍNH: TRƯỢT PHẢI - MOBILE: BOTTOM SHEET TỪ ĐÁY) */}
      <aside className={`info-sidebar ${selectedEvent ? 'open' : ''}`}>
        {selectedEvent && (
          <div className="sidebar-inner">
            <div className="mobile-sheet-handle" onClick={() => setSelectedEvent(null)} />

            <button
              className="close-sidebar-btn"
              onClick={() => setSelectedEvent(null)}
              title="Đóng bảng"
            >
              ✕
            </button>

            <div className="sidebar-top">
              <span className="badge-tag">{selectedEvent.category}</span>
              <span className="badge-date">📅 {selectedEvent.date}</span>
            </div>

            <h2 className="event-heading">{selectedEvent.title}</h2>

            <blockquote className="event-quote">
              “{selectedEvent.highlight}”
            </blockquote>

            <div className="video-card">
              <iframe
                title={selectedEvent.title}
                src={selectedEvent.videoEmbed}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="event-body">
              <h3>Ý nghĩa & Diễn biến lịch sử:</h3>
              <p>{selectedEvent.desc}</p>
            </div>

            <div className="sidebar-footer">
              <span>Trích: Giáo trình & Văn kiện Lịch sử Đảng</span>
            </div>
          </div>
        )}
      </aside>

      {/* 5. CỬA SỔ MODAL THÔNG TIN TÁC GIẢ & TÀI LIỆU */}
      {showInfoModal && (
        <div className="modal-backdrop" onClick={() => setShowInfoModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <span className="modal-icon">🏛️</span>
                <div>
                  <h3>DỰ ÁN SỐ HÓA LỊCH SỬ ĐẢNG</h3>
                  <p>Môn học: Lịch sử Đảng Cộng sản Việt Nam</p>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setShowInfoModal(false)}>✕</button>
            </div>

            <div className="modal-tab-bar">
              <button 
                className={`tab-btn ${infoTab === 'authors' ? 'active' : ''}`}
                onClick={() => setInfoTab('authors')}
              >
                👤 Nhóm Tác Giả
              </button>
              <button 
                className={`tab-btn ${infoTab === 'references' ? 'active' : ''}`}
                onClick={() => setInfoTab('references')}
              >
                📚 Tư Liệu & Tham Khảo
              </button>
            </div>

            <div className="modal-body-content">
              {infoTab === 'authors' ? (
                <div className="tab-pane">
                  <div className="project-card">
                    <h4>ĐỀ TÀI: BẢN ĐỒ SỐ ĐỊA BÀN CHIẾN LƯỢC (1939 - 1945)</h4>
                    <p>Ứng dụng công nghệ bản đồ tương tác số hóa không gian lịch sử thời kỳ tiền khởi nghĩa và Cách mạng Tháng Tám.</p>
                  </div>

                  <h5 className="section-subtitle">THÀNH VIÊN NHÓM THỰC HIỆN:</h5>
                  <div className="author-grid">
                    <div className="author-item">
                      <div className="author-avatar">★</div>
                      <div className="author-meta">
                        <span className="name">Nguyễn Văn A (Nhóm trưởng)</span>
                        <span className="desc">Nhiệm vụ: Lập trình Leaflet & Dữ liệu mốc son</span>
                        <span className="sub">MSSV: 2021xxxx • Lớp: LSQH01</span>
                      </div>
                    </div>
                    <div className="author-item">
                      <div className="author-avatar">★</div>
                      <div className="author-meta">
                        <span className="name">Trần Thị B</span>
                        <span className="desc">Nhiệm vụ: Biên tập tư liệu, văn kiện và video</span>
                        <span className="sub">MSSV: 2021xxxx • Lớp: LSQH01</span>
                      </div>
                    </div>
                    <div className="author-item">
                      <div className="author-avatar">★</div>
                      <div className="author-meta">
                        <span className="name">Lê Văn C</span>
                        <span className="desc">Nhiệm vụ: Thiết kế giao diện UI/UX Mobile & CSS</span>
                        <span className="sub">MSSV: 2021xxxx • Lớp: LSQH01</span>
                      </div>
                    </div>
                  </div>

                  <div className="criteria-box">
                    <strong>Đạt chuẩn 4 tiêu chí đánh giá môn học:</strong> Đúng kiến thức lịch sử (30đ), Khai thác tư liệu (20đ), Tính sáng tạo (30đ) và Tính ứng dụng thực tiễn (20đ)[cite: 1].
                  </div>
                </div>
              ) : (
                <div className="tab-pane">
                  <h5 className="section-subtitle">VĂN KIỆN & GIÁO TRÌNH CHÍNH THỐNG:</h5>
                  <ul className="doc-list">
                    <li>
                      <strong>1. Giáo trình Lịch sử Đảng Cộng sản Việt Nam</strong>, NXB Chính trị quốc gia Sự thật.
                    </li>
                    <li>
                      <strong>2. Văn kiện Đảng Toàn tập (Tập 7: 1940 – 1945)</strong>: Nghị quyết Hội nghị TW 6, TW 7 và TW 8[cite: 3].
                    </li>
                    <li>
                      <strong>3. Chỉ thị "Nhật - Pháp bắn nhau và hành động của chúng ta"</strong> (12/03/1945)[cite: 3].
                    </li>
                    <li>
                      <strong>4. Quân lệnh số 1</strong> (13/08/1945) & Tuyên ngôn Độc lập (02/09/1945)[cite: 3].
                    </li>
                  </ul>

                  <h5 className="section-subtitle" style={{ marginTop: '16px' }}>BÁO CHÍ CÁCH MẠNG & PHIM TƯ LIỆU:</h5>
                  <ul className="doc-list">
                    <li>• Báo <em>Cờ Giải phóng</em>, Báo <em>Độc lập</em>, Báo <em>Việt Nam Độc lập</em>[cite: 3].</li>
                    <li>• Đề cương về Văn hóa Việt Nam (1943)[cite: 3].</li>
                    <li>• Phim tư liệu và hình ảnh lưu trữ: Đài Truyền hình Việt Nam (VTV) & Bảo tàng Lịch sử Quốc gia[cite: 1].</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. HỘP THOẠI XIN PHÉP BẬT NHẠC NỀN */}
      {showAudioPrompt && (
        <div className="audio-prompt-backdrop">
          <div className="audio-prompt-box">
            <div className="audio-prompt-icon">🎺</div>
            <h3>BẠN CÓ MUỐN BẬT NHẠC NỀN?</h3>
            <p>Trang web sẽ có trải nghiệm trực quan và hào hùng hơn khi đi kèm âm thanh giai điệu cách mạng.</p>
            <div className="audio-prompt-actions">
              <button className="prompt-btn-allow" onClick={handleEnableAudio}>
                🔊 Bật nhạc nền
              </button>
              <button className="prompt-btn-skip" onClick={handleDismissAudio}>
                🔇 Khám phá không âm thanh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}