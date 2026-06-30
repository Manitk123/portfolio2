// ============================================================
// Portfolio Data — All content extracted from Manit Kumar's resume
// Update this file to change any portfolio content
// ============================================================

export const personalInfo = {
  name: "Manit Kumar",
  firstName: "Manit",
  lastName: "Kumar",
  title: "Software Developer",
  tagline: "CRAFTING DIGITAL EXPERIENCES",
  location: "Greater Noida, UP 201310",
  phone: "+91 8532974189",
  email: "manit.bsr1@gmail.com",
  linkedin: "https://www.linkedin.com/in/manit-kumar-06b907288",
  github: "https://github.com/Manitk123",
  leetcode: "https://leetcode.com/u/Chicha_Badmaash/",
};

export const summary =
  "Results-driven Aspiring Software Developer with a solid foundation in Computer Science, software design, and full-stack development. Proficient in architecting scalable web applications using React, Next.js, Node.js, and Firebase. Well-versed in leveraging advanced Data Structures and Algorithms to solve complex software engineering challenges, backed by a proven track record of solving 250+ LeetCode problems. Passionate about designing secure, efficient, and user-centric software solutions that bridge modern frontend applications with robust backend infrastructure and Generative AI integrations.";

export const education = {
  degree: "Bachelor of Technology in Computer Science",
  institution: "Bennett University",
  specialization: "Cyber Security",
  location: "Greater Noida, UP",
  expected: "2027",
  gpa: "7.5 / 10.0",
};

export const skills = [
  {
    category: "Languages",
    icon: "code",
    items: ["C++", "Python", "Bash", "JavaScript", "HTML", "CSS", "SQL"],
  },
  {
    category: "Frameworks",
    icon: "layers",
    items: [
      "React",
      "Next.js",
      "FastAPI",
      "Node.js",
      "Express.js",
      "Frida",
      "PyTorch",
      "SQLAlchemy",
      "REST APIs",
    ],
  },
  {
    category: "AI / ML",
    icon: "brain",
    items: ["LLMs", "Generative AI", "Ollama", "Qwen", "DeepSeek"],
  },
  {
    category: "Databases",
    icon: "database",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Firebase"],
  },
  {
    category: "Dev Tools",
    icon: "terminal",
    items: ["Docker", "Celery", "Redis", "Git", "GitHub", "Postman", "Linux"],
  },
  {
    category: "Core",
    icon: "shield",
    items: [
      "Malware Analysis",
      "Reverse Engineering",
      "DSA",
      "OOP",
      "Secure Coding",
    ],
  },
];

export const experience = [
  {
    role: "UI/UX Design Intern",
    company: "Syinq",
    period: "Jan 2026 — Apr 2026",
    bullets: [
      "Collaborated with cross-functional teams to define the core information architecture for the Syinq carpooling platform.",
      "Engineered the logical data flows for a multi-step ID verification system integrating Government and University credentials.",
      "Optimized application user flows for \"Find\" and \"Offer\" marketplace features, significantly reducing user friction.",
      "Designed high-fidelity prototypes to guide development of modular, reusable frontend components.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Unified Mentor Pvt. Ltd.",
    period: "Apr 2025 — Jul 2025",
    bullets: [
      "Developed \"Collezise,\" a full-stack web application streamlining college guidance for students using React.",
      "Implemented complex institutional data retrieval algorithms and personalized list generation logic.",
      "Architected robust backend API endpoints using Node.js and integrated Firebase for real-time data synchronization.",
    ],
  },
];

export const projects = [
  {
    title: "Detonate Bot",
    subtitle: "Automated Malware Sandbox SaaS",
    tech: ["FastAPI", "Next.js", "Docker", "Frida", "Celery", "PostgreSQL"],
    description:
      "Full-stack automated sandbox pipeline processing real-time file payloads across WhatsApp, Slack, and Telegram bots. Features Frida dynamic instrumentation and distributed Celery queue for async task processing.",
    link: "https://github.com/Manitk123/detonatebot",
    featured: true,
  },
  {
    title: "Transformer-Based HIDS",
    subtitle: "Research Paper",
    tech: ["Python", "Deep Learning", "PyTorch", "Linux"],
    description:
      "Host-Based Intrusion Detection System using a custom Transformer architecture to detect system-level anomalies. Performance benchmarked against traditional LSTM models.",
    link: "https://github.com/Manitk123/Transformer-HIDS-Research",
    featured: true,
  },
  {
    title: "Malware Behaviour Analysis",
    subtitle: "Security Research",
    tech: ["Linux", "Cuckoo Sandbox", "Python"],
    description:
      "Automated malware analysis system using Cuckoo Sandbox to safely isolate and monitor threats. Evaluates malicious behavior by parsing API calls, network traffic, and filesystem modifications.",
    link: "#",
    featured: false,
  },
  {
    title: "Nirbhaya",
    subtitle: "Women Safety App",
    tech: ["React", "Node.js", "Google Maps API"],
    description:
      "Safety-centric routing application assisting users in selecting secure paths for public transportation with predictive safety scoring.",
    link: "#",
    featured: false,
  },
  {
    title: "CaBU",
    subtitle: "Ride-Sharing Platform",
    tech: ["React", "Firebase"],
    description:
      "Community-centric ride-sharing application addressing campus-wide commuter challenges. Real-time data sync using Firebase for accurate rider and driver tracking.",
    link: "https://github.com/Manitk123/Cabu",
    featured: true,
  },
  {
    title: "Telegram Bots",
    subtitle: "Automation Suite",
    tech: ["Python", "python-telegram-bot"],
    description:
      "Versatile automated scripts managing high-volume community channels with webhook command handling for fast data retrieval and remote file management.",
    link: "#",
    featured: false,
  },
];

export const achievements = [
  { label: "LeetCode Problems", value: 250, suffix: "+" },
  { label: "Projects Built", value: 6, suffix: "+" },
  { label: "Internships", value: 2, suffix: "" },
];

export const certifications = [
  "CS50 - Introduction to CyberSecurity (Harvard University)",
  "Kali Linux — Penetration Testing Training (Infosys Springboard)",
  "DSA Specialist Training (Infosys Springboard)",
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
