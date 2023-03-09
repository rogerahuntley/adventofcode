<script>
  import Runner from '$lib/Runner.svelte'
  let script = 'alert("test")'
</script>

<Runner readonly={false} {script} />
