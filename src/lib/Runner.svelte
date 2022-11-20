<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let script = '';
  export let input = '';
  export let readonly = true;
  let result = '';
  const run = () => {
    result = new Function(`let input = \`${input}\`;\n${script}`)();
    dispatch('result', {
      text: result
    });
  };

  const toggleEdit = () => {
    readonly = !readonly;
  };
</script>

<button on:click={toggleEdit}>toggle edit</button> can edit: {!readonly}

<div id="runner">
  <div id="textareas">
    <textarea bind:value={input} />
    <textarea bind:value={script} {readonly} />
  </div>
  <button on:click={run}>run code</button>
  <input bind:value={result} readonly />
</div>

<style lang="scss">
  #runner {
    display: flex;
    flex-direction: column;
    place-items: center;

    #textareas {
      display: flex;
      flex-direction: row;
    }
    textarea {
      height: 70vh;
      width: 45vw;
    }

    button,
    input {
      width: 148px;
    }
  }
</style>
