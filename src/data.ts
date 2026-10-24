import photos from "./photos.json";

export type Photo = { src: string; w: number; h: number; alt: string };

type Slug = keyof typeof photos;

function pick(slug: Slug, alts: Record<number, string>, order: number[]): Photo[] {
  const list = photos[slug];
  return order.map((n) => {
    const p = list[n - 1];
    return { src: p.src, w: p.w, h: p.h, alt: alts[n] ?? "Activity documentation" };
  });
}

export const profile = {
  name: "Yanuarin Salwa Afranita",
  nick: "Salwa",
  email: "salwa.avranita@gmail.com",
  linkedin: "https://www.linkedin.com/in/salwaavranita/",
  whatsapp: "https://wa.me/62895604471265",
  cv: "/CV-Yanuarin-Salwa-Afranita.pdf",
};

export const portraits = {
  hero: { src: "/salwa/hero.webp", w: 900, h: 900, alt: "Portrait of Salwa smiling, wearing a grey hijab and blue batik" },
  standing: { src: "/salwa/standing.webp", w: 750, h: 997, alt: "Salwa standing at the Dibimbing office" },
  podcast: { src: "/salwa/podcast.webp", w: 600, h: 800, alt: "Salwa in a podcast studio wearing headphones" },
} satisfies Record<string, Photo>;

export const skills = [
  { label: "People Management", cap: "#f8c641", edge: "#d6a21f", text: "text-ink" },
  { label: "Public Speaking", cap: "#ff8fb6", edge: "#d9607f", text: "text-ink" },
  { label: "LMS", cap: "#3461e8", edge: "#2244b0", text: "text-white" },
  { label: "Analytical Thinking", cap: "#ffffff", edge: "#d9d3ca", text: "text-ink" },
  { label: "Problem Solving", cap: "#7fd4a7", edge: "#4ea77a", text: "text-ink" },
  { label: "Notion", cap: "#ffffff", edge: "#d9d3ca", text: "text-ink" },
  { label: "AI Tools", cap: "#c9bdf8", edge: "#9887d8", text: "text-ink" },
  { label: "Microsoft Office", cap: "#ff9a6b", edge: "#d06d40", text: "text-ink" },
  { label: "Adaptability", cap: "#ffffff", edge: "#d9d3ca", text: "text-ink" },
];

export const roles = [
  {
    title: "Student Delivery",
    body: "Driving impactful learning experiences through end-to-end facilitation, mentor alignment, and high-energy corporate training programs.",
    proof: [
      "59+ Students Facilitated",
      "Led Youth Up 2026",
    ],
    pill: "bg-blue text-white",
    photo: pick("maxy", { 5: "Salwa with Maxy Summer Camp 2026 participants" }, [5])[0],
  },
  {
    title: "Learning & Development",
    body: "Designing materials that stay consistent and easy to digest, from microlearning and LMS modules to training master slides.",
    proof: ["7+ presentation templates", "BPS RI e-Warkop LMS"],
    pill: "bg-green text-white",
    photo: pick("bps", { 5: "Training participants learning on laptops at BPS RI" }, [5])[0],
  },
  {
    title: "Product Operations",
    body: "Keeping many programs on schedule through a solid team and tidy collaboration across divisions.",
    proof: ["5 bootcamps at once", "14+ Class Managers led"],
    pill: "bg-orange text-white",
    photo: pick("dibimbing-apo", { 4: "The Dibimbing operations team together" }, [4])[0],
  },
];

export type Experience = {
  id: string;
  tab: string;
  company: string;
  role: string;
  duration: string;
  year: string;
  teaser: string;
  theme: { card: string; text: string; muted: string; tape: string; chip: string; button: string; sh: string };
  challenge: string[];
  approach: string[];
  result: string[];
  photos: Photo[];
  cover: number;
};

