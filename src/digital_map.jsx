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
    videoSource: 'Đài Phát thanh & Truyền hình Lạng Sơn',
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
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    desc: 'Khởi nghĩa bùng nổ mạnh mẽ tại nhiều tỉnh Nam Bộ với tinh thần quả cảm phi thường. Dù bị thực dân Pháp đàn áp khốc liệt và chịu tổn thất nặng nề, khởi nghĩa Nam Kỳ đã để lại bài học xương máu về khởi nghĩa vũ trang.',
    highlight: 'Lần đầu tiên lá cờ đỏ sao vàng xuất hiện trong phong trào đấu tranh.'
  },
  {
    id: 'do-luong',
    title: 'Binh biến Đô Lương (Nghệ An)',
    date: '13/01/1941',
    category: 'Khởi nghĩa vũ trang',
    coords: [18.9167, 105.3000],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/tWLqY8ZT2NA',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    desc: 'Cuộc binh biến do Đội Cung (Nguyễn Văn Cung) chỉ huy cùng các binh lính người Việt yêu nước trong quân đội Pháp nổi dậy tại đồn Rạng và tiến về Vinh, tuy bị dập tắt nhanh chóng nhưng thể hiện tinh thần phản kháng bất khuất.',
    highlight: 'Phát súng báo hiệu tinh thần binh lính giác ngộ theo tiếng gọi non sông.'
  },
  {
    id: 'pac-bo',
    title: 'Pác Bó: Bác Hồ Về Nước & Hội Nghị Trung Ương 8',
    date: '01/1941 – 05/1941',
    category: 'Chủ trương chiến lược',
    coords: [22.9818, 106.0506],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/WKcXjaqJY04',
    videoSource: 'Đài Truyền hình Việt Nam (VTV3)',
    desc: 'Lãnh tụ Nguyễn Ái Quốc về nước sau 30 năm bôn ba và chủ trì Hội nghị Trung ương 8 (5/1941) tại lán Khuổi Nặm. Hội nghị hoàn chỉnh chủ trương chuyển hướng chiến lược: đặt nhiệm vụ giải phóng dân tộc lên hàng đầu, quyết định thành lập Mặt trận Việt Minh và coi chuẩn bị khởi nghĩa vũ trang là nhiệm vụ trung tâm.',
    highlight: 'Hoàn chỉnh đường lối cách mạng giải phóng dân tộc.'
  },
  {
    id: 'tran-hung-dao',
    title: 'Thành lập Đội VN Tuyên truyền Giải phóng quân',
    date: '22/12/1944',
    category: 'Căn cứ & Quân sự',
    coords: [22.6105, 105.8972],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/T591PKbi3Jc',
    videoSource: 'QPVN - Truyền Hình Quốc Phòng Việt Nam',
    desc: 'Tại khu rừng giữa hai tổng Hoàng Hoa Thám và Trần Hưng Đạo, Đội Việt Nam Tuyên truyền Giải phóng quân được thành lập gồm 34 chiến sĩ do đồng chí Võ Nguyên Giáp chỉ huy. Đội đã lập nên chiến thắng Phai Khắt, Nà Ngần vang dội ngay sau khi ra đời.',
    highlight: 'Tiền thân của Quân đội nhân dân Việt Nam anh hùng.'
  },
  {
    id: 'hiep-hoa',
    title: 'Hội nghị Quân sự cách mạng Bắc Kỳ',
    date: '15/05/1945',
    category: 'Cao trào kháng Nhật',
    coords: [21.3444, 105.9861],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/g0ib84B6s0A',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    desc: 'Sau chỉ thị "Nhật - Pháp bắn nhau và hành động của chúng ta" (12/3/1945), Hội nghị quyết định thống nhất Việt Nam Tuyên truyền Giải phóng quân và Cứu quốc quân thành Việt Nam Giải phóng quân, phát triển lực lượng bán vũ trang và xây dựng 7 chiến khu trong cả nước.',
    highlight: 'Hợp nhất toàn bộ lực lượng vũ trang chuẩn bị chớp thời cơ.'
  },
  {
    id: 'tan-trao',
    title: 'Tân Trào: Quân Lệnh Số 1 & Đại Hội Quốc Dân',
    date: '13 – 16/08/1945',
    category: 'Tổng khởi nghĩa',
    coords: [21.7589, 105.3789],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/32tXt4Tfsm0',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    desc: 'Tại Thủ đô Khu Giải phóng Tân Trào, Ủy ban Khởi nghĩa toàn quốc ban bố "Quân lệnh số 1" vào đêm 13/8 phát động Tổng khởi nghĩa. Đại hội Quốc dân (16/8) thông qua 10 chính sách lớn của Việt Minh và bầu Ủy ban Dân tộc Giải phóng Việt Nam do Bác Hồ làm Chủ tịch.',
    highlight: '“Dù phải đốt cháy cả dãy Trường Sơn cũng phải kiên quyết giành cho được độc lập!”'
  },
  {
    id: 'ha-noi',
    title: 'Hà Nội Khởi Nghĩa Giành Chính Quyền',
    date: '19/08/1945',
    category: 'Tổng khởi nghĩa',
    coords: [21.0245, 105.8575],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/fCqgLY4QqeE',
    videoSource: 'Trung tâm Tin tức VTV24 (Đài THVN)',
    desc: 'Cuộc mít tinh lớn tại Nhà hát Thành phố nhanh chóng biến thành cuộc biểu tình vũ trang thị uy. Quần chúng cách mạng có lực lượng tự vệ hỗ trợ đã đánh chiếm Phủ Khâm sai, Tòa Thị chính, Trại Bảo an binh, giành toàn bộ chính quyền về tay nhân dân.',
    highlight: 'Thắng lợi ở Hà Nội tạo hiệu ứng dây chuyền cổ vũ cả nước nổi dậy.'
  },
  {
    id: 'hue',
    title: 'Khởi Nghĩa Giành Chính Quyền Tại Huế',
    date: '23/08/1945',
    category: 'Tổng khởi nghĩa',
    coords: [16.4637, 107.5909],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/m5u5Rc-QxX4',
    videoSource: 'VNAMEDIA - Trung tâm nội dung số và truyền thông',
    desc: 'Nhân dân Thừa Thiên - Huế dưới sự lãnh đạo của Mặt trận Việt Minh đồng loạt nổi dậy khởi nghĩa giành chính quyền thắng lợi. Ngày 30/8/1945, vua Bảo Đại đọc Chiếu thoái vị và trao nộp ấn kiếm, chấm dứt chế độ phong kiến tồn tại hàng ngàn năm.',
    highlight: 'Xóa bỏ hoàn toàn ngai vàng phong kiến chuyên chế.'
  },
  {
    id: 'sai-gon',
    title: 'Sài Gòn Khởi Nghĩa Giành Chính Quyền',
    date: '25/08/1945',
    category: 'Tổng khởi nghĩa',
    coords: [10.7769, 106.7009],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/FOMRPr1TXHk',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    desc: 'Hơn 1 triệu đồng bào Sài Gòn - Chợ Lớn và các tỉnh lân cận rầm rộ xuống đường biểu tình vũ trang, chiếm các công sở chỉ huy đầu não của địch. Cuộc khởi nghĩa toàn thắng chớp nhoáng và trọn vẹn.',
    highlight: 'Góp phần quyết định đưa cuộc Tổng khởi nghĩa 15 ngày toàn thắng.'
  },
  {
    id: 'ba-dinh',
    title: 'Ba Đình: Tuyên Ngôn Độc Lập Khai Sinh Đất Nước',
    date: '02/09/1945',
    category: 'Thắng lợi hoàn toàn',
    coords: [21.0378, 105.8344],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/jHmz5FgYpYo',
    videoSource: 'Đài Truyền hình Việt Nam (VTV)',
    desc: 'Tại Quảng trường Ba Đình rực rỡ cờ hoa, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập bất hủ, tuyên bố nước Việt Nam Dân chủ Cộng hòa ra đời, chấm dứt hơn 80 năm đô hộ của thực dân Pháp và ách thống trị của phát xít Nhật.',
    highlight: 'Mở ra kỷ nguyên độc lập, tự do cho dân tộc Việt Nam.'
  }
];

