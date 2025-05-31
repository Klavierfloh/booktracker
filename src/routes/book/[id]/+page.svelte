<script lang="ts">
    import { page } from "$app/state";
    import TopBar from "$lib/components/TopBar.svelte";
    import type { BookType } from "$lib/BookType";
    let id = page.params.id;

    /* Dann irgendwie sowas:
    let book = await fetch(../book/id) */

    let book: BookType = { title: "Testbuch", pages: 204, currentPage: 10 };
</script>

<TopBar></TopBar>

<div class="reihe">
    <img src="./test.png" alt="Hier Buchbild" height="500" width="100%" style="background-color: rebeccapurple; margin-top:30px" />
    <div class="spalte">
        <h1>Titel: {book.title}</h1>
        <h1>Autor: {book.author ?? "unknown"}</h1>
        <h1>Part of series: {book.partOfSeries ?? "unknown"}</h1>
        <h1>wich part: {book.wichPartOfSeries ?? "unknown"}</h1>
        <h1>gelesen: {book.timesRead ?? 0}</h1>
        <h1>aktuelle Seite: {book.currentPage} von {book.pages}</h1>
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
