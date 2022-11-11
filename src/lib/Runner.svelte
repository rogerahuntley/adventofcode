<script>
  export let script = '';
  export let readonly = true;
  const run = () => {
    eval(script);
  };
</script>

<textarea bind:value={script} {readonly} />
<button on:click={run}>run code</button>
