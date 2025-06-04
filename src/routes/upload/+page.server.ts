import { fail } from '@sveltejs/kit';
import { writeFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());

        if (
            !(formData.fileToUpload as File).name ||
            (formData.fileToUpload as File).name === 'undefined'
        ) {
            return fail(400, {
                error: true,
                message: 'You must provide a file to upload'
            });
        }

        const { fileToUpload } = formData as { fileToUpload: File };
        const newFileName = uuidv4() + "." + fileToUpload.name.split(".").pop();
        writeFileSync(`static/uploads/${newFileName}`, Buffer.from(await fileToUpload.arrayBuffer()));
        console.log("uploaded image sucessfully")
        return {
            success: true,
            filePath: "/uploads/"+newFileName
        };
    }
};