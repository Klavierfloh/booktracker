<script lang="ts">
    import TopBar from "$lib/components/TopBar.svelte";
    import type { AuthorType } from "$lib/AuthorType";
    import { onMount } from "svelte";
    import { error } from "@sveltejs/kit";

    let authors: Array<AuthorType> = $state([]);

    type BookInput = {
        title: string;
        author: string;
        partOfSeries: boolean;
        seriesPart?: number;
        pageCount: number;
        timesRead: number;
        coverFile?: File | null;
    };

    let book = $state<BookInput>({
        title: "",
        author: "",
        partOfSeries: false,
        seriesPart: undefined,
        pageCount: 0,
        timesRead: 0,
        coverFile: null,
    });

    let addNewAuthor: boolean = $state(false);

    function handleFileChange(e: Event) {
        const target = e.target as HTMLInputElement;
        book.coverFile = target.files?.[0] ?? null;
    }

    function submitBook(e:Event) {
         e.preventDefault();
        const [firstName, ...rest] = book.author.trim().split(" ");
        const lastName = rest.join(" ");
        const authTypeChek: AuthorType = {
            FirstName: firstName,
            LastName: lastName,
        };
        console.log(authTypeChek);
        if (
            !authors.some(
                // ist es ein Autor, der schon in der Datenbank ist?
                (author) =>
                    author.FirstName === authTypeChek.FirstName &&
                    author.LastName === authTypeChek.LastName,
            )
        ) {
            return error(408, "Not an author");
        } else {
            //ersetzt den String durch die richtige ID
            const matchedAuthor = authors.find(
                (author) =>
                    author.FirstName === authTypeChek.FirstName &&
                    author.LastName === authTypeChek.LastName,
            );

            if (matchedAuthor) {
                book.author = matchedAuthor.AuthorId as string;
            }
        }

        console.log("Saving book:", $state.snapshot(book));
    }

    async function getAuthors() {
        const response = await fetch("http://localhost:5173/api/authorList", {
            method: "GET",
            headers: {
                Accept: "application/json",
                requestType: "getAuthorList",
            },
        });

        authors = await response.json();
    }

    onMount(async () => {
        await getAuthors();
    });
</script>

<TopBar />

<datalist id="authors">
    {#each authors as a}
        <option>{a.FirstName} {a.LastName}</option>
    {/each}
</datalist>

<div style="display: flex; flex-direction:row; align-content:center; flex-">
    <form class="form">
        <input
            type="text"
            required
            placeholder="title"
            bind:value={book.title}
        />

        <input
            required
            type="text"
            list="authors"
            placeholder="author"
            bind:value={book.author}
        />
        <input type="checkbox" bind:checked={addNewAuthor} />

        <div>
            <label for="ser">Is Part Of Series</label>
            <input
                type="checkbox"
                name="ser"
                bind:checked={book.partOfSeries}
            />
        </div>
        {#if book.partOfSeries}
            <input
                type="number"
                placeholder="welcher Teil"
                bind:value={book.seriesPart}
            />
        {/if}

        <div>
            <label for="num">Number of Pages: </label>
            <input
                min="0"
                required
                name="num"
                type="number"
                placeholder="Seitenzahl"
                bind:value={book.pageCount}
            />
        </div>

        <div>
            <label for="read">How often read: </label><input
                min="0"
                name="read"
                type="number"
                placeholder="Wie oft schon gelesen"
                bind:value={book.timesRead}
            />
        </div>

        <div>
            Coverbild:
            <input type="file" accept="image/*" onchange={handleFileChange} />
        </div>

        <button type="submit" onsubmit={submitBook}>Hinzufügen</button>
    </form>

    {#if addNewAuthor}
        <div>
            <span>Hier später Autor hinzufügen</span>
        </div>
    {/if}
    </div>

<style>
    .form {
        display: flex;
        flex-direction: column;
    }
    .form > * {
        margin: 5px;
    }
    input {
        width: 100%;
    }
</style>
