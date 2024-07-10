import axios from 'axios';
import service from '../service/api';
const uploadImageToCloudinary = async (imageUrl) => {
  try {
    // Make sure to use the correct Cloudinary URL
    const response = await service.post("/")
    // Return the URL of the uploaded image
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

export default uploadImageToCloudinary;
