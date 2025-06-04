import { error } from '@sveltejs/kit';
import db from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const { id } = params;

  const stmt = db.prepare('SELECT * FROM Book WHERE BookId = ?');
  const item = stmt.get(id);

  if (!item) {
  throw error(404, `Item with id '${id}' not found`);
}
    console.log(item);


  return {
    item
  };
}
