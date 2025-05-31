<script>
    import { goto } from "$app/navigation";

    let { title, width, height, margin, id=title} = $props();
</script>

<!-- svelte-ignore  a11y_no_static_element_interactions-->
 <!-- svelte-ignore a11y_click_events_have_key_events -->
<div
    class="mainContainer"
    style="width: {width}px; height:{height}px; margin:{margin}px"
    onclick={()=>{goto("/book/"+id)}}
>
    {title}
</div>

<style>
    .mainContainer {
        background-color: tomato;
    }
    .mainContainer:hover {
        background-color: turquoise;
        box-shadow: orange 10px 10px 20px;
    }
</style>
