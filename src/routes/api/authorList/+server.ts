import { error } from '@sveltejs/kit';

import db from '$lib/server/db.js'

export const GET = ({ url, request }) => {
    const authHeader = request.headers.get("requestType")
    console.log("Auth Header: " + authHeader)

    if (authHeader != "getAuthorList") {
        console.log("Invalid Request on author")
        return new Response(JSON.stringify({ message: "Permission Denied" }), { status: 401 })
    }

    const stmt = db.prepare('SELECT AuthorId, LastName, FirstName FROM Author');
    const item = stmt.all();


    console.log(item)

    if (!item) {
        throw error(404, `No Authors found!`);
    }

    return new Response(JSON.stringify(item), { status: 200 })
} 