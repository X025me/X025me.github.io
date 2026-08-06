/**
 * Portfolio content — edit this file to update the site.
 *
 * CERTIFICATIONS / EDUCATION: each item:
 *   title, issuer, date, location, summary (optional)
 *   credentialUrl | link — verify URL (optional)
 *   featured — true to show as hero banner (certs)
 *   accent — cloud | security | ai | frontend | education (card color)
 *   icon — Font Awesome icon suffix; iconPrefix — "fas" | "fab" (optional)
 *
 * SOCIAL:
 *   linkedin — public profile URL
 *   telegramUsername — @handle without @ (or with @)
 *   githubUsername — powers Projects GitHub activity + profile links
 *
 * JOURNEY: interactive About story chapters — id, year, era, title, role, org,
 *   narrative, highlights[], tags[], skills[] (names matching `skills` for highlight),
 *   icon (Font Awesome suffix e.g. "fa-rocket")
 *
 * SKILLS: string[] shown in About; names listed in a chapter's skills[] light up when that chapter is active
 * CLOUD_ARCHITECT_SKILLS: subset always styled as cloud-architect highlights (e.g. AWS, GCP, Kubernetes)
 *
 * PROJECTS: append objects to `projects`. Each item:
 *   title       — required
 *   summary     — short card blurb (optional)
 *   details     — longer case-study copy shown in the expand modal (optional)
 *   highlights  — string[] bullet points in the modal (optional)
 *   tags        — string array e.g. ["TypeScript", "React"] (optional)
 *   meta        — e.g. "Addis Ababa · 2023–present" (optional)
 *   link        — live site URL (optional)
 *   linkLabel   — link button text (optional; defaults to hostname)
 *   github      — repo or profile URL (optional)
 *   image       — cover image URL/path (optional)
 *   images      — gallery image URL/path array for the modal (optional)
 *   embedUrl    — live site iframe preview in the modal (optional)
 *   video       — YouTube/Vimeo URL, or path to .mp4/.webm (optional)
 *
 * Example video values:
 *   "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 *   "https://youtu.be/dQw4w9WgXcQ"
 *   "./assets/videos/demo.mp4"
 */
