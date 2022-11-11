import { getFile } from '$lib/getFiles';
import type { Load } from '@sveltejs/kit';

export const load: Load = ({ params }) => {
  const year = parseInt(params.year || '');
  const day = parseInt(params.day || '');
  const solution = parseInt(params.solution || '');
  const script = getFile(year, day, solution);

  return {
    script
  };
};
