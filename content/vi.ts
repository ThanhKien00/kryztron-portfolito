import type { Dictionary } from "./types";

const vi = {
  meta: {
    title: "Nguyễn Thành Kiên — Kỹ sư phần mềm",
    description:
      "Kỹ sư phần mềm hơn 3 năm kinh nghiệm làm backend với Java và Spring Framework. Có kinh nghiệm với PostgreSQL, MySQL, MongoDB, Redis, Apache Kafka, Docker, K8S và xây dựng hệ thống Microservices.",
    ogAlt: "Nguyễn Thành Kiên — Kỹ sư phần mềm, Hà Nội",
  },

  nav: {
    work: "Dự án",
    about: "Giới thiệu",
    experience: "Kinh nghiệm",
    writing: "Bài viết",
    contact: "Liên hệ",
    menu: "Mở menu",
    close: "Đóng menu",
    skipToContent: "Bỏ qua",
  },

  hero: {
    experienceSummary: "Kỹ sư backend · Java & Spring Framework",
    greeting: "Xin chào, tôi là",
    role: "Kỹ sư phần mềm",
    roles: [
      "Kỹ sư Backend",
      "Lập trình viên Java & Spring",
      "Xây dựng hệ Microservices",
      "Hướng tới Solution Architect",
    ],
    tagline:
      "Xây dựng các hệ thống Backend: Modular Monolith, Microservices Architecture, cùng tầng dữ liệu và messaging bên dưới, với 3+ năm kinh nghiệm làm domain viễn thông và SaaS doanh nghiệp.",
    location: "Hà Nội, Việt Nam",
    ctaWork: "Dự án tiêu biểu",
    ctaCv: "Tải CV",
  },

  work: {
    heading: "Dự án tiêu biểu",
    intro:
      "Ba hệ thống production, từ nền tảng quảng cáo toàn quốc tới sàn SaaS đa khách hàng.",
    roleLabel: "Vai trò",
    clientLabel: "Khách hàng",
    teamLabel: "Quy mô nhóm",
    stackLabel: "Công nghệ",
    highlightsLabel: "Tham gia thực hiện",
    periodLabel: "Thời gian",
    exploreLabel: "Xem chi tiết",
    backLabel: "Về danh sách dự án",
    nextLabel: "Dự án tiếp theo",
    previousLabel: "Dự án trước",
    items: {
      targetx: {
        name: "TargetX — Nền tảng quảng cáo số",
        badge: "Viễn thông · AdTech",
        role: "Kỹ sư Backend",
        summary:
          "Nền tảng quảng cáo phía cầu (DSP) cho doanh nghiệp đăng ký, xây dựng tệp khách hàng và chạy chiến dịch SMS, push notification trên hệ sinh thái Viettel. Advertiser Portal quản lý thương hiệu, chiến dịch, nội dung quảng cáo, tệp khách hàng và ví. Admin Portal duyệt nhà quảng cáo và chiến dịch, cấu hình chính sách giá, giám sát hiệu quả.",
        highlights: [
          "Xây dựng quản lý tài khoản nhà quảng cáo trên Admin Portal theo mô hình State Machine: duyệt, từ chối, tạm ngưng, kích hoạt lại và quản lý hợp đồng.",
          "Xây dựng quản lý chiến dịch trên Admin Portal: danh sách, chi tiết, duyệt, từ chối và tạm dừng.",
          "Xây dựng Advertiser Portal: đăng ký, đăng nhập, quản lý thương hiệu, chiến dịch và nội dung quảng cáo.",
          "Xây dựng quản lý tệp khách hàng và cấu hình giá quảng cáo.",
          "Thiết kế Cache hai lớp và ứng dụng Bitmap để lọc khoảng 80 triệu bản ghi thuê bao theo phân khúc.",
          "Tích hợp SMS Gateway (Viettel Brandname), dịch vụ consent và luồng phân phối quảng cáo. Sử dụng outbox pattern để xử lý bất đồng bộ, nhất quán cuối.",
          "Thiết kế lược đồ quan hệ CSDL, viết REST API, viết unit test và fix bugs.",
        ],
      },
      smePortal: {
        name: "SME Portal — Nền tảng thương mại điện tử cho doanh nghiệp vừa và nhỏ",
        badge: "SaaS đa khách hàng",
        role: "Kỹ sư Backend",
        summary:
          "Nền tảng SaaS đa khách hàng để doanh nghiệp vừa và nhỏ tìm, mua và quản lý dịch vụ số của TPComs: cloud, hosting, tên miền, email và CRM. Nền tảng bao trọn vòng đời dịch vụ: danh mục, đơn hàng, thuê bao, cấp phát, hợp đồng, tính cước, thanh toán, quản lý khách hàng và helpdesk. Admin Portal, SME Portal và ứng dụng di động là ba kênh phục vụ.",
        highlights: [
          "Thiết kế các microservice của nền tảng theo Domain-Driven Design.",
          "Thiết kế lược đồ cơ sở dữ liệu cho từng service.",
          "Xây dựng các microservice nghiệp vụ cốt lõi bằng Spring Boot.",
          "Xây dựng xác thực, phân quyền và cô lập đa khách hàng bằng Keycloak, phân quyền theo vai trò và quyền hạn.",
          "Xây dựng luồng danh mục dịch vụ, đơn hàng, thuê bao và cấp phát.",
          "Xây dựng tính cước, xuất hoá đơn và tích hợp cổng thanh toán cùng đối tác hoá đơn điện tử.",
          "Thiết kế REST API và luồng sự kiện Kafka giữa các service.",
          "Sửa lỗi và bảo trì các service.",
        ],
      },
      autoGrading: {
        name: "Hệ thống chấm trắc nghiệm tự động và tạo đề thi",
        badge: "Giáo dục · Thị giác máy tính",
        role: "Lập trình viên Backend",
        summary:
          "Hệ thống chấm phiếu trả lời trắc nghiệm bằng mô hình xử lý ảnh đã huấn luyện. Hệ thống cũng quản lý sinh viên, giảng viên, môn học, kỳ thi, bài nộp và kết quả.",
        highlights: [
          "Thiết kế lược đồ cơ sở dữ liệu.",
          "Xây dựng chức năng quản lý sinh viên, giảng viên, môn học, kỳ thi và kết quả.",
          "Thiết kế và xây dựng API cho các chức năng đó.",
          "Tích hợp luồng chấm tự động với module chấm bài thi.",
          "Bảo trì hệ thống, sửa lỗi và viết tài liệu.",
        ],
      },
    },
  },

  about: {
    heading: "Giới thiệu",
    portraitAlt: "Ảnh chân dung Nguyễn Thành Kiên",
    lead: [
      "Kỹ sư phần mềm hơn **3 năm** làm backend với **Java** và **Spring**. Tôi thiết kế và xây dựng **RESTful API** cùng **microservices**, làm việc với cơ sở dữ liệu quan hệ, **caching** và **hàng đợi tin nhắn**.",
      "Tôi đã làm dự án trong **thương mại điện tử**, **thanh toán**, **quản lý giáo dục** và **viễn thông**. Tôi tìm một môi trường chuyên nghiệp để thiết kế giải pháp hiệu quả cho hệ thống phức tạp.",
    ],
    statsHeading: "Vài con số",
    stats: {
      years: "Năm kinh nghiệm",
      projects: "Hệ thống production",
      technologies: "Công nghệ",
      toeic: "Điểm TOEIC",
    },
    goalsHeading: "Mục tiêu nghề nghiệp",
    goals: [
      "Tạo ra các phần mềm chất lượng cao, mang giá trị thực cho người dùng.",
      "Nhắm tới vị trí Solution Architect, thiết kế kiến trúc hiệu năng cao cho các hệ thống phức tạp.",
      "Phát triển thành kỹ sư senior với trách nhiệm lớn.",
    ],
    toolsHeading: "Tech Stack",
    groups: {
      languages: "Ngôn ngữ",
      backend: "Nền tảng backend",
      security: "Bảo mật",
      storage: "Lưu trữ & caching",
      distributed: "Hệ phân tán",
      infrastructure: "Hạ tầng",
      testing: "Kiểm thử & chất lượng",
      architecture: "Kiến trúc",
      agentic: "Agentic coding",
    },
    practiceHeading: "Cách làm việc",
    practice: [
      "Trao đổi và phối hợp tốt với đồng đội, BA và QA.",
      "Phân tích yêu cầu, tự chia nhỏ và ước lượng công việc.",
      "Năng động, chủ động và chuyên nghiệp.",
    ],
    languagesHeading: "Ngoại ngữ",
    certifications: {
      toeic: "TOEIC",
      vstep: "VSTEP",
    },
    languagesNote: "Đọc hiểu, viết tài liệu kỹ thuật chuyên ngành.",
  },

  experience: {
    heading: "Kinh nghiệm",
    present: "Hiện tại",
    items: {
      viettel: {
        title: "Kỹ sư phần mềm",
        bullets: [
          "Phát triển và bảo trì service backend bằng Java và Spring Framework.",
          "Tham gia trọn chu trình: phân tích yêu cầu, lập trình, review code và triển khai.",
          "Cùng nhóm tích hợp hệ thống và cải thiện hiệu năng cho service production.",
        ],
      },
      samsungSds: {
        title: "Kỹ sư phần mềm",
        bullets: [
          "Phát triển và bảo trì tính năng phần mềm bằng Java và các công nghệ backend liên quan.",
          "Cùng nhóm phân tích yêu cầu, lập trình, kiểm thử và sửa lỗi.",
          "Tuân thủ chuẩn code và quy trình review code của công ty.",
        ],
      },
      samsungRnd: {
        title: "Thực tập sinh mùa hè",
        bullets: [
          "Tham gia các hoạt động và khoá đào tạo của công ty.",
          "Học cấu trúc dữ liệu, giải thuật và giải quyết bài toán bằng Java.",
          "Thiết kế và xây dựng ứng dụng chỉnh sửa ảnh trên Android.",
        ],
      },
    },
    research: {
      role: "Sinh viên nghiên cứu",
      bullets: [
        "Thành viên phòng nghiên cứu MPEC tại HUST. Hướng nghiên cứu là phát triển phần mềm backend.",
        "Ứng dụng AI và thị giác máy tính vào các dự án của phòng thí nghiệm.",
      ],
      mentorLabel: "Hướng dẫn bởi",
    },
    education: {
      role: "Kỹ sư",
      detail: "Kỹ thuật Điện tử — Viễn thông · Kỹ thuật Máy tính",
      cpaLabel: "CPA",
    },
  },

  writing: {
    heading: "Bài viết",
    intro:
      "Những bài phân tích sâu về kiến trúc backend, JVM và cơ sở dữ liệu bên dưới — đăng trên newsletter của tôi.",
    viewAll: "Tất cả bài viết",
    opensOnSubstack: "(mở trên Substack)",
  },

  contact: {
    heading: "Liên hệ",
    prompt: "Bạn có bài toán backend cần giải?",
    lead: "Tôi sẵn sàng cho vị trí kỹ sư backend và bài toán thiết kế hệ thống. Email là cách nhanh nhất để liên hệ.",
    emailLabel: "Email",
    phoneLabel: "Điện thoại",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    copyLabel: "Sao chép địa chỉ email",
    copiedLabel: "Đã sao chép địa chỉ email",
    form: {
      name: "Tên của bạn",
      namePlaceholder: "Nguyễn Văn A",
      email: "Email của bạn",
      emailPlaceholder: "ban@congty.com",
      message: "Nội dung",
      messagePlaceholder: "Bạn muốn trao đổi về điều gì?",
      submit: "Gửi tin nhắn",
      submitting: "Đang gửi…",
      required: "bắt buộc",
    },
    status: {
      success: "Tin nhắn đã gửi. Tôi sẽ phản hồi sớm.",
      error: "Tin nhắn không gửi được. Bạn hãy email trực tiếp cho tôi.",
      unconfigured: "Form liên hệ chưa được cấu hình trên bản triển khai này.",
      unconfiguredAction: "Email trực tiếp cho tôi",
      invalidName: "Nhập tên của bạn.",
      invalidEmail: "Nhập địa chỉ email hợp lệ.",
      invalidMessage: "Nhập nội dung tin nhắn.",
      messageTooLong: "Nội dung quá dài (tối đa 2000 ký tự).",
    },
  },

  theme: {
    label: "Giao diện",
    toLight: "Chuyển sang giao diện sáng",
    toDark: "Chuyển sang giao diện tối",
  },

  language: {
    label: "Ngôn ngữ",
    en: "English",
    vi: "Tiếng Việt",
  },

  footer: {
    rights: "Bảo lưu mọi quyền.",
    builtWith: "Xây dựng bằng Next.js và Tailwind CSS.",
  },

  notFound: {
    heading: "Không tìm thấy trang",
    body: "Trang này không tồn tại hoặc đã chuyển đi.",
    back: "Về trang chủ",
  },

  backToTop: "Lên đầu trang",
} satisfies Dictionary;

export default vi;
