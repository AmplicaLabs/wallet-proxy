<script lang="ts">

  let maybeHandle: string='';
  let handleIsValid: boolean = false;
  let debounceTimer;
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

  }

</script>
<div class="text-2xl text-center">Choose your handle</div>
<div class="pt-4">Your handle is a unique, human-readable connection to your DSNP Identity.</div>
<div class="pt-4">Choose a unique handle and sign to authorize its creation, associating it to your DSNP account.</div>
<form class="pt-4">
  <label for="handle">Handle</label>
  <input id="handle" placeholder="enter your desired handle" bind:value={maybeHandle} on:keyup={debounceCheck}>
  <button on:click|preventDefault={doClaimHandle} disabled={!handleIsValid} class={handleIsValid ? 'btn-primary' : 'btn-disabled'}>Claim this handle</button>
</form>