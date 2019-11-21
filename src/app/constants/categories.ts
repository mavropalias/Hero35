import { Category } from "../schema";

const CATEGORIES: Category[] = [
  {
    id: "-1",
    colorBackground: "#ffffff",
    colorText: "#20232a",
    contextTitle: "",
    countries: [
      "Australia",
      "Bulgaria",
      "Czech Republic",
      "Finland",
      "France",
      "Germany",
      "Hungary",
      "India",
      "Israel",
      "Italy",
      "Korea",
      "Lithuania",
      "Netherlands",
      "Poland",
      "Singapore",
      "Slovakia",
      "Spain",
      "UK",
      "Ukraine",
      "USA"
    ],
    isCurated: true,
    shortTitle: "All Stacks",
    slug: "",
    title: "All Stacks"
  },
  {
    id: "1",
    colorBackground: "#F7DF1E",
    colorText: "#000000",
    contextTitle: "JavaScript",
    countries: [
      "Czech Republic",
      "Germany",
      "Hungary",
      "Korea",
      "Lithuania",
      "Singapore",
      "Slovakia",
      "Spain",
      "UK",
      "USA"
    ],
    isCurated: true,
    shortTitle: "JS",
    slug: "javascript",
    title: "JavaScript"
  },
  {
    id: "4",
    colorBackground: "#61dafb",
    colorText: "#20232a",
    contextTitle: "React",
    countries: [
      "Australia",
      "Bulgaria",
      "Czech Republic",
      "Finland",
      "France",
      "Germany",
      "India",
      "Israel",
      "Italy",
      "Netherlands",
      "Poland",
      "Slovakia",
      "Spain",
      "UK",
      "Ukraine",
      "USA"
    ],
    isCurated: true,
    shortTitle: "React",
    slug: "react",
    title: "React"
  }
].sort((a, b) => (a.title > b.title ? 1 : -1));

export default CATEGORIES;
