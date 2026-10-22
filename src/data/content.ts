export const profile = {
  name: "Rawad Zeidan",
  title: "Software Developer & Creative Technologist",
  email: "rawadzeidan2@gmail.com",
  github: "https://github.com/Rawad-01",
  location: "Lebanon",
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  stack: string[];
  scope: string;
  problem: string;
  approach: string;
  features: string[];
  decisions: { title: string; text: string }[];
  result: string;
  limitations: string;
  evidence: string[];
};
export const projects: Project[] = [
  {
    slug: "point-of-sale",
    number: "01",
    title: "Point of Sale & Inventory",
    shortTitle: "A sale is more than a transaction.",
    category: "Full-stack application / Business software",
    description:
      "A retail application that connects checkout, stock movements, purchasing, and role-based access in one workflow.",
    stack: ["Python", "Flask", "MySQL", "SQLAlchemy", "Jinja"],
    scope: "Academic application · Local validation",
    problem:
      "A retail checkout needs to keep prices, payments, and inventory consistent. A sale should leave a traceable record of what changed and why.",
    approach:
      "The application separates authentication, products, purchases, inventory, sales, and reports into Flask blueprints, backed by a relational MySQL model.",
    features: [
      "Product and barcode search with stock checks",
      "LBP, USD, card, and mixed-payment recording",
      "Purchasing, suppliers, and inventory movement history",
      "Admin, cashier, and inventory-manager permissions",
      "Receipts and sales reports",
    ],
    decisions: [
      {
        title: "Trust the server's price",
        text: "Checkout retrieves active products and prices from the database, aggregates repeated product IDs, and validates quantities before calculating totals.",
      },
      {
        title: "Keep inventory and sales together",
        text: "The checkout path locks selected product rows and records the sale, line items, and stock movements in one database transaction, with rollback on failure.",
      },
      {
        title: "Make money explicit",
        text: "Decimal values are used for totals. Each sale stores its exchange rate and payment amounts so the receipt can reflect the transaction context.",
      },
    ],
    result:
      "The source connects checkout, purchasing and inventory through a coherent relational model. A separate repository-preparation copy adds configuration and authentication hardening, a fresh-database migration, and 31 passing checks with synthetic SQLite data.",
    limitations:
      "The tests verify checkout, rollback, permissions and selected security boundaries. MySQL setup, report SQL, concurrent inventory changes and the browser workflow still require validation. Preparation changes are documented separately from the original university implementation; no deployed retail use is claimed.",
    evidence: [
      "app/pos/routes.py · product search and transactional checkout",
      "app/models.py · products, sales, purchases, and stock relationships",
      "app/permissions.py · role checks",
      "app/templates/ · application views",
      "Prepared copy: docs/PREPARATION_CHANGES.md and docs/VALIDATION.md",
    ],
  },
  {
    slug: "student-performance",
    number: "02",
    title: "Student Performance Clustering",
    shortTitle: "Finding patterns. Questioning the result.",
    category: "Machine learning / Exploratory study",
    description:
      "An unsupervised study of student data, comparing clustering methods and examining what their patterns can and cannot tell us.",
    stack: ["Python", "Pandas", "scikit-learn", "SciPy", "Jupyter"],
    scope: "Academic study · Reproduced locally",
    problem:
      "Mixed academic, demographic, and lifestyle variables are difficult to compare directly. This study explores whether preprocessing and clustering reveal meaningful structure in the Student Performance dataset.",
    approach:
      "A ColumnTransformer combines imputation, numeric scaling, and categorical encoding. K-Means and Ward clustering are compared, then PCA provides a lower-dimensional view of the results.",
    features: [
      "Mixed numeric and categorical preprocessing pipeline",
      "K-Means comparison across multiple cluster counts",
      "Ward clustering and a sampled dendrogram",
      "Silhouette analysis and adjusted Rand comparison",
      "PCA visualizations and cluster profiles",
    ],
    decisions: [
      {
        title: "Make preprocessing repeatable",
        text: "Median and mode imputation, scaling, and one-hot encoding are assembled in a shared transformer. The notebook also explicitly simulates missing values as an exercise.",
      },
      {
        title: "Compare methods, not just pictures",
        text: "Inertia, silhouette scores, and adjusted Rand agreement supplement visual comparisons of K-Means and hierarchical clustering.",
      },
      {
        title: "Treat weak separation honestly",
        text: "Both saved outputs and a fresh run show weak cluster separation. A separate preparation-stage experiment found that removing two redundant grade summaries changes assignments; broader stability checks are still needed.",
      },
    ],
    result:
      "A clean copy reproduces the original analysis: K-Means silhouette 0.1188, Ward silhouette 0.1265, and 31.95% variance retained in two PCA components. These results support a cautious interpretation of weak structure; they do not establish useful student categories.",
    limitations:
      "The reviewed copy executed all 14 analysis cells and passed 19 validation assertions in an isolated Python environment. Figures remain the genuine original outputs. The additional sensitivity experiment was created during repository preparation. Cross-platform behavior and educational usefulness remain unverified.",
    evidence: [
      "Executed notebook, cells 9–11 · feature engineering and preprocessing",
      "Cells 13–18 · K-Means and Ward comparison",
      "Cells 20–23 · PCA and cluster profiles",
      "Prepared copy: docs/VALIDATION.md and docs/validation-results.json",
      "Dataset: verified UCI mathematics data, DOI 10.24432/C5TG7T; CC BY 4.0",
    ],
  },
];

