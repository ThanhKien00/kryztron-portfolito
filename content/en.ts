import type { Dictionary } from "./types";

const en = {
  meta: {
    title: "Nguyen Thanh Kien — Software Engineer",
    description:
      "Software Engineer with more than 3 years of Java and Spring backend work. RESTful APIs, microservices, relational databases, caching and message queues.",
    ogAlt: "Nguyen Thanh Kien — Java & Spring backend engineer, Hanoi",
  },

  nav: {
    work: "Work",
    about: "About",
    experience: "Experience",
    writing: "Writing",
    contact: "Contact",
    menu: "Open menu",
    close: "Close menu",
    skipToContent: "Skip to content",
  },

  hero: {
    experienceSummary: "Backend engineer · Java & Spring",
    greeting: "Hi, I'm",
    role: "Software Engineer",
    roles: [
      "Backend Engineer",
      "Java & Spring Developer",
      "Microservices Builder",
      "Future Solution Architect",
    ],
    tagline:
      "I build backend systems: RESTful APIs, microservices, and the data and messaging layers under them. Three years in telecom and enterprise SaaS.",
    location: "Hanoi, Vietnam",
    ctaWork: "Selected work",
    ctaCv: "Download CV",
  },

  work: {
    heading: "Selected work",
    intro:
      "Three production systems, from a nationwide advertising platform to a multi-tenant SaaS marketplace.",
    roleLabel: "Role",
    clientLabel: "Client",
    teamLabel: "Team size",
    stackLabel: "Stack",
    highlightsLabel: "What I built",
    periodLabel: "Period",
    exploreLabel: "Explore",
    backLabel: "Back to selected work",
    nextLabel: "Next project",
    previousLabel: "Previous project",
    items: {
      targetx: {
        name: "TargetX — Digital Advertising Platform",
        badge: "Telecom · AdTech",
        role: "Backend Engineer",
        summary:
          "A demand-side platform (DSP) where enterprises register, build customer segments and run SMS and push-notification campaigns across the Viettel ecosystem. The Advertiser Portal manages brands, campaigns, ad content, segments and wallets. The Admin Portal approves advertisers and campaigns, sets pricing policies and tracks performance.",
        highlights: [
          "Built advertiser account management on the Admin Portal as a state machine: approval, rejection, suspension, reactivation and contracts.",
          "Built campaign management on the Admin Portal: list, detail, approval, rejection and pause flows.",
          "Built the Advertiser Portal: registration, login, brand, campaign and ad content management.",
          "Built customer segment management and ad pricing configuration.",
          "Designed a two-layer cache and used bitmaps to filter about 80 million subscriber records by segment.",
          "Integrated the SMS gateway, the consent service and the ad delivery flow. Used the Kafka outbox pattern for asynchronous, eventually consistent processing.",
          "Designed database schemas and REST APIs, wrote unit tests and fixed bugs.",
        ],
      },
      smePortal: {
        name: "SME Portal — E-commerce Platform for SMEs",
        badge: "Multi-tenant SaaS",
        role: "Backend Engineer",
        summary:
          "A multi-tenant SaaS platform where small and medium enterprises search, buy and manage the digital services of TPComs: cloud, hosting, domain, email and CRM. It covers the full service lifecycle: catalog, order, subscription, provisioning, contract, billing, payment, customer management and helpdesk. An Admin Portal, an SME Portal and a mobile application deliver it.",
        highlights: [
          "Designed the microservices of the platform with Domain-Driven Design.",
          "Designed the database schema for each service.",
          "Built the core business microservices with Spring Boot.",
          "Built authentication, authorization and tenant isolation with Keycloak and access control by role and permission.",
          "Built the service catalog, order, subscription and provisioning flows.",
          "Built billing and invoicing, and integrated the payment gateway and e-invoice partners.",
          "Designed REST APIs and Kafka event flows between services.",
          "Fixed bugs and maintained the services.",
        ],
      },
      autoGrading: {
        name: "Automatic Multiple-Choice Grading & Test Creation System",
        badge: "EdTech · Computer Vision",
        role: "Backend Developer",
        summary:
          "A system that grades multiple-choice answer sheets with a trained image-processing model. It also manages students, teachers, subjects, exams, submissions and results.",
        highlights: [
          "Designed the database schema.",
          "Built the management features for students, teachers, subjects, exams and results.",
          "Designed and built the APIs for those features.",
          "Connected the automatic grading flow to the exam grading module.",
          "Maintained the system, fixed bugs and wrote the documentation.",
        ],
      },
    },
  },

  about: {
    heading: "About",
    portraitAlt: "Portrait of Nguyen Thanh Kien",
    lead: [
      "Software Engineer with more than **3 years** of **Java** and **Spring** backend work. I design and build **RESTful APIs** and **microservices**, and I work with relational databases, **caching** and **message queues**.",
      "I delivered projects in **e-commerce**, **payment**, **education management** and **telecommunications**. I now look for a professional team where I can design efficient solutions for complex systems.",
    ],
    statsHeading: "By the numbers",
    stats: {
      years: "Years of experience",
      projects: "Production systems",
      technologies: "Technologies",
      toeic: "TOEIC score",
    },
    goalsHeading: "Career goals",
    goals: [
      "Deliver high-quality software that brings real value to users.",
      "Become a Solution Architect who designs efficient architecture for complex software.",
      "Grow into a senior engineer with greater responsibility.",
    ],
    toolsHeading: "Tech I use",
    groups: {
      languages: "Languages",
      backend: "Backend stack",
      security: "Security",
      storage: "Storage & caching",
      distributed: "Distributed systems",
      infrastructure: "Infrastructure",
      testing: "Testing & quality",
      architecture: "Architecture",
      agentic: "Agentic coding",
    },
    practiceHeading: "Working style",
    practice: [
      "Communicate and work well with the team, BA and QA.",
      "Analyze requirements, split and estimate tasks alone.",
      "Energetic, proactive and professional.",
    ],
    languagesHeading: "Languages",
    certifications: {
      toeic: "TOEIC",
      vstep: "VSTEP (Level 4/6, Vietnamese Framework)",
    },
    languagesNote: "I read and understand technical documentation.",
  },

  experience: {
    heading: "Experience",
    present: "Present",
    items: {
      viettel: {
        title: "Software Engineer",
        bullets: [
          "Build and maintain backend services with Java and the Spring Framework.",
          "Take part in the full cycle: requirement analysis, coding, code review and deployment.",
          "Work with the team on system integration and performance for production services.",
        ],
      },
      samsungSds: {
        title: "Software Engineer",
        bullets: [
          "Built and maintained software features with Java and related backend technologies.",
          "Worked with the team on requirement analysis, coding, testing and bug fixing.",
          "Followed the coding standards and the code review process of the company.",
        ],
      },
      samsungRnd: {
        title: "Summer Intern",
        bullets: [
          "Took part in company training and activities.",
          "Studied data structures, algorithms and problem solving in Java.",
          "Designed and built an image editing application for Android.",
        ],
      },
    },
    research: {
      role: "Research Student",
      bullets: [
        "Member of the MPEC Research Laboratory at HUST. My field was backend software development.",
        "Applied AI and computer vision to laboratory projects.",
      ],
      mentorLabel: "Supervised by",
    },
    education: {
      role: "Bachelor of Engineering",
      detail: "Electronic & Telecommunication Engineering · Computer Engineering",
      cpaLabel: "CPA",
    },
  },

  writing: {
    heading: "Writing",
    intro:
      "Deep dives into backend architecture, the JVM and the databases underneath — published on my newsletter.",
    viewAll: "All posts",
    opensOnSubstack: "(opens on Substack)",
  },

  contact: {
    heading: "Contact",
    prompt: "Have a backend problem worth solving?",
    lead: "Open to backend roles and system design problems. Email is the fastest way to reach me.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    copyLabel: "Copy email address",
    copiedLabel: "Email address copied",
    form: {
      name: "Your name",
      namePlaceholder: "Jane Doe",
      email: "Your email",
      emailPlaceholder: "jane@company.com",
      message: "Message",
      messagePlaceholder: "What would you like to talk about?",
      submit: "Send message",
      submitting: "Sending…",
      required: "required",
    },
    status: {
      success: "Your message was sent. I will reply soon.",
      error: "The message did not send. Please email me directly.",
      unconfigured: "The contact form is not configured on this deployment.",
      unconfiguredAction: "Email me directly",
      invalidName: "Enter your name.",
      invalidEmail: "Enter a valid email address.",
      invalidMessage: "Enter a message.",
      messageTooLong: "The message is too long (2000 characters maximum).",
    },
  },

  theme: {
    label: "Theme",
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
  },

  language: {
    label: "Language",
    en: "English",
    vi: "Tiếng Việt",
  },

  footer: {
    rights: "All rights reserved.",
    builtWith: "Built with Next.js and Tailwind CSS.",
  },

  notFound: {
    heading: "Page not found",
    body: "This page does not exist, or it moved.",
    back: "Back to home",
  },

  backToTop: "Back to top",
} satisfies Dictionary;

export default en;
