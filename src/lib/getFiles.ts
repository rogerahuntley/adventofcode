import { solutions, inputs } from '$lib/stores/aoc-repo.store';

const getYears = () => {
  return Object.keys(solutions);
};

const getDays = (year: number) => {
  return Object.keys(solutions[year] || {});
};

const getSolutions = (year: number, day: number) => {
  return Object.keys(solutions[year]?.[day] || {});
};

const getSolution = (year: number, day: number, solution: string) => {
  return solutions[year]?.[day]?.[solution] || '';
};

const getInput = (year: number, day: number) => {
  return inputs[year]?.[day] || '';
};

export { getYears, getDays, getSolutions, getSolution, getInput };
