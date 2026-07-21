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
    image: "/portfolio2/assets/detonate.png",
    featured: true,
  },
  {
    title: "Transformer-Based HIDS",
    subtitle: "Research Paper",
    tech: ["Python", "Deep Learning", "PyTorch", "Linux"],
    description:
      "Host-Based Intrusion Detection System using a custom Transformer architecture to detect system-level anomalies. Performance benchmarked against traditional LSTM models.",
    link: "https://github.com/Manitk123/Transformer-HIDS-Research",
    image: "/portfolio2/assets/hids.png",
    featured: true,
  },
  {
    title: "Malware Behaviour Analysis",
    subtitle: "Security Research",
    tech: ["Linux", "Cuckoo Sandbox", "Python"],
    description:
      "Automated malware analysis system using Cuckoo Sandbox to safely isolate and monitor threats. Evaluates malicious behavior by parsing API calls, network traffic, and filesystem modifications.",
    link: "#",
    image: "/portfolio2/assets/malware.png",
    featured: false,
  },
  {
    title: "Nirbhaya",
    subtitle: "Women Safety App",
    tech: ["React", "Node.js", "Google Maps API"],
    description:
      "Safety-centric routing application assisting users in selecting secure paths for public transportation with predictive safety scoring.",
    link: "#",
    image: "/portfolio2/assets/nirbhaya.png",
    featured: false,
  },
  {
    title: "CaBU",
    subtitle: "Ride-Sharing Platform",
    tech: ["React", "Firebase"],
    description:
      "Community-centric ride-sharing application addressing campus-wide commuter challenges. Real-time data sync using Firebase for accurate rider and driver tracking.",
    link: "https://github.com/Manitk123/Cabu",
    image: "/portfolio2/assets/cabu.png",
    featured: true,
  },
  {
    title: "Telegram Bots",
    subtitle: "Automation Suite",
    tech: ["Python", "python-telegram-bot"],
    description:
      "Versatile automated scripts managing high-volume community channels with webhook command handling for fast data retrieval and remote file management.",
    link: "#",
    image: "/portfolio2/assets/telegram.png",
    featured: false,
  },
];

export const achievements = [
  { label: "LeetCode Problems", value: 250, suffix: "+" },
  { label: "Projects Built", value: 6, suffix: "+" },
  { label: "Internships", value: 2, suffix: "" },
];

export const certifications = [
  {
    title: "CS50 - Introduction to CyberSecurity",
    provider: "Harvard University",
    link: ""
  },
  {
    title: "Kali Linux — Penetration Testing",
    provider: "Infosys Springboard",
    link: ""
  },
  {
    title: "DSA Specialist Training",
    provider: "Infosys Springboard",
    link: ""
  },
  {
    title: "Data Structures",
    provider: "Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/QETW9RNOPDXR"
  },
  {
    title: "C++ Basics: Selection and Iteration",
    provider: "Coursera",
    link: "https://coursera.org/share/ccc3067642a5837505a233a2d4469db5"
  },
  {
    title: "Object-Oriented Data Structures in C++",
    provider: "Coursera",
    link: "https://coursera.org/share/b6184251075024f57fc6fd64630c4846"
  },
  {
    title: "Fundamentals of Network Communication",
    provider: "Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/8DLNTRJ5KZZN"
  },
  {
    title: "Introduction to Cybersecurity Tools & Cyberattacks",
    provider: "Coursera",
    link: "https://coursera.org/share/32526cfbc5f3e12aea66fca638ba95f5"
  }
];

export const designs = [
  {
    "title": "Alumni Dropdown",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Alumni Dropdown.png",
    "link": "#"
  },
  {
    "title": "Alumni profile dropdown",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Alumni profile dropdown.png",
    "link": "#"
  },
  {
    "title": "Alumni profile",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Alumni profile.png",
    "link": "#"
  },
  {
    "title": "Alumni",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Alumni.png",
    "link": "#"
  },
  {
    "title": "Commute Basics",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Commute Basics.png",
    "link": "#"
  },
  {
    "title": "end ride",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/end ride.png",
    "link": "#"
  },
  {
    "title": "Faculty profile",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Faculty profile.png",
    "link": "#"
  },
  {
    "title": "offered ride empty",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/offered ride empty.png",
    "link": "#"
  },
  {
    "title": "offered ride full",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/offered ride full.png",
    "link": "#"
  },
  {
    "title": "offered ride otp",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/offered ride otp.png",
    "link": "#"
  },
  {
    "title": "offered ride",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/offered ride.png",
    "link": "#"
  },
  {
    "title": "profile",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/profile.png",
    "link": "#"
  },
  {
    "title": "register number toggled",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/register number toggled.png",
    "link": "#"
  },
  {
    "title": "register number",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/register number.png",
    "link": "#"
  },
  {
    "title": "Requested ride accepted",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Requested ride accepted.png",
    "link": "#"
  },
  {
    "title": "requested ride empty",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/requested ride empty.png",
    "link": "#"
  },
  {
    "title": "Requested ride otp",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Requested ride otp.png",
    "link": "#"
  },
  {
    "title": "Requested ride",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Requested ride.png",
    "link": "#"
  },
  {
    "title": "Role",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Role.png",
    "link": "#"
  },
  {
    "title": "Staff Details Dropdown",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Staff Details Dropdown.png",
    "link": "#"
  },
  {
    "title": "Staff Details",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Staff Details.png",
    "link": "#"
  },
  {
    "title": "Start page",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Start page.png",
    "link": "#"
  },
  {
    "title": "Student Details Dropdown",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Student Details Dropdown.png",
    "link": "#"
  },
  {
    "title": "Student Details",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Student Details.png",
    "link": "#"
  },
  {
    "title": "Student Profile",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Student Profile.png",
    "link": "#"
  },
  {
    "title": "Verify number otp",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Verify number otp.png",
    "link": "#"
  },
  {
    "title": "Verify number",
    "subtitle": "App Design",
    "description": "Figma Design Export",
    "image": "/assets/Syinq/Verify number.png",
    "link": "#"
  },
  {
    "title": "ebc2.0",
    "subtitle": "Social Media",
    "description": "Figma Design Export",
    "image": "/assets/syinq_social_media_posts/ebc2.0.png",
    "link": "#"
  },
  {
    "title": "empty_seats",
    "subtitle": "Social Media",
    "description": "Figma Design Export",
    "image": "/assets/syinq_social_media_posts/empty_seats.png",
    "link": "#"
  },
  {
    "title": "insta_post",
    "subtitle": "Social Media",
    "description": "Figma Design Export",
    "image": "/assets/syinq_social_media_posts/insta_post.png",
    "link": "#"
  },
  {
    "title": "spin wheel",
    "subtitle": "Social Media",
    "description": "Figma Design Export",
    "image": "/assets/syinq_social_media_posts/spin wheel.png",
    "link": "#"
  },
  {
    "title": "syinq_standee_post",
    "subtitle": "Social Media",
    "description": "Figma Design Export",
    "image": "/assets/syinq_social_media_posts/syinq_standee_post.png",
    "link": "#"
  },
  {
    "title": "THIS SEAT IS SINGLE 1",
    "subtitle": "Social Media",
    "description": "Figma Design Export",
    "image": "/assets/syinq_social_media_posts/THIS SEAT IS SINGLE 1.png",
    "link": "#"
  },
  {
    "title": "ticket_post",
    "subtitle": "Social Media",
    "description": "Figma Design Export",
    "image": "/assets/syinq_social_media_posts/ticket_post.png",
    "link": "#"
  }
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Design", href: "#design" },
  { label: "Contact", href: "#contact" },
];
