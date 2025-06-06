import { error, json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';

export const POST = async ({ request }) => {
	try {
		const formData = await request.formData();
        const auth = request.headers.get
		const file = formData.get('image') as File;
        const authHeader = request.headers.get("requestType")

		if (!file) {
			throw error(400, 'No image provided');
		}

        if (authHeader !== "uploadImage"){
            return new Response(JSON.stringify({message:"Access Denied"}), {status: 401})
        }

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		// Ensure uploads directory exists
		const uploadDir = path.resolve('src/lib/uploads');
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}

		// Save the file
        let name = v4() + "." + (file.name).split(".").pop()  as string
		const filePath = path.join(uploadDir, name) ;
		fs.writeFileSync(filePath, buffer);

		return json({ message: 'Upload successful', filename: name });
	} catch (err) {
		console.error('Upload error:', err);
		throw error(500, 'Failed to upload image');
	}
};
