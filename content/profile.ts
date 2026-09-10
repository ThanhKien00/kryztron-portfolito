/**
 * Locale-invariant CV data: names, dates, links, technology names.
 * Anything that reads as prose lives in `en.ts` / `vi.ts` instead, keyed by the
 * same literal keys used here so the two never drift apart.
 */

export const profile = {
  name: "Nguyễn Thành Kiên",
  /** Unaccented form for `<title>`, OG image and email headers. */
  nameLatin: "Nguyen Thanh Kien",
  initials: "NTK",
  email: "kien.nt112002@gmail.com",
  phone: "+84 868 409 106",
  phoneHref: "+84868409106",
  github: "https://github.com/ThanhKien00",
  githubHandle: "ThanhKien00",
  linkedin: "https://linkedin.com/in/thanh-kien/",
  linkedinHandle: "thanh-kien",
  cv: "/NguyenThanhKien_CV.pdf",
  /** Portrait in `public/`. Intrinsic size 787×1181; the About section crops
   *  it to 4:5 from the top so the head keeps its position at every width. */
  avatar: "/nguyenthanhkien_avatar.jpeg",
  avatarWidth: 787,
  avatarHeight: 1181,
  yearsOfExperience: 3,
  /** Headline technologies, rendered under the hero. */
  headlineStack: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Kubernetes"],
} as const;

export const education = {
  school: "Hanoi University of Science and Technology",
  schoolShort: "HUST",
  from: "2020",
  to: "2024",
  cpa: "2.8/4.0",
  /** CPA is kept out of the public page by default; flip to `true` to show it. */
  showCpa: false,
} as const;

export const activity = {
  lab: "MPEC Laboratory, HUST",
  mentor: "Phạm Doãn Tĩnh",
  from: "2022-10",
  to: "2024-07",
} as const;

export const jobs = [
  { key: "viettel", company: "Viettel Software", from: "2025-09", to: null },
  { key: "samsungSds", company: "Samsung SDS", from: "2024-07", to: "2025-08" },
  { key: "samsungRnd", company: "Samsung R&D Center Vietnam", from: "2023-07", to: "2023-08" },
] as const;

export type JobKey = (typeof jobs)[number]["key"];

export const projects = [
  {
    key: "targetx",
    client: "Viettel Telecom",
    team: "~10",
    stack: [
      "Spring Boot 3 (Java 21)",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "ClickHouse",
      "MinIO",
      "ReactJS",
    ],
  },
  {
    key: "smePortal",
    client: "TPComs",
    team: "~30",
    stack: [
      "Spring Boot",
      "Keycloak",
      "Kafka",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "GitLab CI/CD",
    ],
  },
  {
    key: "autoGrading",
    client: "HUST — MPEC Laboratory",
    team: "6",
    stack: [
      "Spring Boot (Java 17)",
      "Python + YOLOv8",
      "Redis",
      "PostgreSQL",
      "ReactJS",
      "Android",
    ],
  },
] as const;

export type ProjectKey = (typeof projects)[number]["key"];

export const skillGroups = [
  { key: "languages", items: ["Java (21 / 25)", "SQL"] },
  {
    key: "backend",
    items: [
      "Spring Boot 3 / 4",
      "Spring Data JPA",
      "Spring Security",
      "Spring Cloud",
      "Spring WebFlux",
      "RESTful API",
    ],
  },
  { key: "security", items: ["OAuth 2.0", "OpenID Connect", "Keycloak"] },
  { key: "storage", items: ["PostgreSQL", "MySQL", "Redis"] },
  { key: "distributed", items: ["Apache Kafka", "RabbitMQ"] },
  {
    key: "infrastructure",
    items: ["Docker", "Kubernetes", "Git", "GitLab CI", "Jenkins"],
  },
  { key: "testing", items: ["JUnit", "Mockito", "SonarQube"] },
  {
    key: "architecture",
    items: ["Monolith", "Microservices", "Three-Layer Architecture"],
  },
  { key: "agentic", items: ["Claude Code", "Antigravity", "GitHub Copilot"] },
] as const;

export type SkillGroupKey = (typeof skillGroups)[number]["key"];

/**
 * The five technologies shown as large logo tiles above the skill groups.
 * `group` doubles as the tile caption: it reuses the already-translated group
 * label, so the row needs no new copy in `en.ts` / `vi.ts`.
 */
export const coreStack = [
  { icon: "openjdk", name: "Java 21 / 25", group: "languages" },
  { icon: "springboot", name: "Spring Boot", group: "backend" },
  { icon: "apachekafka", name: "Apache Kafka", group: "distributed" },
  { icon: "postgresql", name: "PostgreSQL", group: "storage" },
  { icon: "kubernetes", name: "Kubernetes", group: "infrastructure" },
] as const satisfies readonly {
  icon: string;
  name: string;
  group: SkillGroupKey;
}[];

export const certifications = [
  { key: "toeic", score: "800" },
  { key: "vstep", score: "B2" },
] as const;

export type CertificationKey = (typeof certifications)[number]["key"];
