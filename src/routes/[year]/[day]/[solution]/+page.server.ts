import { getSolution, getInput } from '$lib/getFiles';
import type { Load } from '@sveltejs/kit';

export const load: Load = ({ params }) => {
  const year = parseInt(params.year || '');
  const day = parseInt(params.day || '');
  const solution = params.solution || '';
  const script = getSolution(year, day, solution);
  const input = getInput(year, day);

  return {
    input,
    script
  };
};
