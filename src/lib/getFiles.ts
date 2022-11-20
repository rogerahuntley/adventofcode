import { files } from '$lib/stores/aoc-repo.store';

const getYears = () => {
  return Object.keys(files);
};

const getDays = (year: number) => {
  return Object.keys(files[year] || {});
};

const getSolutions = (year: number, day: number) => {
  return Object.keys(files[year]?.[day] || {});
};

const getFile = (year: number, day: number, solution: string) => {
  return files[year]?.[day]?.[solution] || {};
};

export { getYears, getDays, getSolutions, getFile };
