<script>
  import { page } from '$app/stores';
  export let data;
  const solutions = data.solutions;
  const year = $page.params.year;
  const day = $page.params.day;
</script>

{year} - {day}
{#each solutions as solution}
  <li>
    <a href="/{year}/{day}/{solution}">{solution}</a>
  </li>
{/each}
