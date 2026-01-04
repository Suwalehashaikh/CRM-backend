import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dlkjqugzf",
  api_key:"784314328476914",
  api_secret: "MB5XrYHGlF6cSUWxBQbbk1CyX3o",
});

// Multer Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "test-23-dec",
    format:async(req,file)=>{
        //auto-detect format[jpeg,png,webp]
        return file.mimetype.split("/")[1]
    },
    public_id: (req, file) => {
      const uniqueName = Date.now() +"_" + file.originalname;
      return uniqueName
    }
  },
});

// Export upload middleware
export const upload = multer({ storage });

export default cloudinary;
