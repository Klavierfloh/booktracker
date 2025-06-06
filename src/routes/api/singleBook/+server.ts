import { error } from '@sveltejs/kit';

import db from '$lib/server/db.js'

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


    if (!item) {
        throw error(404, `Book not found: ` + requestedID);
    }

    return new Response(JSON.stringify(item), { status: 200 })
} 

export const POST = ({request})=>{

    return new Response(JSON.stringify("posted succesfully"), {status:200})
}