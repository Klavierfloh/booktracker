<script lang="ts">
    import TopBar from "$lib/components/TopBar.svelte";

    let title = $state("");

    let author = $state("");

    let partOfSeries: boolean | undefined | null = $state(false);
</script>

<TopBar></TopBar>

<div class="form">
    <input type="text" placeholder="title" />

    <input type="text" placeholder="author" />

    <div>
        Ist es Teil einer Reihe:
        <input
            type="checkbox"
            title="partOfSeries"
            placeholder="title"
            bind:checked={partOfSeries}
        />
    </div>

    {#if partOfSeries == true}
        <input type="number" title="welcher Teil" placeholder="welcher Teil" />
    {/if}

    <input type="number" placeholder="Seitenzahl">

    <input type="number" placeholder="Wie oft schon gelesen">

    <div>
        Coverbild:
        <input type="file" title="Coverbild">    
    </div>
    <button>Hinzufügen</button>
</div>

<style>
    .form {
        display: flex;
        flex-direction: column;
        *{
            margin:5px;
        }
    }
    input {
        max-width: 25%;
    }
    button{
        max-width: 25%;
    }
</style>
