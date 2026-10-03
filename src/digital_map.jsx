import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './digital_map.css';
import themeSong from './themesong.mp3';

// 1. TẬP DỮ LIỆU ĐƯỢC CHUẨN HÓA & TINH GỌN TỪ TÀI LIỆU LỊCH SỬ ĐẢNG
const historicalEvents = [
  {
    id: 'bac-son',
    title: 'Khởi nghĩa Bắc Sơn (Lạng Sơn)',
    date: '27/09/1940',
    category: 'Khởi nghĩa vũ trang',
    coords: [21.9038, 106.3262],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/nkuDKjhNTy0',
    videoSource: 'Đài Phát thanh & Truyền hình Lạng Sơn',
    highlight: 'Ra đời Đội du kích Bắc Sơn – mầm mống đầu tiên của lực lượng vũ trang cách mạng.',
    stats: [
      { label: 'Nghĩa quân tham gia', val: '~600 người' },
      { label: 'Đội du kích ban đầu', val: '20 chiến sĩ' }
    ],
    figures: ['Hoàng Văn Hán', 'Chu Văn Tấn', 'Trần Đăng Ninh'],
    timelineSteps: [
      { time: '27/09/1940', text: 'Nhân lúc tàn quân Pháp thua chạy trước phát xít Nhật, nhân dân tước vũ khí địch và đánh chiếm đồn Mỏ Nhài.' },
      { time: '16/10/1940', text: 'Xứ ủy Bắc Kỳ cử Trần Đăng Ninh về phối hợp Chu Văn Tấn thành lập Đội du kích Bắc Sơn.' },
      { time: '28/10/1940', text: 'Pháp - Nhật thỏa hiệp đàn áp; nghĩa quân rút vào căn cứ Võ Nhai bảo toàn lực lượng.' }
    ],
    significance: 'Đánh dấu bước chuyển quan trọng từ đấu tranh chính trị sang khởi nghĩa vũ trang tự vệ, tiền thân của Cứu quốc quân.'
  },
  {
    id: 'nam-ky',
    title: 'Khởi nghĩa Nam Kỳ',
    date: '23/11/1940',
    category: 'Khởi nghĩa vũ trang',
    coords: [10.8856, 106.5946],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/cbdFNXkPiLk',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    highlight: 'Lần đầu tiên lá cờ đỏ sao vàng xuất hiện trong phong trào đấu tranh cách mạng.',
    stats: [
      { label: 'Quy mô nổi dậy', val: '18 tỉnh thành' },
      { label: 'Giữ chính quyền (Mỹ Tho)', val: '49 ngày (54/56 xã)' }
    ],
    figures: ['Phan Đăng Lưu', 'Tạ Uyên', 'Nguyễn Thị Minh Khai', 'Nguyễn Thị Bảy'],
    timelineSteps: [
      { time: '20 - 22/11/1940', text: 'Lệnh khởi nghĩa đã phát đi dù Trung ương khuyên tạm hoãn; nhiều cán bộ chủ chốt bị bắt trước giờ G.' },
      { time: 'Đêm 22 - 23/11/1940', text: 'Đồng loạt bùng nổ từ Biên Hòa đến Cà Mau; phá đồn bót, xử lý phản động, cờ đỏ sao vàng tung bay.' },
      { time: '12/1940', text: 'Thực dân Pháp dội bom đàn áp tàn khốc; nghĩa quân rút về lập căn cứ tại U Minh và Đồng Tháp Mười.' }
    ],
    significance: 'Cuộc diễn tập vũ trang quy mô nhất Nam Bộ; đúc kết bài học xương máu về chớp thời cơ và xây dựng lực lượng.'
  },
  {
    id: 'do-luong',
    title: 'Binh biến Đô Lương (Nghệ An)',
    date: '13/01/1941',
    category: 'Khởi nghĩa vũ trang',
    coords: [18.9167, 105.3000],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/tWLqY8ZT2NA',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    highlight: 'Phát súng báo hiệu tinh thần binh lính người Việt giác ngộ theo tiếng gọi non sông.',
    stats: [
      { label: 'Địa bàn xuất phát', val: 'Đồn Chợ Rạng' },
      { label: 'Chiến sĩ kiên trung', val: '11 đồng chí hy sinh' }
    ],
    figures: ['Đội Cung (Nguyễn Văn Cung)'],
    timelineSteps: [
      { time: 'Tối 13/01/1941', text: 'Binh lính đồn Chợ Rạng bất bình vì bị bắt sang Lào làm bia đỡ đạn, đã nổi dậy đánh chiếm đồn Đô Lương.' },
      { time: 'Đêm 13/01/1941', text: 'Đoàn quân lên ôtô hành quân thần tốc về thành Vinh định phối hợp đánh chiếm cứ điểm nhưng kế hoạch bại lộ.' },
      { time: '24/04/1941', text: 'Đội Cung cùng 10 chiến sĩ kiên cường hy sinh trước họng súng quân thù tại pháp trường Vinh.' }
    ],
    significance: 'Khẳng định tinh thần yêu nước bất khuất và khả năng giác ngộ cách mạng của binh lính người Việt trong quân đội Pháp.'
  },
  {
    id: 'pac-bo',
    title: 'Pác Bó: Bác Hồ Về Nước & Hội Nghị TW 8',
    date: '28/01/1941 – 19/05/1941',
    category: 'Chủ trương chiến lược',
    coords: [22.9818, 106.0506],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/WKcXjaqJY04',
    videoSource: 'Đài Truyền hình Việt Nam (VTV3)',
    highlight: 'Quyết định lịch sử: Quyền lợi bộ phận, giai cấp phải đặt dưới quyền lợi sinh tử của toàn dân tộc.',
    stats: [
      { label: 'Hành trình bôn ba', val: '30 năm trở về' },
      { label: 'Hội nghị Trung ương', val: 'Khóa I (lần 8)' }
    ],
    figures: ['Lãnh tụ Nguyễn Ái Quốc (Chủ trì)'],
    timelineSteps: [
      { time: '28/01/1941', text: 'Lãnh tụ Nguyễn Ái Quốc vượt mốc 108 biên giới về lán Khuổi Nặm (Pác Bó, Cao Bằng) trực tiếp lãnh đạo.' },
      { time: '10 – 19/05/1941', text: 'Chủ trì Hội nghị Trung ương 8, chuyển hướng chỉ đạo chiến lược: đặt nhiệm vụ giải phóng dân tộc lên hàng đầu.' },
      { time: '19/05/1941', text: 'Thành lập Mặt trận Việt Minh nhằm tập hợp rộng rãi mọi tầng lớp nhân dân yêu nước.' }
    ],
    significance: 'Hoàn chỉnh đường lối giương cao ngọn cờ dân tộc, tạo kim chỉ nam dẫn đến thắng lợi Cách mạng Tháng Tám.'
  },
  {
    id: 'tran-hung-dao',
    title: 'Thành lập Đội VN Tuyên truyền Giải phóng quân',
    date: '22/12/1944',
    category: 'Cao trào kháng Nhật',
    coords: [22.6105, 105.8972],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/T591PKbi3Jc',
    videoSource: 'QPVN - Truyền Hình Quốc Phòng Việt Nam',
    highlight: 'Đội quân đàn anh – tiền thân vẻ vang của Quân đội nhân dân Việt Nam anh hùng.',
    stats: [
      { label: 'Quân số ban đầu', val: '34 chiến sĩ' },
      { label: 'Chiến thắng mở màn', val: 'Phai Khắt & Nà Ngần' }
    ],
    figures: ['Võ Nguyên Giáp (Chỉ huy)', 'Hoàng Sâm (Đội trưởng)'],
    timelineSteps: [
      { time: '12/1944', text: 'Bác Hồ gửi chỉ thị đựng trong bao thuốc lá: "Chính trị trọng hơn quân sự, tập trung lực lượng lập đội chủ lực".' },
      { time: '22/12/1944', text: 'Lễ thành lập cử hành tại khu rừng Trần Hưng Đạo (Nguyên Bình, Cao Bằng) với 34 chiến sĩ.' },
      { time: '25 – 26/12/1944', text: 'Đánh úp tiêu diệt gọn đồn Phai Khắt và Nà Ngần theo chiến thuật "lai vô ảnh, khứ vô tung".' }
    ],
    significance: 'Đánh dấu sự ra đời của lực lượng vũ trang tập trung, kết hợp nhuần nhuyễn đấu tranh chính trị với quân sự.'
  },
  {
    id: 'hiep-hoa',
    title: 'Hội nghị Quân sự cách mạng Bắc Kỳ',
    date: '15/04/1945 – 20/04/1945',
    category: 'Cao trào kháng Nhật',
    coords: [21.3444, 105.9861],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/g0ib84B6s0A',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    highlight: 'Hợp nhất toàn bộ lực lượng vũ trang, chuẩn bị trực tiếp chớp thời cơ Tổng khởi nghĩa.',
    stats: [
      { label: 'Chiến khu cả nước', val: 'Quy hoạch 7 chiến khu' },
      { label: 'Quân đội thống nhất', val: '13 đại đội chủ lực' }
    ],
    figures: ['Trường Chinh (Chủ trì)', 'Võ Nguyên Giáp', 'Trần Đăng Ninh', 'Chu Văn Tấn'],
    timelineSteps: [
      { time: '15/04/1945', text: 'Ban Thường vụ Trung ương Đảng họp tại Hiệp Hòa (Bắc Giang), xác định nhiệm vụ quân sự lên trên hết.' },
      { time: 'Kế hoạch tác chiến', text: 'Đẩy mạnh chiến tranh du kích, phá kho thóc Nhật cứu đói, xây dựng căn cứ địa kháng Nhật.' },
      { time: '15/05/1945', text: 'Thống nhất Việt Nam Tuyên truyền Giải phóng quân và Cứu quốc quân thành Việt Nam Giải phóng quân tại Thái Nguyên.' }
    ],
    significance: 'Bước phát triển lý luận quân sự nhảy vọt, hợp nhất thống nhất lực lượng vũ trang trên toàn quốc.'
  },
  {
    id: 'tan-trao',
    title: 'Tân Trào: Quân Lệnh Số 1 & Quốc Dân Đại Hội',
    date: '13/08/1945 – 16/08/1945',
    category: 'Tổng khởi nghĩa',
    coords: [21.7589, 105.3789],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/32tXt4Tfsm0',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    highlight: '“Dù phải đốt cháy cả dãy Trường Sơn cũng phải kiên quyết giành cho được độc lập!”',
    stats: [
      { label: 'Đại biểu triệu tập', val: '>60 đại biểu toàn quốc' },
      { label: 'Chương trình hành động', val: '10 chính sách Việt Minh' }
    ],
    figures: ['Hồ Chí Minh', 'Trường Chinh', 'Vũ Oanh'],
    timelineSteps: [
      { time: '23h ngày 13/08', text: 'Ủy ban Khởi nghĩa toàn quốc ban bố Quân lệnh số 1 – chính thức phát động Tổng khởi nghĩa cả nước.' },
      { time: '16/08/1945', text: 'Khai mạc Quốc dân Đại hội tại đình Tân Trào, thông qua lệnh khởi nghĩa và 10 chính sách lớn.' },
      { time: 'Bầu Chính phủ', text: 'Bầu Ủy ban Dân tộc Giải phóng Việt Nam do Chủ tịch Hồ Chí Minh đứng đầu.' }
    ],
    significance: 'Đóng vai trò như một Quốc hội lâm thời, biểu thị ý chí sắt đá của toàn dân tộc vùng lên giành độc lập.'
  },
  {
    id: 'ha-noi',
    title: 'Hà Nội Khởi Nghĩa Giành Chính Quyền',
    date: '19/08/1945',
    category: 'Tổng khởi nghĩa',
    coords: [21.0245, 105.8575],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/fCqgLY4QqeE',
    videoSource: 'Trung tâm Tin tức VTV24 (Đài THVN)',
    highlight: 'Thắng lợi ở Thủ đô tạo hiệu ứng dây chuyền cổ vũ mãnh liệt phong trào cả nước.',
    stats: [
      { label: 'Quân Nhật đóng giữ', val: '>10.000 lính (án binh)' },
      { label: 'Thời gian thắng lợi', val: 'Trọn vẹn trong 1 ngày' }
    ],
    figures: ['Nguyễn Khang', 'Trần Tử Bình', 'Nguyễn Quyết'],
    timelineSteps: [
      { time: '17/08/1945', text: 'Biến cuộc mít tinh thân Nhật của Tổng hội Viên chức thành cuộc biểu tình tuần hành rầm rộ ủng hộ Việt Minh.' },
      { time: 'Sáng 19/08/1945', text: 'Hàng chục vạn quần chúng kéo về Quảng trường Nhà hát Lớn mít tinh, sau đó tỏa đi chiếm các cơ quan đầu não.' },
      { time: 'Chiều 19/08/1945', text: 'Đánh chiếm Phủ Khâm sai, Tòa Thị chính, Trại Bảo an binh; chính quyền tay sai sụp đổ hoàn toàn.' }
    ],
    significance: 'Mẫu mực về nghệ thuật chớp thời cơ, kết hợp áp đảo chính trị với xung kích vũ trang để giành thắng lợi không đổ máu.'
  },
  {
    id: 'hue',
    title: 'Khởi Nghĩa Giành Chính Quyền Tại Huế',
    date: '23/08/1945',
    category: 'Tổng khởi nghĩa',
    coords: [16.4637, 107.5909],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/m5u5Rc-QxX4',
    videoSource: 'VNAMEDIA - Trung tâm nội dung số',
    highlight: '“Thà làm dân một nước độc lập còn hơn làm vua một nước nô lệ” – Xóa bỏ ngai vàng phong kiến.',
    stats: [
      { label: 'Thời điểm tiếp quản', val: '16h ngày 23/08/1945' },
      { label: 'Chấm dứt triều đại', val: 'Nguyễn triều hàng thế kỷ' }
    ],
    figures: ['Tố Hữu', 'Hồ Tùng Mậu', 'Trần Huy Liệu', 'Vua Bảo Đại'],
    timelineSteps: [
      { time: '20 – 22/08/1945', text: 'Phái đoàn Trung ương thành lập Ủy ban Khởi nghĩa tại Huế do Tố Hữu làm Chủ tịch, gây sức ép buộc Bảo Đại thoái vị.' },
      { time: '23/08/1945', text: 'Hàng vạn nhân dân mít tinh tại sân vận động Huế; công bố thành lập Ủy ban Nhân dân Cách mạng lâm thời.' },
      { time: '30/08/1945', text: 'Vua Bảo Đại đọc Chiếu thoái vị, trao nộp ấn kiếm trước cửa Ngọ Môn cho phái đoàn đại diện chính phủ.' }
    ],
    significance: 'Xóa bỏ hoàn toàn chế độ quân chủ phong kiến tồn tại hàng ngàn năm tại Việt Nam.'
  },
  {
    id: 'sai-gon',
    title: 'Sài Gòn Khởi Nghĩa Giành Chính Quyền',
    date: '25/08/1945',
    category: 'Tổng khởi nghĩa',
    coords: [10.7769, 106.7009],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/FOMRPr1TXHk',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    highlight: 'Khí thế ngút trời đưa cuộc Tổng khởi nghĩa 15 ngày trên cả nước toàn thắng trọn vẹn.',
    stats: [
      { label: 'Quần chúng biểu tình', val: '>1.000.000 đồng bào' },
      { label: 'Lực lượng xung kích', val: 'Thanh niên Tiền phong' }
    ],
    figures: ['Trần Văn Giàu (Chủ tịch UB Hành chánh Nam Bộ)'],
    timelineSteps: [
      { time: 'Tối 24/08/1945', text: 'Chiếm các mục tiêu trọng yếu: Dinh Khâm sai, bưu điện, nhà đèn, bót cảnh sát; hạ cờ quẻ ly kéo cờ đỏ sao vàng.' },
      { time: 'Sáng 25/08/1945', text: 'Hơn một triệu quần chúng Sài Gòn – Chợ Lớn với giáo mác, tầm vông vạt nhọn rầm rộ xuống đường tuần hành.' },
      { time: '13h ngày 25/08', text: 'Đồng chí Trần Văn Giàu tuyên bố thành lập nền Dân chủ Cộng hòa tại Nam Bộ trước hàng vạn quốc dân.' }
    ],
    significance: 'Đòn quyết định làm chủ sào huyệt thực dân cuối cùng, khẳng định trọn vẹn nền độc lập từ Bắc chí Nam.'
  },
  {
    id: 'ba-dinh',
    title: 'Ba Đình: Tuyên Ngôn Độc Lập Khai Sinh Đất Nước',
    date: '02/09/1945',
    category: 'Thắng lợi hoàn toàn',
    coords: [21.0378, 105.8344],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/jHmz5FgYpYo',
    videoSource: 'Đài Truyền hình Việt Nam (VTV)',
    highlight: '“Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập!”',
    stats: [
      { label: 'Thời gian soạn thảo', val: '28 – 31/08 (48 Hàng Ngang)' },
      { label: 'Thời khắc công bố', val: '14h00 ngày 02/09/1945' }
    ],
    figures: ['Chủ tịch Hồ Chí Minh', 'Kiến trúc sư Ngô Huy Quỳnh (thiết kế lễ đài)'],
    timelineSteps: [
      { time: '28 – 31/08/1945', text: 'Bác Hồ khởi thảo và hoàn thiện bản Tuyên ngôn Độc lập tại tầng 2 căn nhà số 48 phố Hàng Ngang.' },
      { time: '14h ngày 02/09/1945', text: 'Trước hàng chục vạn đồng bào tại Ba Đình, Người trịnh trọng đọc Tuyên ngôn, khai sinh nước VNDCCH.' },
      { time: 'Lời thề độc lập', text: 'Chính phủ lâm thời ra mắt và toàn thể quốc dân đồng thanh tuyên thệ quyết đem tính mạng, của cải giữ vững độc lập.' }
    ],
    significance: 'Mở ra kỷ nguyên mới rực rỡ: Nước Việt Nam Dân chủ Cộng hòa – Nhà nước công nông đầu tiên ở Đông Nam Á.'
  }
];

