<script>
  import Runner from '$lib/components/Runner.svelte'
  let script = 'alert("test")'
</script>

<Runner readonly={false} {script} />