export const experiences: Experience[] = [
  {
    id: "maxy",
    tab: "Maxy Academy",
    company: "Maxy Academy",
    role: "Student Delivery",
    duration: "6 months",
    year: "2026",
    teaser: "Facilitating corporate trainings and tech bootcamps for learners ranging from students to seasoned professionals.",
    theme: {
      card: "bg-blue",
      text: "text-white",
      muted: "text-white/80",
      tape: "bg-yellow",
      chip: "bg-white/15 text-white",
      button: "bg-white text-blue",
      sh: "40 70 180",
    },
    challenge: [
      "Managing and facilitating corporate training programs (B2B, B2C, B2U) and large-scale tech bootcamps for very diverse participants, from university students to corporate professionals at Adira, Pakuwon and Elnusa, while keeping delivery and curriculum aligned.",
    ],
    approach: [
      "Coordinated large-scale projects such as Youth Up 2026, leading 5 assistant mentors and aligning the curriculum directly with instructors.",
      "Facilitated interactive class sessions for the Digital Career Bootcamp (45+ students) and Anteraja NextGen AI Academy (14 students).",
    ],
    result: [
      "Delivered smooth corporate trainings for 30+ participants per session and successfully steered Youth Up 2026 with more than 60 participants.",
    ],
    photos: pick(
      "maxy",
      {
        1: "The Maxy Academy team welcoming participants at the office",
        2: "Salwa with fellow Maxy Academy facilitators",
        3: "Elevate Teacher Potential corporate training session",
        4: "Group photo with corporate training participants",
        5: "Maxy Summer Camp 2026 with participants",
        6: "Salwa in the Maxy Academy podcast studio",
        7: "A hybrid session with Maxy Academy learners",
        8: "The Maxy Academy website",
      },
      [1, 2, 3, 4, 5, 6, 7, 8],
    ),
    cover: 0,
  },
  {
    id: "bps",
    tab: "BPS RI",
    company: "Badan Pusat Statistik RI",
    role: "Learning Technology Developer",
    duration: "5 months",
    year: "2025 - 2026",
    teaser: "Building microlearning modules and master slides that made civil-servant (CPNS) training more consistent.",
    theme: {
      card: "bg-green",
      text: "text-white",
      muted: "text-white/80",
      tape: "bg-pink",
      chip: "bg-white/15 text-white",
      button: "bg-white text-green",
      sh: "20 110 70",
    },
    challenge: [
      "Keeping instructional materials consistent and making digital training delivery more effective for CPNS (civil servant candidate) participants at BPS RI.",
    ],
    approach: [
      "Developed microlearning modules and digital content integrated into the BPS RI Training Center LMS (e-Warkop).",
      "Designed 7+ standardized presentation templates and master slide decks for CPNS training sessions.",
    ],
    result: [
      "Created consistent visuals and digital learning materials that 25 to 30 participants per cohort can access with ease.",
    ],
    photos: pick(
      "bps",
      {
        1: "The BPS RI intern team in the studio",
        2: "With the BPS RI training center team",
        3: "The Badan Pusat Statistik RI building",
        4: "Orientation and kick-off session",
        5: "Training participants learning on laptops",
        6: "A training activity at BPS RI",
        7: "Group photo in front of the BPS training center",
      },
      [7, 1, 2, 4, 5, 6, 3],
    ),
    cover: 0,
  },
  {
    id: "dibimbing-apo",
    tab: "Dibimbing",
    company: "PT Dibimbing Digital Indonesia",
    role: "Assistant Product Operation",
    duration: "1.5 years",
    year: "2025 - 2026",
    teaser: "Running the day-to-day of 5 technical bootcamps at once, together with 14+ Class Managers.",
    theme: {
      card: "bg-pink",
      text: "text-white",
      muted: "text-white/85",
      tape: "bg-butter",
      chip: "bg-white/15 text-white",
      button: "bg-white text-pink",
      sh: "180 40 90",
    },
    challenge: [
      "Overseeing the daily operations of 5 different technical bootcamps at the same time (Data Science, Supply Chain, Risk Management, DevOps, Cyber Security) while keeping service standards high.",
    ],
    approach: [
      "Led, mentored and directed 14+ Class Managers to make sure operations were executed on time.",
      "Built cross-divisional collaboration to align operational workflows around learner needs (user-focused support).",
    ],
    result: [
      "Kept 5 technical bootcamps running smoothly at once and contributed directly to a customer retention rate above 80%.",
    ],
    photos: pick(
      "dibimbing-apo",
      {
        1: "Salwa with colleagues at Dibimbing",
        2: "Salwa at the Dibimbing office",
        3: "The Dibimbing team together",
        4: "The Dibimbing operations team together",
      },
      [4, 2, 1, 3],
    ),
    cover: 0,
  },
  {
    id: "dibimbing-cm",
    tab: "Dibimbing",
    company: "PT Dibimbing Digital Indonesia",
    role: "Class Manager",
    duration: "8 months",
    year: "2024 - 2025",
    teaser: "Guiding 30+ Data Science bootcamp students all the way to graduation and job placement.",
    theme: {
      card: "bg-yellow",
      text: "text-ink",
      muted: "text-ink/75",
      tape: "bg-blue",
      chip: "bg-ink/10 text-ink",
      button: "bg-ink text-yellow",
      sh: "170 120 20",
    },
    challenge: [
      "Increasing student engagement, resolving operational issues during the bootcamp, and driving graduation and job placement rates.",
    ],
    approach: [
      "Facilitated and moderated 45+ weekly classes and external events to strengthen the connection between students and instructors.",
      "Analyzed the customer journey of 12+ users per batch to spot and resolve operational bottlenecks.",
    ],
    result: [
      "Improved learner satisfaction and contributed to a 55.56% graduation & placement rate for 30+ Data Science bootcamp students.",
    ],
    photos: pick(
      "dibimbing-cm",
      {
        1: "Online graduation of the Data Science bootcamp",
        2: "Online group photo with Data Science bootcamp students",
      },
      [1, 2],
    ),
    cover: 0,
  },
];

