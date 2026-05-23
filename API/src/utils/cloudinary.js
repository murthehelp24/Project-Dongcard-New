import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (path, folder = "dongcard") => {
  try {
    if (!path) return null;
    
    const result = await cloudinary.uploader.upload(path, {
      resource_type: "auto",
      folder: folder,
    });
    
    // ลบไฟล์ในเครื่องออกหลังจากอัพโหลดขึ้น Cloudinary สำเร็จ
    await fs.unlink(path).catch(err => console.error("ลบไฟล์ Local ไม่สำเร็จ:", err));
    
    return result.secure_url;
  } catch (error) {
    // ถ้าอัพโหลดไม่สำเร็จ ก็ควรลบไฟล์ Local ทิ้งด้วยเพื่อไม่ให้รก
    if (path) {
      await fs.unlink(path).catch(err => console.error("ลบไฟล์ Local ไม่สำเร็จ (Error Case):", err));
    }
    throw error;
  }
};

export default cloudinaryUpload;