export default function HistoricalMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const timelineRef = useRef(null);

  // Quản lý âm thanh
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
    { key: 'Tổng khởi nghĩa', label: 'Tổng khởi nghĩa' },
    { key: 'Thắng lợi hoàn toàn', label: 'Độc lập' }
  ];

  const filteredEvents = filterCategory === 'ALL'
    ? historicalEvents
    : historicalEvents.filter(ev => ev.category === filterCategory);

  // 1. KHỞI TẠO BẢN ĐỒ VÀ GẮN CHỦ QUYỀN BIỂN ĐẢO
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const strictBounds = [
      [6.5, 101.0],
      [26.5, 118.0]
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

    L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      attribution: '&copy; Google Maps',
      maxZoom: 20
    }).addTo(map);

    // Nhãn Hoàng Sa
    const hoangSaBadge = L.divIcon({
      className: 'custom-island-badge',
      html: `
        <div class="island-tag-box" style="padding: 6px 12px; min-width: 170px; text-align: center; justify-content: center;">
          <span class="flag" style="font-size: 18px;">🇻🇳</span>
          <div class="tag-text">
            <strong style="font-size: 13px; letter-spacing: 0.5px;">QUẦN ĐẢO HOÀNG SA</strong>
            <small style="font-size: 10.5px; opacity: 0.95;">(TP. Đà Nẵng, Việt Nam)</small>
          </div>
        </div>
      `,
      iconSize: [180, 44],
      iconAnchor: [90, 22]
    });

    // Nhãn Trường Sa
    const truongSaBadge = L.divIcon({
      className: 'custom-island-badge',
      html: `
        <div class="island-tag-box" style="padding: 6px 12px; min-width: 170px; text-align: center; justify-content: center;">
          <span class="flag" style="font-size: 18px;">🇻🇳</span>
          <div class="tag-text">
            <strong style="font-size: 13px; letter-spacing: 0.5px;">QUẦN ĐẢO TRƯỜNG SA</strong>
            <small style="font-size: 10.5px; opacity: 0.95;">(Khánh Hòa, Việt Nam)</small>
          </div>
        </div>
      `,
      iconSize: [180, 44],
      iconAnchor: [90, 22]
    });

    L.marker([16.54, 112.1], { icon: hoangSaBadge, interactive: false }).addTo(map);
    L.marker([9.5, 113.5], { icon: truongSaBadge, interactive: false }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);

    const handleResize = () => map.invalidateSize();
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

  // 2. VẼ MARKER LÊN BẢN ĐỒ
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

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

      const marker = L.marker(ev.coords, { icon: customIcon });
      marker.on('click', () => {
        setIsVideoPlaying(false);
        setSelectedEvent(ev);
        const isMobile = window.innerWidth <= 768;
        const targetLat = isMobile ? ev.coords[0] - 0.4 : ev.coords[0];
        mapInstanceRef.current.flyTo([targetLat, ev.coords[1]], 8.5, { duration: 1.0 });
      });

      markersLayerRef.current.addLayer(marker);
    });
  }, [filteredEvents, selectedEvent]);

  // 3. XỬ LÝ ÂM THANH
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
          gainNode.gain.value = 0.2;

          const source = ctx.createMediaElementSource(audio);
          source.connect(gainNode);
          gainNode.connect(ctx.destination);

          audioCtxRef.current = ctx;
          gainNodeRef.current = gainNode;
        }
      } catch (err) {
        console.warn("Fallback HTML Audio:", err);
        audio.volume = 0.2;
      }

      audio.onplay = () => setIsPlayingMusic(true);
      audio.onpause = () => setIsPlayingMusic(false);

      audioRef.current = audio;
    }
    return audioRef.current;
  };

  const fadeVolume = (targetVolume, duration = 0.8) => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
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

  useEffect(() => {
    const handleYouTubeMessage = (event) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && data.event === 'onStateChange') {
          if (data.info === 1) setIsVideoPlaying(true);
          else if (data.info === 2 || data.info === 0) setIsVideoPlaying(false);
        }
      } catch {}
    };
    window.addEventListener('message', handleYouTubeMessage);
    return () => window.removeEventListener('message', handleYouTubeMessage);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (selectedEvent || isVideoPlaying) {
      fadeVolume(0.05, 0.5);
    } else {
      fadeVolume(0.2, 1.2);
    }
  }, [selectedEvent, isVideoPlaying]);

  const handleEnableAudio = () => {
    const audio = getAudioInstance();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    audio.play().then(() => setIsPlayingMusic(true)).catch(console.error);
    setShowAudioPrompt(false);
  };

  const toggleMusic = () => {
    const audio = getAudioInstance();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    if (audio.paused) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  };

  const handleCategoryChange = (catKey) => {
    setFilterCategory(catKey);
    if (timelineRef.current) timelineRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    if (selectedEvent && catKey !== 'ALL' && selectedEvent.category !== catKey) {
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

  const scrollTimeline = (dir) => {
    if (timelineRef.current) {
      const scrollAmount = dir === 'left' ? -260 : 260;
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
              <h1>BẢN ĐỒ MỐC SON LỊCH SỬ (1939 - 1945)</h1>
              <p>Cách mạng Tháng Tám toàn thắng</p>
            </div>
          </div>

          <div className="header-actions">
            <button
              className={`music-btn ${isPlayingMusic ? 'playing' : ''}`}
              onClick={toggleMusic}
              title={isPlayingMusic ? "Tắt nhạc" : "Bật nhạc"}
            >
              {isPlayingMusic ? '🔊' : '🔇'}
            </button>

            <button 
              className="info-nav-btn" 
              onClick={() => setShowInfoModal(true)}
              title="Xem nhóm tác giả & tài liệu"
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

      {/* 2. MAP VIEW */}
      <div className="map-viewport" ref={mapContainerRef} />

      {/* 3. TIMELINE BAR */}
      <div className={`timeline-wrapper ${selectedEvent ? 'with-sidebar' : ''}`}>
        <button className="scroll-btn prev desktop-only" onClick={() => scrollTimeline('left')}>‹</button>
        <div className="quick-timeline-bar" ref={timelineRef}>
          {filteredEvents.map((ev) => (
            <button
              key={ev.id}
              className={`timeline-chip ${selectedEvent?.id === ev.id ? 'active' : ''}`}
              onClick={() => handleSelectEvent(ev)}
            >
              <span className="chip-date">{ev.date.split('–')[0].trim()}</span>
              <span className="chip-name">{ev.title.split('(')[0].split(':')[0]}</span>
            </button>
          ))}
        </div>
        <button className="scroll-btn next desktop-only" onClick={() => scrollTimeline('right')}>›</button>
      </div>

      {/* 4. SIDEBAR CHI TIẾT SỰ KIỆN - THIẾT KẾ CARD TRỰC QUAN */}
      <aside className={`info-sidebar ${selectedEvent ? 'open' : ''}`}>
        {selectedEvent && (
          <div className="sidebar-inner">
            <div className="mobile-sheet-handle" onClick={handleCloseSidebar} />
            <button className="close-sidebar-btn" onClick={handleCloseSidebar} title="Đóng">✕</button>

            <div className="sidebar-top">
              <span className="badge-tag">{selectedEvent.category}</span>
              <span className="badge-date">📅 {selectedEvent.date}</span>
            </div>

            <h2 className="event-heading">{selectedEvent.title}</h2>

            <blockquote className="event-quote">
              “{selectedEvent.highlight}”
            </blockquote>

            {/* VIDEO TƯ LIỆU */}
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

            <div className="video-source-box">
              <span className="source-icon">📺</span>
              <span className="source-text">
                Nguồn: <strong>{selectedEvent.videoSource}</strong>
              </span>
            </div>

            {/* 1. KHỐI CON SỐ BIẾT NÓI */}
            <div className="quick-stats-grid">
              {selectedEvent.stats.map((s, idx) => (
                <div key={idx} className="stat-box">
                  <span className="stat-val">{s.val}</span>
                  <span className="stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>

            {/* 2. KHỐI NHÂN VẬT THEN CHỐT */}
            <div className="key-figures-box">
              <span className="figure-label">👤 Nhân vật chủ chốt:</span>
              {selectedEvent.figures.map((fig, idx) => (
                <span key={idx} className="figure-tag">{fig}</span>
              ))}
            </div>

            {/* 3. DÒNG THỜI GIAN DIỄN BIẾN NHANH */}
            <div className="event-body">
              <h3 style={{ fontSize: '13.5px', margin: '14px 0 6px 0', color: '#111' }}>
                ⚡ Diễn biến sự kiện tóm tắt:
              </h3>
              <div className="mini-timeline-list">
                {selectedEvent.timelineSteps.map((step, idx) => (
                  <div key={idx} className="mini-step-item">
                    <span className="step-time-badge">{step.time}</span>
                    <p className="step-content">{step.text}</p>
                  </div>
                ))}
              </div>

              {/* 4. Ý NGHĨA ĐÚC KẾT */}
              <div className="significance-card">
                <h4>Ý NGHĨA LỊCH SỬ</h4>
                <p>{selectedEvent.significance}</p>
              </div>
            </div>

            <div className="sidebar-footer">
              <span>Trích: Văn kiện Đảng Toàn tập & Giáo trình Lịch sử Đảng</span>
            </div>
          </div>
        )}
      </aside>

      {/* 5. MODAL TÁC GIẢ & TÀI LIỆU */}
      {showInfoModal && (
        <div className="modal-backdrop" onClick={() => setShowInfoModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <span className="modal-icon">🏛️️</span>
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
                    <p>Ứng dụng công nghệ bản đồ tương tác số hóa không gian lịch sử thời kỳ tiền khởi nghĩa và Cách mạng Tháng Tám toàn thắng.</p>
                  </div>
                  
                  <h5 className="section-subtitle">GIẢNG VIÊN HƯỚNG DẪN:</h5> 
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
                    <strong>Thông tin lớp học:</strong> Nhóm 1 – Lớp LLCT220514 (Nhóm 4) – Học kỳ I, năm học 2026-2027.
                  </div>
                </div>
              ) : (
                <div className="tab-pane">
                  <h5 className="section-subtitle">VĂN KIỆN & TÀI LIỆU LỊCH SỬ CHÍNH THỐNG:</h5>
                  <ul className="doc-list">
                    <li>
                      <strong>1. Giáo trình Lịch sử Đảng Cộng sản Việt Nam</strong>, NXB Chính trị quốc gia Sự thật.
                    </li>
                    <li>
                      <strong>2. Văn kiện Đảng Toàn tập (Tập 7: 1940 – 1945)</strong>: Nghị quyết TW 6, TW 7, TW 8.
                    </li>
                    <li>
                      <strong>3. Chỉ thị "Nhật - Pháp bắn nhau và hành động của chúng ta"</strong> (12/03/1945).
                    </li>
                    <li>
                      <strong>4. Quân lệnh số 1</strong> (13/08/1945) & Tuyên ngôn Độc lập (02/09/1945).
                    </li>
                    <li>
                      <strong>5. Đại tướng Võ Nguyên Giáp</strong>: <em>Những năm tháng không thể nào quên</em>, NXB QĐND.
                    </li>
                    <li>
                      <strong>6. Trần Dân Tiên</strong>: <em>Những mẩu chuyện về đời hoạt động của Hồ Chủ tịch</em>.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL ÂM THANH */}
      {showAudioPrompt && (
        <div className="audio-prompt-backdrop">
          <div className="audio-prompt-box">
            <div className="audio-prompt-icon">🎺</div>
            <h3>BẠN CÓ MUỐN BẬT NHẠC NỀN?</h3>
            <p>Trải nghiệm khám phá bản đồ sẽ sống động và hào hùng hơn khi đi kèm âm thanh giai điệu cách mạng.</p>
            <div className="audio-prompt-actions">
              <button className="prompt-btn-allow" onClick={handleEnableAudio}>
                🔊 Bật nhạc nền
              </button>
              <button className="prompt-btn-skip" onClick={() => setShowAudioPrompt(false)}>
                🔇 Khám phá không âm thanh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}