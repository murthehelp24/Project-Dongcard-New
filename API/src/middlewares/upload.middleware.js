import multer from 'multer'
import path from 'path'
import fs from 'fs'

// ตั้งค่าการเก็บไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = 'upload/'; // ตรวจสอบว่าชื่อนี้ตรงกับที่ตั้งไว้ไหม
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true }); // ถ้าไม่มีโฟลเดอร์ ให้สร้างขึ้นมาใหม่
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    //ตั้งชื่อไฟล์
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('กรุณาอัปโหลดเฉพาะไฟล์รูปภาพ'), false)
  }
}

const upload = multer({ storage, fileFilter })

export default upload