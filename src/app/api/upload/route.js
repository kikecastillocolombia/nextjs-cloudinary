import { NextResponse } from "next/server";
import {writeFile} from 'fs/promises'
import path, { resolve } from "path";
import { v2 as cloudinary } from 'cloudinary';



    // Configuration
    cloudinary.config({ 
        cloud_name: 'dmnjxgc8s', 
        api_key: '922727786575569', 
        api_secret: 'twmbR_BAZjJva0rU84etVYy7d18' 
    });



export async function POST(request){
    const data = await request.formData()
    const image = data.get('image')

    if (!image) {
        return NextResponse.json('No se ha subido ninguna imagen', {status:400})
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    //guardar en un archivo
    //const filePath = path.join(process.cwd(), 'src', image.name)
    //await writeFile(filePath, buffer)

    const response = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (err,result) => {
            if (err) {
                reject(err)
            }
            resolve(result);
        }).end(buffer)
        
    })

    return NextResponse.json({
        message: "imagen subida",
        url: response.secure_url
    })

    //guardar en db
}