export const education = {
  school: "Universitas Brawijaya",
  degree: "Bachelor's, Computer Science",
  years: "2021 - 2025",
  gpa: "3.86",
  award: "Student Entrepreneur Program (PMW) Awardee 2023",
};

export const orgs = [
  {
    role: "Head of Information & Creative Media Bureau",
    org: "BEM FILKOM Universitas Brawijaya",
    years: "2023 - 2024",
    highlight: { value: "60+", label: "Instagram posts every month" },
    points: ["Led 2 deputies and 9 staff across 10+ publication programs.", "Hit nearly 100% of the media KPI targets."],
    tone: "bg-peach",
    accent: "bg-red",
    sh: "190 90 60",
  },
  {
    role: "Staff of Information & Creative Media Bureau",
    org: "BEM FILKOM Universitas Brawijaya",
    years: "2022 - 2023",
    highlight: { value: "31.4K", label: "peak TikTok views" },
    points: [
      "Drove the “FILKOM Your Page” program with 2 to 3 posts a month.",
      "Wrote copy for the “Company Profile” series, read by 100+ people.",
    ],
    tone: "bg-sky",
    accent: "bg-blue",
    sh: "60 100 170",
  },
];

export const campusPhotos: Photo[] = [
  ...pick(
    "bem-head",
    {
      1: "The media bureau in front of the Open Recruitment stage",
      2: "BEM FILKOM on the faculty steps",
      3: "The BEM FILKOM booth at a campus event",
      5: "The whole BEM FILKOM family on the field",
      6: "BEM FILKOM board members on a visit",
    },
    [1, 2, 5, 3, 6],
  ),
  ...pick(
    "bem-staff",
    {
      1: "BEM FILKOM board in uniform",
      2: "The media bureau posing in front of a backdrop",
      3: "Watching the sunrise with the team",
      6: "An internal BEM FILKOM event in the hall",
      7: "Fun times with the media bureau",
    },
    [2, 1, 6, 3, 7],
  ),
];
