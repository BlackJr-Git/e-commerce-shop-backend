const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function uploadImage(imagePath) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "sample_folder",
      public_id: "my_image",
      tags: ["profile"],
      transformation: [{ width: 500, height: 500, crop: "fill" }], 
    });
    console.log("Uploaded Image URL:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}

// uploadImage("assets/kids.JPG"); 

module.exports = { uploadImage : uploadImage } 
