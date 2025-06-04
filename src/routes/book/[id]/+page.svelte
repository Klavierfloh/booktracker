<script lang="ts">
    import { page } from "$app/state";
    import TopBar from "$lib/components/TopBar.svelte";
    import type { BookType } from "$lib/BookType";
    export let data:{item:BookType};
    console.log(data)
    let id = page.params.id;

    /* Dann irgendwie sowas:
    let book = await fetch(../book/id) */

</script>

<TopBar></TopBar>
<h1>Data für {id}: {data}</h1>
<h2>{data.item.BookId}</h2>

<div class="reihe">
    <img src="./test.png" alt="Hier Buchbild" height="500" width="100%" style="background-color: rebeccapurple; margin-top:30px" />
    <div class="spalte">
        <h1>Titel: {data.item.Name}</h1>
        <h1>Autor: {data.item.Author_AuthorId ?? "unknown"}</h1>
        <h1>Part of series: {data.item.PartOfSeries ?? "unknown"}</h1>
        <h1>gelesen: {data.item.TimesRead?? 0}</h1>
        <h1>aktuelle Seite: {data.item.CurrentPage} von {data.item.PageCount}</h1>
    </div>
</div>



<style>
    .spalte {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
        width: 100%;
    }
    .reihe {
        display: flex;
        flex-direction: row;
        align-items: center;
        align-content: center;
    }
</style>
