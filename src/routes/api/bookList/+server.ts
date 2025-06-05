import { API_KEY } from '$env/static/private'
import { error } from '@sveltejs/kit';

import db from '$lib/server/db.js'

export const GET = ({ request }) => {
    const authHeader = request.headers.get("requestType")
    console.log("Auth Header: "+authHeader)

    if (authHeader != "getBooksList"){
        console.log("Invalid Request on bookList")
        return new Response(JSON.stringify({message:"Permission Denied"}), {status: 401})
    }

    const stmt = db.prepare('SELECT * FROM Book');
    const item = stmt.all();

    if (!item) {
        throw error(404, `No Books were found`);
    }

    return new Response(JSON.stringify(item), { status: 200 })
} 