export const experience = [
  {
    company: "Jama3etna LLC",
    role: "QA & Backend Developer Intern",
    date: "May 2026 — August 2026",
    mode: "Hybrid",
    points: [
      "Tested REST APIs with Postman: authentication, authorization, status codes, request validation, JSON responses, CRUD, filters, and error handling.",
      "Documented issues and retested APIs. Developed and integrated Node.js and Express.js REST APIs, including uploads with Multer and Cloudinary.",
      "Used PostgreSQL and Docker during backend development and testing.",
    ],
    tags: ["Node.js", "Express.js", "Postman", "PostgreSQL"],
  },
  {
    company: "Cedar Digital Solutions",
    role: "Frontend Developer Intern",
    date: "November 2025 — January 2026",
    mode: "Remote",
    points: [
      "Developed and styled Contact Us, Case Studies, and Testimonials pages using WordPress and Elementor.",
      "Worked on responsive layouts, UI consistency, and brand guidelines.",
    ],
    tags: ["WordPress", "Elementor", "Responsive UI"],
  },
  {
    company: "CodeAlpha",
    role: "Frontend Developer Intern",
    date: "August 2025 — September 2025",
    mode: "Remote",
    points: [
      "Built responsive interfaces and frontend components with HTML, CSS, and JavaScript.",
      "Improved page structure and user experience.",
    ],
    tags: ["HTML", "CSS", "JavaScript"],
  },
];
export const capabilities = [
  {
    title: "Backend & APIs",
    items: "Node.js · Express.js · REST APIs · Multer · Cloudinary",
    note: "Development and integration through internship work.",
  },
  {
    title: "Frontend & Web",
    items: "HTML · CSS · JavaScript · WordPress · Elementor",
    note: "Responsive interfaces and consistent page experiences.",
  },
  {
    title: "Languages & Databases",
    items: "Python · Java · C# · PostgreSQL · SQL",
    note: "Programming, relational data, and problem-solving.",
  },
  {
    title: "Quality & Tools",
    items: "Postman · API testing · Docker · Debugging",
    note: "Authentication, authorization, validation, and bug reporting.",
  },
  {
    title: "AI & Data Foundations",
    items: "NumPy · Pandas · Machine learning fundamentals · AI concepts",
    note: "Exploratory analysis, with an emphasis on interpreting limitations.",
  },
  {
    title: "Creative Technology",
    items: "PixVerse AI · AI video generation · Video editing",
    note: "Independent concepts, generated sequences, and original edits.",
  },
];
export const certificates = [
  {
    title: "Kanz AI Training Hackathon",
    subtitle: "Certificate of Course Participation",
    issuer: "Kanz AI Training Hackathon",
    date: "July 2026",
  },
  {
    title: "Elements of AI for Business!",
    subtitle: "Course certificate",
    issuer: "MinnaLearn",
    date: "June 2026",
  },
  {
    title: "Artificial Intelligence Fundamentals",
    subtitle: "Course certificate",
    issuer: "IBM",
    date: "January 2026",
  },
];
export type Film = {
  id: string;
  title: string;
  workingTitle: boolean;
  description: string;
  src: string;
  poster: string;
  posterAlt: string;
  duration: string;
  width: number;
  height: number;
  mime?: "video/mp4" | "video/webm";
  captions?: { src: string; language: string; label: string }[];
  transcript?: string;
};
export type GalleryFilm = Film & { available: boolean };
export const films: Film[] = [
  {
    id: "boukra",
    posterAlt: "A woman in a warmly lit cafe, from the AI-generated film",
    title: "The Shape of Tomorrow",
    workingTitle: true,
    description:
      "An AI-generated visual journey through intimate interiors, city streets, and warm evening gatherings.",
    src: "/media/boukra.mp4",
    poster: "/images/boukra-poster.jpg",
    duration: "08:57",
    width: 1280,
    height: 720,
  },
  {
    id: "oman",
    posterAlt:
      "A figure beside a container port, from the AI-generated film about Oman",
    title: "Oman, in Motion",
    workingTitle: true,
    description:
      "A visual journey through Oman’s ports, industry, landscapes, and urban life, imagined with generative video.",
    src: "/media/oman.mp4",
    poster: "/images/oman-poster.jpg",
    duration: "02:12",
    width: 1280,
    height: 720,
  },
];