window.PORTFOLIO_DATA = {
  social: {
    linkedin: "https://www.linkedin.com/in/xo25me",
    telegramUsername: "@suduer",
    githubUsername: "X025me",
  },

  /**
   * Interactive About story — each chapter:
   *   id, year, era (short label on the rail), title, role, org,
   *   narrative (main story paragraph), highlights (string[]), tags (string[]), icon (Font Awesome class)
   */
  journey: [
    {
      id: "foundations",
      year: "2017",
      era: "Start",
      title: "Engineering foundations",
      role: "BSc, Electrical & Computer Engineering",
      org: "Haramaya University",
      icon: "fa-graduation-cap",
      narrative:
        "I began as an Electrical and Computer Engineering graduate from Haramaya University — grounded in computing, electronics, signal processing, and systems thinking. That hardware-meets-software lens still shapes how I design reliable backends and infrastructure.",
      highlights: [
        "Computing, OOP, databases, and applied mathematics",
        "SCADA, DSP, electronics, and systems coursework",
        "Built the discipline to ship under real constraints",
      ],
      tags: ["ECE", "Systems", "Harar"],
      skills: ["Python", "SQL", "Linux", "HTML / CSS"],
    },
    {
      id: "cybint",
      year: "2018",
      era: "Security",
      title: "Cyber Security Analyst",
      role: "Certificate — Cyber Security Analyst",
      org: "Ariel University & Cybint Solutions",
      icon: "fa-user-secret",
      narrative:
        "I trained as a Cyber Security Analyst in Israel — malware analysis, pentesting, network forensics, incident response, crypto analysis, and exploit development. That security-first mindset became the spine of everything I built next.",
      highlights: [
        "Malware analysis, pentesting, and network forensics",
        "Signal & protocol analysis, assembly, exploit development",
        "Attended CyberWeek 2018 at Tel Aviv University",
      ],
      tags: ["Malware", "Pentesting", "Forensics"],
      skills: ["Python", "Linux", "SQL"],
    },
    {
      id: "insa",
      year: "2018–2021",
      era: "INSA",
      title: "From reverse engineering to intelligence systems",
      role: "Full Stack Developer",
      org: "Information Network and Security Agency",
      icon: "fa-shield-halved",
      narrative:
        "At INSA I spent three years on malware analysis and ethical hacking. From the second year I also owned full-stack backend work on intelligence-gathering software — pattern recognition and profiling. Later I designed and delivered a signal analysis and storage system in Flask and PostgreSQL within a year, alongside work automation, web penetration testing, and DevOps.",
      highlights: [
        "3 years malware analysis & ethical hacking",
        "Intelligence gathering: pattern recognition & profiling",
        "Signal analysis & storage — Flask + PostgreSQL, delivered in ~1 year",
        "Automation with Emscripten, Flask, C#, C++; Docker & VMware",
      ],
      tags: ["Flask", "PostgreSQL", "DevOps", "Reversing"],
      skills: ["Flask", "Python", "PostgreSQL", "SQL", "Docker", "Linux", "DevOps"],
    },
    {
      id: "nebe",
      year: "2021–2023",
      era: "NEBE",
      title: "Election systems & server-room DevOps",
      role: "Full Stack Developer, System Admin & DevOps",
      org: "National Electoral Board of Ethiopia",
      icon: "fa-server",
      narrative:
        "At NEBE I managed a physical server room, DevOps, and system automation while completing about three full-stack systems that supported the 2021 Ethiopian election — including result announcement, HRM, asset management, and voter registration. Stack spanned Django, Node.js, MSSQL, React, and deployment scripting under tight national timelines.",
      highlights: [
        "~3 full-stack systems for the 2021 Ethiopian election",
        "Physical server room management, DevOps & automation",
        "Django / Node.js backends · React frontends · MSSQL",
      ],
      tags: ["Django", "React", "DevOps", "Elections"],
      skills: ["Django", "Node.js", "React", "SQL", "PostgreSQL", "Redis", "Docker", "Linux", "DevOps", "Python"],
    },
    {
      id: "senior",
      year: "2023–now",
      era: "Senior",
      title: "Leading product on the cloud",
      role: "Senior Full Stack Developer",
      org: "Qene Games · kinet.store & more",
      icon: "fa-rocket",
      narrative:
        "I joined a startup team as a senior developer — mentoring two interns, shipping kinet.store and related systems on Google Cloud, and managing a local server integrated with Ethio Telecom’s subscription system. I generate operational reports, write security reviews for products like beemi.app and kinet.store, and build with Cloud Functions. Certified cloud architect energy meets day-to-day delivery: engagement up, bugs down, timelines ahead.",
      highlights: [
        "kinet.store & GCP platforms; Cloud Functions",
        "Mentored 2 interns while owning delivery",
        "Ethio Telecom subscription integration & reporting",
        "Security reviews — beemi.app, kinet.store",
        "+30% engagement · −25% bug issues · +20% data throughput",
      ],
      tags: ["GCP", "TypeScript", "Mentoring", "Security"],
      skills: [
        "TypeScript",
        "JavaScript",
        "React",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "Redis",
        "Prometheus",
        "Grafana",
        "GCP",
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "DevOps",
      ],
    },
  ],

  skills: [
    "AWS",
    "GCP",
    "Kubernetes",
    "Azure",
    "Docker",
    "PostgreSQL",
    "Redis",
    "Prometheus",
    "Grafana",
    "Python",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "React",
    "Next.js",
    "Django",
    "Flask",
    "HTML / CSS",
    "Linux",
    "SQL",
    "DevOps",
  ],

  /** Always emphasized in About as cloud-architect credentials */
  cloudArchitectSkills: ["AWS", "GCP", "Kubernetes"],

  certifications: [
    {
      title: "Professional Cloud Architect",
      issuer: "Google Cloud",
      date: "July 2026",
      link: "https://",
      location: "Remote",
      featured: true,
      accent: "cloud",
      icon: "fa-cloud",
      summary:
        "Architect and manage production cloud solutions on GCP — design, security, reliability, and operational excellence.",
    },
    {
      title: "Cyber Security Analyst",
      issuer: "Ariel University & Cybint Solutions",
      date: "Oct 2018",
      location: "Ari'el, Israel",
      accent: "security",
      icon: "fa-shield-halved",
      summary:
        "Pentesting, malware analysis, network forensics, incident response, crypto analysis, and secure systems thinking.",
    },
    {
      title: "GitHub Copilot",
      issuer: "Microsoft",
      date: "Oct 2018",
      link: "https://learn.microsoft.com/en-us/users/exodustesfayegebre-5314/credentials/5201f1b6be2fce09?ref=https%3A%2F%2Fwww.linkedin.com%2F",
      location: "Remote",
      accent: "ai",
      icon: "fa-robot",
      summary:
        "AI-assisted development — pairing with Copilot for faster, higher-quality delivery across the stack.",
    },
    {
      title: "Andela React Learning Program",
      issuer: "Andela",
      date: "Oct 2018",
      link: "https://credsverse.com/credentials/4ea80678-b6df-45c1-b476-8b58713755e5",
      location: "Remote",
      accent: "frontend",
      icon: "fa-react",
      iconPrefix: "fab",
      summary:
        "12-week React program — component architecture, state, and building production-ready web apps.",
    },
  ],

  education: [
    {
      title: "BSc, Electrical and Computer Engineering",
      issuer: "Haramaya University",
      date: "Jun 2017",
      location: "Harar, Ethiopia",
      accent: "education",
      icon: "fa-graduation-cap",
      summary:
        "Computing, OOP, databases, applied mathematics, SCADA, DSP, electronics, and systems engineering — the foundation for everything that followed.",
    },
  ],

  projects: [
    {
      title: "Qene Games — Gaming Platform",
      summary:
        "Senior full stack work on the live store and platform at kinet.store: mentoring, automated testing, performance tuning, and feature delivery with JavaScript and TypeScript.",
      details:
        "At Qene Games I own end-to-end delivery on kinet.store and related cloud systems — TypeScript features, performance work, Cloud Functions on GCP, Ethio Telecom subscription integration, mentoring two interns, and security reviews across products like beemi.app.",
      highlights: [
        "+30% user engagement in the first quarter",
        "Automated testing cut bug-related issues by ~25%",
        "Backend throughput improved ~20%",
        "GCP + Cloud Functions; local server ↔ Ethio Telecom",
        "Security reviews for kinet.store and beemi.app",
      ],
      tags: ["TypeScript", "GCP", "Web & Mobile"],
      meta: "Addis Ababa · 2023–present",
      link: "https://kinet.store",
      linkLabel: "kinet.store",
      github: "https://github.com/X025me",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
      images: [
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
      ],
      embedUrl: "https://kinet.store",
      // video: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
      // or: video: "./assets/videos/kinet-demo.mp4",
    },
    {
      title: "NEBE — Electoral Systems",
      summary:
        "Full stack delivery including result announcement, HRM, asset management, and voter registration — Django, Node.js, MSSQL, React, and deployment scripting.",
      details:
        "For the National Electoral Board of Ethiopia I helped ship systems that supported the 2021 election under national timelines — while also managing a physical server room, DevOps, and automation. Stack spanned Django, Node.js, MSSQL, React, and deployment scripting.",
      highlights: [
        "Result announcement, HRM, asset management, voter registration",
        "Physical server room + DevOps & system automation",
        "Django / Node.js backends with React frontends",
        "Delivered under election-day operational pressure",
      ],
      tags: ["Django", "React", "DevOps"],
      meta: "Remote · 2021–2023",
      github: "https://github.com/X025me",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
      images: [
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      title: "Visit Oromia",
      summary:
        "Web and mobile stack with prediction and recommendation APIs, chatbot, and reporting — Django REST, TensorFlow, Docker, React, and React Native.",
      details:
        "Built a tourism platform for the Oromia Tourism Commission covering web and mobile clients, custom prediction and recommendation ML APIs, an AI chatbot, and data visualization / reporting modules — Django REST, TensorFlow, Docker, React, and React Native.",
      highlights: [
        "Prediction & recommendation ML APIs",
        "AI chatbot + reporting / visualization modules",
        "React web + React Native mobile clients",
        "Django REST, TensorFlow, OAuth2, Nginx, Docker",
      ],
      tags: ["Django", "React Native", "ML"],
      meta: "Addis Ababa · 2019–2020",
      link: "https://visitoromia.org",
      linkLabel: "visitoromia.org",
      github: "https://github.com/X025me",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
      images: [
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
      ],
      embedUrl: "https://visitoromia.org",
    },
  ],
};
