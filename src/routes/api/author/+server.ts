import { error } from '@sveltejs/kit';

import db from '$lib/server/db.js'

export const GET = ({ url, request }) => {
    const authHeader = request.headers.get("requestType")
    console.log("Auth Header: "+authHeader)
    const requestedAuthorId = url.searchParams.get("authorID")

    if (authHeader != "getAuthor"){
        console.log("Invalid Request on author")
        return new Response(JSON.stringify({message:"Permission Denied"}), {status: 401})
    }

    const stmt = db.prepare('SELECT LastName, FirstName FROM Author WHERE AuthorId = ?');
const item = stmt.get(requestedAuthorId);


    console.log(item)

    if (!item) {
        throw error(404, `Author not found: ` + requestedAuthorId);
    }

    return new Response(JSON.stringify(item), { status: 200 })
} 