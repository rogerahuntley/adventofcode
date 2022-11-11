import type { Load } from '@sveltejs/kit';
import { getYears } from '$lib/narrowDown';

export const load: Load = () => {
  const years = getYears();

  return {
    years
  };
};
