<script lang="ts">
    import { page } from "$app/state";
    import TopBar from "$lib/components/TopBar.svelte";
    import type { BookType } from "$lib/BookType";
    import type { AuthorType } from "$lib/AuthorType";
    import { onMount } from "svelte";

    let bookId = page.params.id;
    let bookAuthor = $state({}) as AuthorType;

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
        bookAuthor = await response.json();
    }

    let uploadsPath = "../../static/uploads/";
    let coverName = "standard.png";

    onMount(async () => {
        await getData();
        await getAuthor();
    });
</script>

<TopBar></TopBar>
<h1>{book.Name} by {bookAuthor.FirstName} {bookAuthor.LastName}</h1>

<div class="reihe">
    <div class="imgContainer">
        <img
            src={book.Cover
                ? "/src/lib/uploads/" + book.Cover
                : "/src/lib/uploads/standard.png"}
            alt="Hier Buchbild"
        />
    </div>
    <div class="spalte">
        <h1>Titel: {book.Name}</h1>
        <h1>Autor: {bookAuthor.FirstName ?? ""} {bookAuthor.LastName}</h1>
        <h1>Part of series: {book.PartOfSeries ?? "unknown"}</h1>
        <h1>gelesen: {book.TimesRead ?? 0}</h1>
        <h1>aktuelle Seite: {book.CurrentPage} von {book.PageCount}</h1>
    </div>
</div>

<style>
    .imgContainer {
        width:30vw; 
    }
    img {
        max-width: 100%;
    }
    .spalte {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
    }
    .reihe {
        display: flex;
        flex-direction: row;
        align-items: center;
        align-content: center;
    }
</style>
