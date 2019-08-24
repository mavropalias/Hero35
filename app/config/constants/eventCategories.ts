import { Category } from "../schema";

const EVENT_CATEGORIES: Category[] = [
  {
    id: "1",
    title: "JavaScript"
  },
  {
    id: "2",
    title: "CSS"
  },
  {
    id: "3",
    title: "Flutter"
  },
  {
    id: "4",
    title: "React"
  },
  {
    id: "5",
    title: "Angular"
  },
  {
    id: "6",
    title: "Vue"
  },
  {
    id: "7",
    title: "Blockchain"
  },
  {
    id: "8",
    title: "Elm"
  },
  {
    id: "9",
    title: "Ember"
  },
  {
    id: "10",
    title: "Swift"
  }
].sort((a, b) => (a.title > b.title ? 1 : -1));

export default EVENT_CATEGORIES;
