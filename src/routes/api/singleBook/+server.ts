import { error } from '@sveltejs/kit';
import { highestBookId } from '$lib/store.js';

import db from '$lib/server/db.js'
import { BookDashed } from '@lucide/svelte';

let newBookId = 0

highestBookId.subscribe(value => newBookId = value)


export const GET = ({ url, request }) => {
    const authHeader = request.headers.get("requestType")
    const requestedID = url.searchParams.get("id")

    console.log("reqestedID: " + requestedID)
    console.log("Auth Header: " + authHeader)

    if (authHeader != "getSingleBook") {
        console.log("Invalid Request on singleBook")
        return new Response(JSON.stringify({ message: "Permission Denied" }), { status: 401 })
    }

    const stmt = db.prepare('SELECT * FROM Book WHERE BookId=' + requestedID);
    const item = stmt.get();

    console.log(item)
    if (!item) {
        throw error(404, `Book not found: ` + requestedID);
    }

    return new Response(JSON.stringify(item), { status: 200 })
}

export const POST = async ({ request }) => {
    const authHeader = request.headers.get("requestType")
    const body = await request.json();

    console.log(body)

    newBookId += 1
    highestBookId.set(newBookId)

    db.prepare(`
  INSERT OR IGNORE INTO Book (
    BookId,
    PartOfSeries,
    PageCount,
    TimesRead,
    Cover,
    Name,
    CurrentPage,
    Author_AuthorId
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`).run(
        newBookId,
        body.partOfSeries ? 1 : 0,
        body.pageCount,
        body.timesRead,
        body.coverFile ?? "standard.png",
        body.title,
        body.currentPage ?? 0,
        parseInt(body.author)
    );

    return new Response(JSON.stringify("posted succesfully"), { status: 200 })
}
