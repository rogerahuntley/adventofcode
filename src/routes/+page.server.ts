import type { Load } from '@sveltejs/kit';
import { getYears } from '$lib/getFiles';

export const load: Load = () => {
  const years = getYears();

  return {
    years
  };
};
