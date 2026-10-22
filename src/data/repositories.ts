// Verified case-study sources. Keep future entries proposed until publication is checked.
export type Repository = {
  name: string;
  url: string;
  status: "proposed" | "published";
};
export const repositories: Record<string, Repository> = {
  "point-of-sale": {
    name: "mini-market-pos",
    url: "https://github.com/Rawad-01/mini-market-pos",
    status: "published",
  },
  "student-performance": {
    name: "student-performance-clustering",
    url: "https://github.com/Rawad-01/student-performance-clustering",
    status: "published",
  },
};
