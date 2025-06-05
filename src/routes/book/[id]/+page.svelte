<script lang="ts">
    import { page } from "$app/state";
    import TopBar from "$lib/components/TopBar.svelte";
    import type { BookType } from "$lib/BookType";
    import type { AuthorType } from "$lib/AuthorType";
    import { onMount } from "svelte";
    
    let bookId = page.params.id;
    let bookAuthor = $state({}) as AuthorType


    let book: BookType = $state({
        BookId: -9999,
        Name: "EmptyBook",
        PageCount: -1,
        CurrentPage: -1,
    });



    async function getData() {
        const response = await fetch(
            "http://localhost:5173/api/singleBook?id=" + bookId,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    requestType: "getSingleBook",
                },
            },
        );
        book = await response.json();
    }

    async function getAuthor() {
        const response = await fetch(
            "http://localhost:5173/api/author?authorID=" + book.Author_AuthorId,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    requestType: "getAuthor",
                },
            },
        );
        bookAuthor = await response.json()

    }

    onMount(async () => {
        await getData();
        await getAuthor();
    });
</script>

<TopBar></TopBar>
<h1>{book.Name} by {bookAuthor.FirstName} {bookAuthor.LastName}</h1>

<div class="reihe">
    <img
        src="./test.png"
        alt="Hier Buchbild"
        height="500"
        width="100%"
        style="background-color: rebeccapurple; margin-top:30px"
    />
    <div class="spalte">
        <h1>Titel: {book.Name}</h1>
        <h1>Autor: {bookAuthor.FirstName ?? ""} {bookAuthor.LastName}</h1>
        <h1>Part of series: {book.PartOfSeries ?? "unknown"}</h1>
        <h1>gelesen: {book.TimesRead ?? 0}</h1>
        <h1>aktuelle Seite: {book.CurrentPage} von {book.PageCount}</h1>
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
