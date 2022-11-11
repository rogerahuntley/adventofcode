import type { Load } from '@sveltejs/kit';
import { getDays } from '$lib/narrowDown';

export const load: Load = ({ params }) => {
  const year = parseInt(params.year || '');
  const days = getDays(year);

  return {
    days
  };
};