export default function HistoricalMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const timelineRef = useRef(null);

  // Quản lý âm thanh qua HTML Audio + Web Audio API (Hỗ trợ tốt trên iOS Safari)
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoTab, setInfoTab] = useState('authors');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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

  // 1. KHỞI TẠO BẢN ĐỒ GOOGLE MAPS VÀ GẮN CHỦ QUYỀN BIỂN ĐẢO
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Giới hạn biên độ bao trọn đất liền và hai quần đảo Hoàng Sa, Trường Sa
    const strictBounds = [
      [6.5, 101.0],  // Phía Nam hạ xuống 6.5 để nhìn rõ Trường Sa
      [26.5, 118.0]  // Phía Đông nới ra 118.0 để bao trọn Hoàng Sa & Trường Sa
    ];

    const isMobile = window.innerWidth <= 768;

    const map = L.map(mapContainerRef.current, {
      center: isMobile ? [16.0, 107.2] : [16.2, 107.5],
      zoom: isMobile ? 5.4 : 6.3,
      minZoom: isMobile ? 5.0 : 5.8,
      maxZoom: 18,
      maxBounds: strictBounds,
      maxBoundsViscosity: 1.0,
      zoomControl: false
    });

    L.control.zoom({ position: isMobile ? 'topright' : 'bottomright' }).addTo(map);

    // Bản đồ Google Maps sắc nét
    L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google Maps',
      maxZoom: 20
    }).addTo(map);

    // Nhãn Quần đảo Hoàng Sa (Đà Nẵng, Việt Nam)
    const hoangSaBadge = L.divIcon({
      className: 'custom-island-badge',
      html: `
        <div class="island-tag-box">
          <span class="flag">🇻🇳</span>
          <div class="tag-text">
            <strong>QĐ. HOÀNG SA</strong>
            <small>(Đà Nẵng, Việt Nam)</small>
          </div>
        </div>
      `,
      iconSize: [140, 36],
      iconAnchor: [70, 18]
    });

    // Nhãn Quần đảo Trường Sa (Khánh Hòa, Việt Nam)
    const truongSaBadge = L.divIcon({
      className: 'custom-island-badge',
      html: `
        <div class="island-tag-box">
          <span class="flag">🇻🇳</span>
          <div class="tag-text">
            <strong>QĐ. TRƯỜNG SA</strong>
            <small>(Khánh Hòa, Việt Nam)</small>
          </div>
        </div>
      `,
      iconSize: [140, 36],
      iconAnchor: [70, 18]
    });

    // Ghim trực tiếp nhãn cố định lên tọa độ hai quần đảo
    L.marker([16.5, 112.0], { icon: hoangSaBadge, interactive: false }).addTo(map);
    L.marker([9.5, 113.5], { icon: truongSaBadge, interactive: false }).addTo(map);

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

  // 2. HIỂN THỊ CÁC MỐC SON LỊCH SỬ TRÊN BẢN ĐỒ
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker && !layer.options.icon.options.className?.includes('custom-island-badge')) {
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
        setIsVideoPlaying(false);
        setSelectedEvent(ev);
        const isMobile = window.innerWidth <= 768;
        const targetLat = isMobile ? ev.coords[0] - 0.4 : ev.coords[0];
        map.flyTo([targetLat, ev.coords[1]], 8.5, { duration: 1.0 });
      });
    });
  }, [filterCategory, selectedEvent]);

  // 3. KHỞI TẠO ÂM THANH VÀ WEB AUDIO API (TƯƠNG THÍCH HOÀN TOÀN IPHONE)
  const getAudioInstance = () => {
    if (!audioRef.current) {
      const audio = new Audio(themeSong);
      audio.loop = true;
      audio.preload = 'auto';

      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          const gainNode = ctx.createGain();
          gainNode.gain.value = 0.2; // Âm lượng chuẩn 20%
          
          const source = ctx.createMediaElementSource(audio);
          source.connect(gainNode);
          gainNode.connect(ctx.destination);

          audioCtxRef.current = ctx;
          gainNodeRef.current = gainNode;
        }
      } catch (err) {
        console.warn("Trình duyệt không hỗ trợ Web Audio API, dùng fallback:", err);
        audio.volume = 0.2;
      }

      audio.onplay = () => setIsPlayingMusic(true);
      audio.onpause = () => setIsPlayingMusic(false);

      audioRef.current = audio;
    }
    return audioRef.current;
  };

  // Hàm chuyển đổi âm lượng từ từ (Fade Volume)
  const fadeVolume = (targetVolume, duration = 0.8) => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const currentVal = gainNodeRef.current.gain.value;
      gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
      gainNodeRef.current.gain.setValueAtTime(currentVal, ctx.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + duration);
      return;
    }

    if (audioRef.current) {
      audioRef.current.volume = targetVolume;
    }
  };

  // Lắng nghe trạng thái phát video YouTube
  useEffect(() => {
    const handleYouTubeMessage = (event) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && data.event === 'onStateChange') {
          if (data.info === 1) {
            setIsVideoPlaying(true);
          } else if (data.info === 2 || data.info === 0) {
            setIsVideoPlaying(false);
          }
        }
      } catch {
        // Bỏ qua tin nhắn không thuộc YouTube
      }
    };

    window.addEventListener('message', handleYouTubeMessage);
    return () => {
      window.removeEventListener('message', handleYouTubeMessage);
    };
  }, []);

  // Tự động hạ âm lượng xuống 0.05 khi mở xem sự kiện hoặc khi video phát, tăng lại 0.2 khi dừng
  useEffect(() => {
    if (!audioRef.current) return;

    if (selectedEvent || isVideoPlaying) {
      fadeVolume(0.05, 0.5);
    } else {
      fadeVolume(0.2, 1.2);
    }
  }, [selectedEvent, isVideoPlaying]);

  // Giải phóng tài nguyên
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleEnableAudio = () => {
    const audio = getAudioInstance();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    audio.play()
      .then(() => setIsPlayingMusic(true))
      .catch((err) => console.error("Lỗi phát audio:", err));
    setShowAudioPrompt(false);
  };

  const handleDismissAudio = () => {
    setShowAudioPrompt(false);
  };

  const toggleMusic = () => {
    const audio = getAudioInstance();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
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
      setIsVideoPlaying(false);
      setSelectedEvent(null);
    }
  };

  const handleSelectEvent = (ev) => {
    setIsVideoPlaying(false);
    setSelectedEvent(ev);
    if (mapInstanceRef.current) {
      const isMobile = window.innerWidth <= 768;
      const targetLat = isMobile ? ev.coords[0] - 0.4 : ev.coords[0];
      mapInstanceRef.current.flyTo([targetLat, ev.coords[1]], 8.5, { duration: 1.0 });
    }
  };

  const handleCloseSidebar = () => {
    setIsVideoPlaying(false);
    setSelectedEvent(null);
  };

  const scrollTimeline = (direction) => {
    if (timelineRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      timelineRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="map-page-layout">
      {/* 1. HEADER */}
      <header className="map-header">
        <div className="header-top-row">
          <div className="header-brand">
            <span className="brand-flag">☭</span>
            <div className="brand-titles">
              <h1>BẢN ĐỒ MỐC SON (1939 - 1945)</h1>
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
              📖 Tác giả & Tài liệu
            </button>
          </div>
        </div>

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

      {/* 2. BẢN ĐỒ */}
      <div className="map-viewport" ref={mapContainerRef} />

      {/* 3. THANH DÒNG THỜI GIAN ĐÁY */}
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

      {/* 4. SIDEBAR CHI TIẾT SỰ KIỆN */}
      <aside className={`info-sidebar ${selectedEvent ? 'open' : ''}`}>
        {selectedEvent && (
          <div className="sidebar-inner">
            <div className="mobile-sheet-handle" onClick={handleCloseSidebar} />

            <button
              className="close-sidebar-btn"
              onClick={handleCloseSidebar}
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

            {/* VIDEO TƯ LIỆU YOUTUBE */}
            <div className="video-card">
              <iframe
                title={selectedEvent.title}
                src={`${selectedEvent.videoEmbed}?enablejsapi=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={(e) => {
                  e.target.contentWindow?.postMessage('{"event":"listening"}', '*');
                }}
              />
            </div>

            {/* TRÍCH DẪN NGUỒN PHÁT HÀNH TƯ LIỆU */}
            <div className="video-source-box">
              <span className="source-icon">📺</span>
              <span className="source-text">
                Nguồn tư liệu: <strong>{selectedEvent.videoSource}</strong>
              </span>
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

      {/* 5. POPUP TÁC GIẢ & TÀI LIỆU */}
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
                  <h5 className="section-subtitle">GIÁO VIÊN HƯỚNG DẪN:</h5> 
                  <div className="author-grid">
                    <div className="author-item">
                      <div className="author-avatar">★</div>
                      <div className="author-meta">
                        <span className="name">Thầy Nguyễn Văn Chung</span>
                      </div>
                    </div>
                  </div>
                  <h5 className="section-subtitle">THÀNH VIÊN NHÓM THỰC HIỆN:</h5>
                  <div className="author-grid">
                    <div className="author-item">
                      <div className="author-avatar">★</div>
                      <div className="author-meta">
                        <span className="name">Huỳnh Thanh Huy (Nhóm trưởng)</span>
                        <span className="sub">MSSV: 24149138</span>
                      </div>
                    </div>
                    <div className="author-item">
                      <div className="author-avatar">★</div>
                      <div className="author-meta">
                        <span className="name">Nguyễn Minh Tú</span>
                        <span className="sub">MSSV: 25134117</span>
                      </div>
                    </div>
                    <div className="author-item">
                      <div className="author-avatar">★</div>
                      <div className="author-meta">
                        <span className="name">Phạm Minh Hoàng</span>
                        <span className="sub">MSSV: 24134026</span>
                      </div>
                    </div>
                    <div className="author-item">
                      <div className="author-avatar">★</div>
                      <div className="author-meta">
                        <span className="name">Võ Thị Hồng Phương</span>
                        <span className="sub">MSSV: 24128156</span>
                      </div>
                    </div>
                    <div className="author-item">
                      <div className="author-avatar">★</div>
                      <div className="author-meta">
                        <span className="name">Nguyễn Tấn Hiếu</span>
                        <span className="sub">MSSV: 24128064</span>
                      </div>
                    </div>
                  </div>

                  <div className="criteria-box">
                    <strong>Note:</strong> Đây là sản phẩm môn học Lịch sử Đảng của nhóm 1 lớp LLCT220514 - nhóm 4 - kì I đợt 1 năm học 2026-2027 - Trường Đại học Công nghệ Kỹ thuật TP.HCM.
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
                      <strong>2. Văn kiện Đảng Toàn tập (Tập 7: 1940 – 1945)</strong>: Nghị quyết Hội nghị TW 6, TW 7 và TW 8.
                    </li>
                    <li>
                      <strong>3. Chỉ thị "Nhật - Pháp bắn nhau và hành động của chúng ta"</strong> (12/03/1945).
                    </li>
                    <li>
                      <strong>4. Quân lệnh số 1</strong> (13/08/1945) & Tuyên ngôn Độc lập (02/09/1945).
                    </li>
                  </ul>

                  <h5 className="section-subtitle" style={{ marginTop: '16px' }}>BÁO CHÍ CÁCH MẠNG & PHIM TƯ LIỆU:</h5>
                  <ul className="doc-list">
                    <li>• Báo <em>Cờ Giải phóng</em>, Báo <em>Độc lập</em>, Báo <em>Việt Nam Độc lập</em>.</li>
                    <li>• Đề cương về Văn hóa Việt Nam (1943).</li>
                    <li>• Phim tư liệu và hình ảnh lưu trữ: Đài Truyền hình Việt Nam (VTV) & Bảo tàng Lịch sử Quốc gia.</li>
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