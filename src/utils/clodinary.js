import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLODINARY_CLOUD_NAME, 
        api_key: process.env.CLODINARY_API_KEY, 
        api_secret: process.env.CLODINARY_API_SECRET
    });

    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if(!localFilePath) return null;

            const response = await cloudinary.uploader.upload(
                localFilePath, {
                resource_type: "auto"
                })

            console.log("file is uploaded on cloudinary ", response.url);
            return response;

        } catch(err) {
            fs.unlinkSync(localFilePath) //remove the locally saved temp file as the upload operation failed
            return null
        }
    }
    
  
 export {uploadOnCloudinary}


