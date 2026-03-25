# 🃏 DONGCARD One Piece Card Shop 


## 🔐 Authentication & Users
| Method | Path | Access | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Public | สมัครสมาชิกใหม่ |
| **POST** | `/api/auth/login` | Public | เข้าสู่ระบบ และรับ JWT Token |

## 🃏 Cards (Catalog & Management)
| Method | Path | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/cards` | Public | ดึงข้อมูลการ์ดทั้งหมด (รองรับ Search & Multi-Filter) |
| **GET** | `/api/cards/:id` | Public | ดูรายละเอียดการ์ดรายใบ |
| **POST** | `/api/admin/cards` | **Admin** | เพิ่มการ์ดใหม่เข้าสต็อก |
| **PUT** | `/api/admin/cards/:id` | **Admin** | แก้ไขข้อมูลการ์ด/ราคา/สต็อก |
| **DELETE** | `/api/admin/cards/:id` | **Admin** | ลบการ์ดออกจากระบบ |

## 📦 Orders (Shopping & Payment)
| Method | Path | Access | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/orders` | **User** | สร้างออเดอร์ (Checkout) และตัดสต็อกสินค้า |
| **GET** | `/api/orders` | **User** | ดูประวัติการสั่งซื้อของตัวเอง |
| **GET** | `/api/orders/:id` | **User/Admin** | ดูรายละเอียดออเดอร์ (รวมรายการสินค้าและสถานะ) |
| **PATCH** | `/api/orders/:id/payment` | **User** | แจ้งโอนเงิน (ส่งลิงก์รูปสลิป) และเปลี่ยนสถานะเป็น PAID |
| **GET** | `/api/admin/orders` | **Admin** | ดูรายการออเดอร์ทั้งหมดในระบบ (เพื่อตรวจสลิป) |
| **PATCH** | `/api/admin/orders/:id/status` | **Admin** | ยืนยันการส่งของ และเปลี่ยนสถานะเป็น SHIPPED |

## ❤️ Wishlist (User Favorites)
| Method | Path | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/wishlist` | **User** | ดึงรายการการ์ดที่ถูกใจทั้งหมดของ User |
| **POST** | `/api/wishlist` | **User** | เพิ่มการ์ดเข้ารายการที่ถูกใจ |
| **DELETE** | `/api/wishlist/:cardId` | **User** | ลบการ์ดออกจากรายการที่ถูกใจ |

---

## 🛠 Search & Multi-Filter Query Params
สามารถใช้ Query String ในการกรองข้อมูลการ์ดได้ที่ `GET /api/cards`:
- `search`: ค้นหาชื่อการ์ด (เช่น `?search=luffy`)
- `color`: กรองตามสี (เช่น `?color=Red`)
- `rarity`: กรองตามระดับความหายาก (เช่น `?rarity=SR`)
- `minPrice` / `maxPrice`: กรองตามช่วงราคา (เช่น `?minPrice=100&maxPrice=500`)


- ถ้าทำทันจะเพิ่มฟีเจอร์ให้ user แก้ไขที่อยู่หรือแก้ไขโปรไฟล์ของตัวเองได้
- ให้เพิ่มฟีเจอร์ ค้นหาสินค้าด้วย ถ้าทำทุกอย่างเสร็จ
