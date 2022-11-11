<script>
  import { page } from '$app/stores';
  import Runner from '$lib/Runner.svelte';
  export let data;
  const script = data.script;
  const year = $page.params.year;
  const day = $page.params.day;
  const solution = $page.params.solution;
</script>

{year} - {day} - {solution}

<Runner {script} />
