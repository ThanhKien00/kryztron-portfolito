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
  /** Newsletter the Writing section pulls its posts from. */
  substack: "https://kryztron.substack.com",
  substackFeed: "https://kryztron.substack.com/feed",
} as const;

/**
 * The four figures in the stats row under the About prose. Deliberately
 * computed from this file rather than fetched from the GitHub API: these are
 * CV facts that change once a year, and a network call would make the whole
 * page dynamic for no benefit.
 *
 * `label` comes from `dict.about.stats[key]`; only the value lives here.
 */
export const stats = [
  { key: "years", value: "3+", icon: "calendar" },
  { key: "projects", value: "3", icon: "layers" },
  { key: "technologies", value: "30", icon: "code" },
  { key: "toeic", value: "800", icon: "award" },
] as const;

export type StatKey = (typeof stats)[number]["key"];
export type StatIcon = (typeof stats)[number]["icon"];

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

/**
 * `monogram` stands in for the company logo tile beside each timeline entry —
 * no logo files are bundled, and a two-letter mark in the page's own type is
 * more consistent than three foreign brand marks would be.
 *
 * `stack` is locale-invariant (product names), so it lives here rather than in
 * the dictionaries.
 */
export const jobs = [
  {
    key: "viettel",
    company: "Viettel Software",
    monogram: "VT",
    from: "2025-09",
    to: null,
    stack: [
      "Java 21",
      "Spring Boot 3",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "ClickHouse",
      "Modular Monolith",
    ],
  },
  {
    key: "samsungSds",
    company: "Samsung SDS",
    monogram: "SD",
    from: "2024-07",
    to: "2025-08",
    stack: [
      "Spring Boot",
      "Keycloak",
      "Kafka",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "Microservices",
      "DDD",
    ],
  },
  {
    key: "samsungRnd",
    company: "Samsung R&D Center Vietnam",
    monogram: "SR",
    from: "2023-07",
    to: "2023-08",
    stack: ["Android", "Java", "Image Processing"],
  },
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
 * Every skill label, flattened in group order. The tech grid renders this
 * directly — one chip per entry, brand mark resolved by `TechIcon`.
 */
export const allSkills = skillGroups.flatMap((group) => group.items);

export const certifications = [
  { key: "toeic", score: "800" },
  { key: "vstep", score: "B2" },
] as const;

export type CertificationKey = (typeof certifications)[number]["key"];
