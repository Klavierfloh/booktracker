<script lang="ts">
  let imageFile: File | null = null;

  async function uploadImage() {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch("/api/image", {
      method: "POST",
      body: formData,
      headers: {
        requestType: "uploadImage",
      },
    });

    const result = await response.json();
    console.log("Upload response:", result);
  }

  function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    imageFile = target.files?.[0] ?? null;
  }
</script>

<input type="file" accept="image/*" onchange={handleFileChange} />
<button onclick={uploadImage}>Upload</button>
