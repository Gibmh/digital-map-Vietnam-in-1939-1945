import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './digital_map.css';
import themeSong from './themesong.mp3';

// 1. TẬP DỮ LIỆU ĐƯỢC CHUẨN HÓA & TINH GỌN TỪ TÀI LIỆU LỊCH SỬ ĐẢNG
const historicalEvents = [
  {
    id: 'bac-son',
    title: 'Khởi nghĩa Bắc Sơn & Sự chuyển hướng chỉ đạo của Đảng',
    date: '27/09/1940',
    category: 'Chủ trương & Khởi nghĩa vũ trang',
    coords: [21.9038, 106.3262],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/nkuDKjhNTy0',
    videoSource: 'Đài Phát thanh & Truyền hình Lạng Sơn',
    highlight: 'Sự nhạy bén của Xứ ủy Bắc Kỳ trong việc kịp thời phối hợp, bước đầu chuyển hướng từ đấu tranh chính trị sang khởi nghĩa tự vệ.',
    stats: [
      { label: 'Cơ quan chỉ đạo', val: 'Xứ ủy Bắc Kỳ' },
      { label: 'Lực lượng nòng cốt', val: 'Đội du kích Bắc Sơn (20 chiến sĩ)' }
    ],
    figures: ['Hoàng Văn Hán', 'Chu Văn Tấn', 'Trần Đăng Ninh'],
    timelineSteps: [
      { time: '27/09/1940', text: 'Nhân dân dưới sự lãnh đạo của chi bộ Đảng chớp thời cơ Pháp - Nhật giao tranh, tước vũ khí địch, đánh chiếm đồn Mỏ Nhài.' },
      { time: '16/10/1940', text: 'Xứ ủy Bắc Kỳ kịp thời cử cán bộ (Trần Đăng Ninh) lên phối hợp với Chu Văn Tấn, quyết định thành lập Đội du kích Bắc Sơn.' },
      { time: '28/10/1940', text: 'Đảng rút ra bài học thực tiễn về việc bảo toàn lực lượng khi so sánh lực lượng chưa có lợi cho cách mạng.' }
    ],
    significance: 'Đánh dấu bước chuyển hướng chỉ đạo quan trọng của Đảng: bước đầu kết hợp đấu tranh chính trị với vũ trang tự vệ, đặt nền móng cho việc xây dựng lực lượng vũ trang tập trung.'
  },
  {
    id: 'nam-ky',
    title: 'Khởi nghĩa Nam Kỳ & Bài học kinh nghiệm về đánh giá thời cơ',
    date: '23/11/1940',
    category: 'Đường lối & Phong trào cách mạng',
    coords: [10.8856, 106.5946],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/cbdFNXkPiLk',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    highlight: 'Để lại bài học xương máu quý báu cho Đảng về nghệ thuật đánh giá thời cơ, chuẩn bị lực lượng và sự thống nhất ý chí trong tổ chức.',
    stats: [
      { label: 'Quy mô nổi dậy', val: '18/21 tỉnh Nam Bộ' },
      { label: 'Bài học rút ra', val: 'Thời cơ và sự chuẩn bị lực lượng' }
    ],
    figures: ['Phan Đăng Lưu', 'Tạ Uyên', 'Nguyễn Thị Minh Khai', 'Nguyễn Thị Bảy'],
    timelineSteps: [
      { time: '11/1940', text: 'Xứ ủy Nam Kỳ quyết định phát động khởi nghĩa dù Trung ương Đảng đã nhận định điều kiện chưa chín muồi và xin tạm hoãn.' },
      { time: 'Đêm 22 - 23/11/1940', text: 'Cuộc nổi dậy diễn ra quy mô lớn tại 18 tỉnh Nam Bộ, thể hiện tinh thần kiên trung tuyệt đối của quần chúng với Đảng.' },
      { time: '12/1940', text: 'Đảng tổng kết bài học kinh nghiệm sâu sắc về chỉ đạo chiến lược, sự thống nhất tuyệt đối từ Trung ương đến địa phương.' }
    ],
    significance: 'Cung cấp cho Đảng bài học kinh nghiệm xương máu về chỉ đạo khởi nghĩa: phải đúng thời điểm, khi lực lượng đã được chuẩn bị đầy đủ và thời cơ cách mạng đã chín muồi.'
  },
  {
    id: 'do-luong',
    title: 'Binh biến Đô Lương & Công tác vận động binh lính của Đảng',
    date: '13/01/1941',
    category: 'Công tác binh vận của Đảng',
    coords: [18.9167, 105.3000],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/tWLqY8ZT2NA',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    highlight: 'Minh chứng sinh động cho hiệu quả của công tác vận động binh lính (binh vận) – một mặt trận quan trọng trong chiến lược của Đảng.',
    stats: [
      { label: 'Mặt trận công tác', val: 'Công tác Binh vận' },
      { label: 'Lãnh đạo chủ chốt', val: 'Đội Cung (Nguyễn Văn Cung)' }
    ],
    figures: ['Đội Cung (Nguyễn Văn Cung)'],
    timelineSteps: [
      { time: '13/01/1941', text: 'Dưới ảnh hưởng của tổ chức Đảng, binh lính người Việt tại đồn Chợ Rạng nổi dậy chống lệnh điều đi làm bia đỡ đạn.' },
      { time: 'Đêm 13/01/1941', text: 'Cuộc binh biến đánh chiếm Đô Lương và hành quân về Vinh nhưng do chưa kết nối được với phong trào chung nên bị cô lập.' },
      { time: '24/04/1941', text: 'Các chiến sĩ binh biến kiên cường hy sinh, khẳng định tinh thần bất khuất trước kẻ thù.' }
    ],
    significance: 'Khẳng định tầm quan trọng của công tác binh vận trong đường lối cách mạng của Đảng, góp phần phân hóa và làm suy yếu hàng ngũ địch.'
  },
  {
    id: 'pac-bo',
    title: 'Hội nghị Trung ương 8 (05/1941): Hoàn chỉnh chuyển hướng chiến lược',
    date: '28/01/1941 – 19/05/1941',
    category: 'Chủ trương & Đường lối chiến lược',
    coords: [22.9818, 106.0506],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/WKcXjaqJY04',
    videoSource: 'Đài Truyền hình Việt Nam (VTV3)',
    highlight: 'Đỉnh cao tư duy lý luận của Chủ tịch Hồ Chí Minh: Đặt nhiệm vụ giải phóng dân tộc lên hàng đầu, giải quyết đúng đắn vấn đề dân tộc và giai cấp.',
    stats: [
      { label: 'Văn kiện chủ đạo', val: 'Nghị quyết Hội nghị TW 8 (Khóa I)' },
      { label: 'Tổ chức mặt trận', val: 'Mặt trận Việt Minh (19/05/1941)' }
    ],
    figures: ['Lãnh tụ Hồ Chí Minh (Chủ trì)'],
    timelineSteps: [
      { time: '28/01/1941', text: 'Lãnh tụ Nguyễn Ái Quốc về nước, trực tiếp lãnh đạo phong trào cách mạng Việt Nam sau 30 năm bôn ba.' },
      { time: '10 – 19/05/1941', text: 'Chủ trì Hội nghị Trung ương 8 tại Pác Bó (Cao Bằng), quyết định tạm gác khẩu hiệu cách mạng ruộng đất, đặt nhiệm vụ giải phóng dân tộc lên trên hết.' },
      { time: '19/05/1941', text: 'Sáng lập Mặt trận Việt Minh nhằm đoàn kết rộng rãi mọi tầng lớp nhân dân không phân biệt tôn giáo, giai cấp.' }
    ],
    significance: 'Hoàn chỉnh sự chuyển hướng chiến lược được vạch ra từ Hội nghị TW 6 (1939), là văn kiện kim chỉ nam quyết định thắng lợi của Cách mạng Tháng Tám 1945.'
  },
  {
    id: 'tran-hung-dao',
    title: 'Thành lập Đội VNTTGPQ: Tư tưởng quân sự của Đảng',
    date: '22/12/1944',
    category: 'Xây dựng lực lượng vũ trang',
    coords: [22.6105, 105.8972],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/T591PKbi3Jc',
    videoSource: 'QPVN - Truyền Hình Quốc Phòng Việt Nam',
    highlight: 'Thực hiện chỉ thị của Hồ Chí Minh: “Chính trị trọng hơn quân sự”, đặt cơ sở cho việc xây dựng lực lượng vũ trang chính quy.',
    stats: [
      { label: 'Chỉ thị lãnh đạo', val: 'Chỉ thị thành lập Đội VNTTGPQ' },
      { label: 'Nguyên tắc tổ chức', val: 'Đảng lãnh đạo tuyệt đối' }
    ],
    figures: ['Hồ Chí Minh', 'Võ Nguyên Giáp (Chỉ huy)', 'Hoàng Sâm (Đội trưởng)'],
    timelineSteps: [
      { time: '12/1944', text: 'Bác Hồ ra chỉ thị nhấn mạnh nguyên tắc chính trị trọng hơn quân sự, tuyên truyền trọng hơn tác chiến.' },
      { time: '22/12/1944', text: 'Thành lập Đội Việt Nam Tuyên truyền Giải phóng quân tại rừng Trần Hưng Đạo (Cao Bằng).' },
      { time: '25 – 26/12/1944', text: 'Giành thắng lợi vang dội tại Phai Khắt và Nà Ngần, khẳng định nghệ thuật quân sự tài tình của lực lượng chủ lực đầu tiên.' }
    ],
    significance: 'Thể hiện bước phát triển mới trong tư tưởng quân sự của Đảng: kết hợp chặt chẽ giữa đấu tranh chính trị và đấu tranh vũ trang, xây dựng lực lượng vũ trang 3 thứ quân.'
  },
  {
    id: 'hiep-hoa',
    title: 'Hội nghị Quân sự cách mạng Bắc Kỳ (04/1945)',
    date: '15/04/1945 – 20/04/1945',
    category: 'Chủ trương & Quân sự',
    coords: [21.3444, 105.9861],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/g0ib84B6s0A',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    highlight: 'Quyết định tầm nhìn chiến lược: Thống nhất lực lượng vũ trang toàn quốc, chuẩn bị trực tiếp cho Tổng khởi nghĩa.',
    stats: [
      { label: 'Cơ quan triệu tập', val: 'Ban Thường vụ Trung ương Đảng' },
      { label: 'Quyết định lớn', val: 'Thống nhất Việt Nam Giải phóng quân' }
    ],
    figures: ['Trường Chinh (Chủ trì)', 'Võ Nguyên Giáp', 'Trần Đăng Ninh'],
    timelineSteps: [
      { time: '15/04/1945', text: 'Ban Thường vụ Trung ương Đảng họp tại Hiệp Hòa (Bắc Giang), nhận định thời cơ khởi nghĩa đang đến gần.' },
      { time: '15/05/1945', text: 'Hợp nhất Việt Nam Tuyên truyền Giải phóng quân và Cứu quốc quân thành Việt Nam Giải phóng quân.' },
      { time: 'Tháng 5/1945', text: 'Thiết lập 7 chiến khu lớn làm căn cứ địa vững chắc cho cách mạng.' }
    ],
    significance: 'Đánh dấu bước nhảy vọt trong công tác chuẩn bị về quân sự của Đảng, đáp ứng yêu cầu cấp bách của tình thế cách mạng trước khi Nhật đầu hàng Đồng minh.'
  },
  {
    id: 'tan-trao',
    title: 'Quốc dân Đại hội Tân Trào & Quân lệnh số 1',
    date: '13/08/1945 – 16/08/1945',
    category: 'Nghệ thuật lãnh đạo Tổng khởi nghĩa',
    coords: [21.7589, 105.3789],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/32tXt4Tfsm0',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    highlight: 'Sự quyết đoán tối cao của Trung ương Đảng và Chủ tịch Hồ Chí Minh: Chớp thời cơ ngàn năm có một để phát động Tổng khởi nghĩa.',
    stats: [
      { label: 'Văn kiện ban bố', val: 'Quân lệnh số 1 (Ủy ban Khởi nghĩa)' },
      { label: 'Cơ quan lâm thời', val: 'Ủy ban Dân tộc Giải phóng' }
    ],
    figures: ['Hồ Chí Minh', 'Trường Chinh'],
    timelineSteps: [
      { time: '23h ngày 13/08/1945', text: 'Ngay khi nhận tin Nhật sắp đầu hàng, Đảng và Tổng bộ Việt Minh lập tức ban bố Quân lệnh số 1.' },
      { time: '16/08/1945', text: 'Đại hội Quốc dân Tân Trào thông qua 10 chính sách lớn của Việt Minh và bầu Chính phủ lâm thời.' },
      { time: 'Tháng 8/1945', text: 'Hồ Chí Minh ra lời kêu gọi Tổng khởi nghĩa: "Dù phải đốt cháy cả dãy Trường Sơn cũng phải kiên quyết giành cho được độc lập".' }
    ],
    significance: 'Thể hiện năng lực lãnh đạo xuất sắc, tầm nhìn chiến lược sắc bén và sự nhạy bén đặc biệt của Đảng trong việc đón đầu thời cơ.'
  },
  {
    id: 'ha-noi',
    title: 'Đảng bộ Hà Nội lãnh đạo khởi nghĩa giành chính quyền',
    date: '19/08/1945',
    category: 'Nghệ thuật chớp thời cơ',
    coords: [21.0245, 105.8575],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/fCqgLY4QqeE',
    videoSource: 'Trung tâm Tin tức VTV24 (Đài THVN)',
    highlight: 'Mẫu mực về sự lãnh đạo linh hoạt, sáng tạo của Đảng bộ địa phương trong việc biến mít tinh của địch thành cuộc khởi nghĩa.',
    stats: [
      { label: 'Đảng bộ lãnh đạo', val: 'Thành ủy Hà Nội' },
      { label: 'Đặc điểm thắng lợi', val: 'Nhanh chóng, triệt để, ít đổ máu' }
    ],
    figures: ['Nguyễn Khang', 'Trần Tử Bình', 'Nguyễn Quyết'],
    timelineSteps: [
      { time: '17/08/1945', text: 'Đảng bộ Hà Nội khôn khéo lái cuộc mít tinh của Tổng hội Viên chức thân Nhật thành cuộc tuần hành biểu dương lực lượng.' },
      { time: 'Sáng 19/08/1945', text: 'Hàng chục vạn quần chúng dưới sự lãnh đạo của mặt trận Việt Minh tỏa đi chiếm các cơ quan đầu não của địch.' },
      { time: 'Chiều 19/08/1945', text: 'Khởi nghĩa tại Thủ đô thắng lợi hoàn toàn, tạo tiếng vang và hiệu ứng dây chuyền cho cả nước.' }
    ],
    significance: 'Minh chứng rõ nét cho phương thức lãnh đạo linh hoạt, chủ động, sáng tạo của các cấp ủy đảng và nghệ thuật kết hợp lực lượng chính trị với vũ trang.'
  },
  {
    id: 'hue',
    title: 'Khởi nghĩa tại Huế & Xóa bỏ chế độ phong kiến',
    date: '23/08/1945',
    category: 'Thắng lợi Tổng khởi nghĩa',
    coords: [16.4637, 107.5909],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/m5u5Rc-QxX4',
    videoSource: 'VNAMEDIA - Trung tâm nội dung số',
    highlight: 'Đường lối ngoại giao và chính trị sắc bén của Đảng trong việc buộc chính quyền phong kiến đầu hàng không đổ máu, vua Bảo Đại thoái vị.',
    stats: [
      { label: 'Cơ quan chỉ đạo', val: 'Ủy ban Khởi nghĩa Trung Trung Bộ' },
      { label: 'Sự kiện mang tính biểu tượng', val: 'Vua Bảo Đại thoái vị (30/08)' }
    ],
    figures: ['Tố Hữu', 'Hồ Tùng Mậu', 'Trần Huy Liệu', 'Vua Bảo Đại'],
    timelineSteps: [
      { time: '20 – 22/08/1945', text: 'Tố Hữu và Xứ ủy Trung Kỳ khẩn trương chuẩn bị lực lượng, gây sức ép chính trị mạnh mẽ lên triều đình Huế.' },
      { time: '23/08/1945', text: 'Nhân dân Huế khởi nghĩa giành chính quyền thành công, lập Ủy ban Nhân dân Cách mạng lâm thời.' },
      { time: '30/08/1945', text: 'Đảng và Chính phủ tiếp nhận ấn kiếm, chính thức chấm dứt triều đại phong kiến cuối cùng.' }
    ],
    significance: 'Thể hiện thành công nghệ thuật vận động, thuyết phục và phân hóa kẻ thù của Đảng, giải quyết triệt để vấn đề chính quyền.'
  },
  {
    id: 'sai-gon',
    title: 'Khởi nghĩa tại Sài Gòn & Hoàn thành thắng lợi Nam Bộ',
    date: '25/08/1945',
    category: 'Thắng lợi Tổng khởi nghĩa',
    coords: [10.7769, 106.7009],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/FOMRPr1TXHk',
    videoSource: 'Truyền hình Nhân Dân (Báo Nhân Dân)',
    highlight: 'Đảng bộ Nam Bộ lãnh đạo quần chúng vùng lên đập tan sào huyệt cuối cùng của thực dân, hoàn thành trọn vẹn Tổng khởi nghĩa từ Bắc chí Nam.',
    stats: [
      { label: 'Lãnh đạo trực tiếp', val: 'Xứ ủy Nam Bộ & Trần Văn Giàu' },
      { label: 'Lực lượng tham gia', val: 'Hơn 1 triệu quần chúng' }
    ],
    figures: ['Trần Văn Giàu'],
    timelineSteps: [
      { time: 'Tối 24/08/1945', text: 'Xứ ủy Nam Bộ quyết định phát động khởi nghĩa chiếm các mục tiêu chiến lược tại Sài Gòn.' },
      { time: 'Sáng 25/08/1945', text: 'Hơn một triệu đồng bào Sài Gòn - Chợ Lớn rầm rộ xuống đường biểu tình, làm tê liệt toàn bộ hệ thống cai trị của địch.' },
      { time: '13h ngày 25/08/1945', text: 'Tuyên bố thành lập chính quyền cách mạng lâm thời Nam Bộ trước hàng vạn quần chúng.' }
    ],
    significance: 'Khẳng định sự lãnh đạo kiên cường, sáng tạo của Đảng bộ Nam Bộ, đưa cuộc Tổng khởi nghĩa 1945 đi đến thắng lợi toàn diện trên phạm vi cả nước.'
  },
  {
    id: 'ba-dinh',
    title: 'Khai sinh nước Việt Nam Dân chủ Cộng hòa',
    date: '02/09/1945',
    category: 'Thắng lợi & Hoạch định quốc gia',
    coords: [21.0378, 105.8344],
    videoEmbed: 'https://www.youtube-nocookie.com/embed/jHmz5FgYpYo',
    videoSource: 'Đài Truyền hình Việt Nam (VTV)',
    highlight: 'Thành quả vĩ đại nhất dưới sự lãnh đạo của Đảng: Đưa dân tộc Việt Nam bước vào kỷ nguyên độc lập, tự do, Đảng trở thành đảng cầm quyền.',
    stats: [
      { label: 'Tác giả văn kiện', val: 'Chủ tịch Hồ Chí Minh' },
      { label: 'Nhà nước ra đời', val: 'VNDCCH (Nhà nước công nông đầu tiên ĐNA)' }
    ],
    figures: ['Chủ tịch Hồ Chí Minh', 'Các đồng chí trong Chính phủ lâm thời'],
    timelineSteps: [
      { time: '28 – 31/08/1945', text: 'Chủ tịch Hồ Chí Minh soạn thảo bản Tuyên ngôn Độc lập, đúc kết ý chí và khát vọng của toàn Đảng, toàn dân.' },
      { time: '14h ngày 02/09/1945', text: 'Tại Quảng trường Ba Đình lịch sử, Người đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.' },
      { time: '02/09/1945', text: 'Chính phủ lâm thời ra mắt quốc dân và toàn thể nhân dân đồng thanh tuyên thệ bảo vệ nền độc lập.' }
    ],
    significance: 'Đánh dấu mốc son chói lọi trong lịch sử dân tộc và Lịch sử Đảng: Đảng từ một đảng hoạt động bí mật đã trở thành đảng cầm quyền, lãnh đạo Nhà nước và xã hội.'
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
              Tác giả & Tài liệu
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