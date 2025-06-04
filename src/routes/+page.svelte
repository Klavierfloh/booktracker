<script lang="ts">
    import { onMount } from "svelte";
    import Book from "./Book.svelte";
    import TopBar from "../lib/components/TopBar.svelte";
    import type { BookType } from "$lib/BookType";

    let data = $props()
    console.log(data)
    console.log(data.data.item)

    let widthBook = $state(80);
    let heightBook = $state(120);
    let margin = 10;

    let maxWidthInBooks = 10;
    let windowWidth: number = 0;

    function updateWindowWidth() {
        windowWidth = window.innerWidth;
    }

    function onKeyDown(e:KeyboardEvent){
        console.log(e.key)
        if (e.key == "+"){
            widthBook *= 4/5
            heightBook *= 4/5
        }
        if (e.key == "-"){
            widthBook /= 4/5
            heightBook /= 4/5
        }
    }

    onMount(() => {
        windowWidth = window.innerWidth;
        window.addEventListener("resize", updateWindowWidth);
        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("resize", updateWindowWidth);
            window.removeEventListener("keydown", onKeyDown);
        };
    });

    $effect(() => {
        maxWidthInBooks = Math.ceil(windowWidth / (widthBook + margin * 2)) - 1;
        console.log(maxWidthInBooks);
        spalten = chunkArray(books, maxWidthInBooks);
    });


    let books: Array<BookType> = data.data.item;

    function chunkArray<T>(array: T[], chunkSize: number): T[][] {
        let result: T[][] = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    }

    let spalten: Array<Array<BookType>> = $state(
        chunkArray(books, maxWidthInBooks),
    );
</script>

<div class="flexOuter">
    <TopBar></TopBar>

    <div class="reihe">
        {#each spalten as spalte}
            <div class="flexInner">
                {#each spalte as buch}
                    <Book {margin} width={widthBook} height={heightBook} title={buch.Name} id={buch.BookId}
                    ></Book>
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
    .flexOuter {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .flexInner {
        display: flex;
    }
    .reihe {
        display: flex;
        flex-direction: column;
    }
</style>


