<script>
  import { page } from '$app/stores';
  export let data;
  const days = data.days;
  const year = $page.params.year;
</script>

{year}
{#each days as day}
  <li>
    <a href="/{year}/{day}">{day}</a>
  </li>
{/each}
