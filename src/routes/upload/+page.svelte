<script lang="ts">
  import { enhance } from "$app/forms";

  let fileInput: HTMLInputElement;

  function handleDrop(ev: DragEvent) {
    ev.preventDefault();

    const files = ev.dataTransfer?.files;
    if (files && files.length > 0) {
      console.log('Dropped files:', files);

      const dt = new DataTransfer();
      for (const file of files) {
        dt.items.add(file);
      }

      fileInput.files = dt.files;
    }
  }

  function handleDragOver(ev: DragEvent) {
    ev.preventDefault(); // Necessary to allow drop
  }
</script>
<!--svelte-ignore a11y_no_static_element_interactions-->

<form method="post" use:enhance enctype="multipart/form-data">
  <div
    class="dropzone"
    ondrop={handleDrop}
    ondragover={handleDragOver}
  >
    <div class="group">
      <label for="file">Upload your file</label>
      <input
        type="file"
        id="file"
        name="fileToUpload"
        bind:this={fileInput}
        accept=".jpg, .jpeg, .png, .webp"
        required
      />
    </div>

    <button type="submit">Submit</button>
  </div>
</form>

<style>
    .dropzone {
        margin-left: 10%;
        margin-right: 10%;
        width: auto;
        height: 100px;
        background-color: aquamarine;
    }
</style>
