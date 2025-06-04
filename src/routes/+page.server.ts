import { error } from '@sveltejs/kit';
import db from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

  const stmt = db.prepare('Select * from Book');
  const item = stmt.all();

  if (!item) {
  throw error(404, `No Items found`);
}
    console.log("loading all books")


  return {
    item
  };
}
