<script>
  export let data;
  const years = data.years;
</script>

{#each years as year}
  <li>
    <a href="/{year}">{year}</a>
  </li>
{/each}
