export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  imageUrl: string;
  link?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string[];
  skills?: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "harissa",
    title: "Menghir Harisaa",
    category: "Short Film",
    year: "2024",
    description: "A spicy film about a bland Tunisian. Written-Directed by Saifeddine Lahmar.",
    imageUrl: "https://i0.wp.com/culturecustodian.com/wp-content/uploads/2025/10/Still-3-scaled.png?resize=1024%2C572&ssl=1",
    link: "https://www.instagram.com/menghir_harissa",
  },
  {
    id: "saif22",
    title: "SAIF'22 Official Music Video",
    category: "Music Video / Direction",
    year: "2022",
    description: "Invent To Implement - A pillar of the festival's audience engagement strategy. Director, cinematographer, and editor.",
    imageUrl: "https://img.youtube.com/vi/mOq_UqBNM-I/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=mOq_UqBNM-I",
  },
  {
    id: "ted-interview",
    title: "Leadership through listening",
    category: "Interview Series",
    year: "2024",
    description: "Interview with Saifeddine Lahmar for TED-Ed Student Talks.",
    imageUrl: "https://img.youtube.com/vi/barOSeHnRwo/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=barOSeHnRwo",
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: "exp1",
    company: "Dino Marketing Group",
    role: "Marketing Intern",
    period: "Jan 2026 - Present",
    description: [
      "Source, curate, and draft user-generated content (UGC) and brand copy across websites, social platforms, and press releases for client campaigns including Hyundai Translead and Big Brothers.",
      "Manage weekly community engagement calendars and execute daily owned and outbound engagement initiatives for clients including Beko and MultiPro, supporting audience growth and brand-safe interactions.",
      "Collaborate cross-functionally with creative, strategy, and account teams to ideate engagement concepts and deliver campaign-ready content on tight timelines."
    ]
  },
  {
    id: "exp2",
    company: "Bezos Family Foundation",
    role: "Scholar - Director of Marketing and Operations for SAIF'21",
    period: "Mar 2021 - Jan 2026",
    description: [
      "Managed and trained a group of interns to create and implement marketing strategies for the South African Ideas Festival, enhancing continental audience engagement.",
      "Directed and produced commercials and music videos as part of the promotional strategy for the festival.",
      "Headed virtual conferences' productions, providing a reliable learning platform for 50+ African entrepreneurs from across the continent."
    ],
    skills: ["Task Management", "Project Planning", "Team Leadership", "Microsoft Office"]
  },
  {
    id: "exp3",
    company: "The Aspen Institute",
    role: "Media & Communications",
    period: "Jun 2025 - Dec 2025",
    location: "Washington DC-Baltimore Area",
    description: [
      "Produced 20+ episode interview series with high-profile global leaders, overseeing production logistics and crafting brand-aligned narratives that doubled audience engagement.",
      "Coordinated cross-functional marketing and communications efforts for the Action Forum, leveraging Salesforce to manage participant data.",
      "Wrote 10+ stories and audited 150+ blog posts using WordPress, enhancing brand storytelling and user experience."
    ]
  },
  {
    id: "exp4",
    company: "TED Conferences",
    role: "TED-Ed Programs Community & Content Intern",
    period: "Sep 2024 - Jul 2025",
    location: "United States",
    description: [
      "Support the TED-Ed team by addressing community needs and inquiries on the Student Talks platform.",
      "Assist the marketing team by organizing data, reviewing and categorizing TED-Ed Student Talks content for promotional use."
    ],
    skills: ["Organization Skills", "Project Management", "Professional Communication"]
  },
  {
    id: "exp5",
    company: "Undergraduate Research Assistant Program",
    role: "Publicity & Digital Content Specialist",
    period: "Jan 2024 - Jun 2024",
    location: "Hybrid",
    description: [
      "Practice and cultivate data-driven recommendations for 'Time Passages' marketing and publicity campaigns on social media platforms."
    ],
    skills: ["Analytical Skills", "Social Media Marketing", "Video Production", "Content Strategy"]
  },
  {
    id: "exp6",
    company: "Northwestern University Office of Undergraduate Admission",
    role: "Content Strategist & Videographer",
    period: "Sep 2023 - Jun 2024",
    location: "United States",
    description: [
      "Conceptualize promotional content ideas for the Office of Undergraduate Admissions, pitching to the board and executing production/post-production."
    ],
    skills: ["Video Post-Production", "Adobe Premiere Pro", "Audio Post Production", "Creative Concept Design"]
  },
  {
    id: "exp7",
    company: "Northwestern University",
    role: "Video Specialist",
    period: "Nov 2022 - Nov 2023",
    location: "On-site",
    description: [
      "Edited educational and advertising content delivering 5+ well-paced videos weekly using Adobe Creative Suite.",
      "Assisted in shooting projects and worked closely with directors and production managers on set."
    ],
    skills: ["Video Post-Production", "Attention to Detail", "Adobe Premiere Pro", "Professional Communication"]
  },
  {
    id: "exp8",
    company: "South African Ideas Festival",
    role: "Director of Marketing and Operations",
    period: "Mar 2021 - Jun 2022",
    location: "South Africa",
    description: [
      "Spearheaded the festival's public image by curating marketing strategies and securing partnerships.",
      "Oversaw the brainstorming, planning, and execution of content projects for creative advertising."
    ],
    skills: ["Operations Management", "Team Leadership", "Social Media Marketing", "Web Content Creation", "Advertising", "Creative Concept Design"]
  }
];
