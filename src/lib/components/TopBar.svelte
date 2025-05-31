<script>
    import { goto } from "$app/navigation";
</script>

<div class="bar">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="menuButton"
        onclick={() => {
            goto("/");
        }}
    >
        <h1>H</h1>
    </div>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="addBookButton"
        onclick={() => {
            goto("/addBook");
        }}
    >
        <h2>Add</h2>
    </div>
</div>

<style>
    .bar {
        width: 100%;
        height: 35px;
        background-color: green;
        position: sticky;
        align-items:flex-end;
        display: flex;
        top: 0;
    }
    .menuButton {
        background-color: wheat;
        display: flex;
        align-items: center;
        justify-content: center;
        x: 100% - 35px;
        y: 0;
        width: 35px;
        height: 100%;
        margin-right: 20px;

    }
    .menuButton:hover {
        background-color: white;
    }

    .addBookButton {
        background-color: wheat;
        display: flex;
        align-items: center;
        justify-content: center;
        x: 100% - 35px;
        y: 0;
        width: 35px;
        height: 100%;

    }
    .addBookButton:hover {
        background-color: white;
    }
</style>
