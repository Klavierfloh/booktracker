<script lang="ts">
    import { goto } from "$app/navigation";
    import { HomeIcon, PlusIcon } from "@lucide/svelte";
</script>

<div class="fixed top-1 h-9 bg-green-500 flex-column w-[90%] flex rounded-2xl pl-3 align-center ">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="button"
        onclick={() => {
            goto("/");
        }}
    >
        <HomeIcon />
    </div>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="button"
        onclick={() => {
            goto("/addBook");
        }}
    >
        <PlusIcon />
    </div>
</div>

<style>
    .bar {
        width: 100%;
        align-items: flex-end;
        display: flex;
        top: 0;
    }

    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        max-width: 100%;
        max-height: 100%;
        padding: 0;
        font-size: 12px;
        background-color: transparent;
        border: 2px solid black; /* Bootstrap Primary */
        color: red;
        cursor: pointer;
        border-radius: 4px;
        transition:
            background-color 0.3s,
            color 0.3s;
    }

    .button:hover {
        background-color: #0d6efd;
        color: white;
    }

    .button:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.5);
    }
</style>
