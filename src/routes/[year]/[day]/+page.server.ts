import type { Load } from '@sveltejs/kit';
import { getSolutions } from '$lib/narrowDown';

export const load: Load = ({ params }) => {
  const year = parseInt(params.year || '');
  const day = parseInt(params.day || '');
  const solutions = getSolutions(year, day);

  return {
    solutions
  };
};
