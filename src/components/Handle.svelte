<script lang="ts">

  let maybeHandle: string='';
  let handleIsValid: boolean = false;
  let debounceTimer;
  export let formFinished = false;
  const debounceCheck = (evt: Event) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      checkHandle()
    }, 1000);
  }
  const checkHandle = () => {
    console.debug('checking handle')
    if (maybeHandle === 'Charlie' || maybeHandle.length < 3) {
      handleIsValid = false;
    }  else if (maybeHandle.length >= 3) {
      handleIsValid = true;
    }
  }
  const doClaimHandle = (evt: Event) => {
    if (debounceTimer) { clearTimeout(debounceTimer); }
    formFinished = true;
  }

</script>
<div class="text-2xl text-center">Choose your handle</div>
<div class="pt-4">Your handle is a named connection to your DSNP Identity.</div>
<div class="pt-4">Choose a unique handle and provide your signature to associate it with your DSNP account.</div>
<form class="pt-4">
  <input id="handle" class="w-80 mr-8"
         placeholder="enter your desired handle" bind:value={maybeHandle} on:keyup={debounceCheck}>
  <button class={handleIsValid ? 'btn-primary' : 'btn-disabled'}
          on:click|preventDefault={doClaimHandle} disabled={!handleIsValid}>
    Claim this handle
  </button>
</form>