import ImageKit from "imagekit"
import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import path from "path"

const uploadOnCloudinary = async (file) => {
    if (!file) return null

    // 1. Check ImageKit Configuration (Primary)
    const hasImageKit =
        process.env.IMAGEKIT_PUBLIC_KEY &&
        process.env.IMAGEKIT_PRIVATE_KEY &&
        process.env.IMAGEKIT_URL_ENDPOINT

    if (hasImageKit) {
        try {
            const imagekit = new ImageKit({
                publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
                privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
                urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
            })
            const fileBuffer = fs.readFileSync(file)
            const uploadResponse = await imagekit.upload({
                file: fileBuffer,
                fileName: path.basename(file),
            })
            try {
                fs.unlinkSync(file)
            } catch (e) {}
            return uploadResponse.url
        } catch (error) {
            console.warn("[ImageKit] Upload failed, trying alternatives:", error.message || error)
        }
    }

    // 2. Check Cloudinary Configuration (Secondary)
    const hasCloudinary =
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET

    if (hasCloudinary) {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        try {
            const result = await cloudinary.uploader.upload(file)
            try {
                fs.unlinkSync(file)
            } catch (unlinkErr) {}
            return result.secure_url
        } catch (error) {
            console.warn("[Cloudinary] Upload failed, falling back to local file storage:", error.message || error)
        }
    }

    // 3. Fallback: use locally stored file from the public folder
    const filename = path.basename(file)
    const port = process.env.PORT || 5000
    return `http://localhost:${port}/public/${encodeURIComponent(filename)}`
}

export default uploadOnCloudinary