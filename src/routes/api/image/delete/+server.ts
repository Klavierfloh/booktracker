// src/routes/api/book/+server.ts
import db from '$lib/server/db.js';
import { error } from '@sveltejs/kit';
import fs from "fs"

export const DELETE = async ({ url, request }) => {
  const authHeader = request.headers.get("requestType");

  if (authHeader !== "deleteImage") {
    return new Response(JSON.stringify({ message: "Permission Denied" }), { status: 401 });
  }

  const imageName = url.searchParams.get("name");
  if (!imageName) {
    return new Response(JSON.stringify({ message: "image not found: " + imageName }), { status: 400 });
  }

  try {
    fs.rm("/src/lib/uploads/"+imageName , (err)=>{
        console.log(err)
    })

    return new Response(JSON.stringify({ message: "Image deleted successfully" }), { status: 200 });
  } catch (err) {
    console.error("Failed to delete Image:", err);
    throw error(500, "Internal Server Error");
  }
};
