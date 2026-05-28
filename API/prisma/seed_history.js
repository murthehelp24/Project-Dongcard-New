import { prisma } from '../src/lib/prisma.js';

async function main() {
  console.log('📊 เริ่มต้นการ Seed ข้อมูลยอดขาย 100 ออเดอร์...');

  // 1. ดึง Users และ Cards ที่มีอยู่
  const users = await prisma.user.findMany();
  const cards = await prisma.card.findMany();

  if (users.length === 0 || cards.length === 0) {
    console.error('❌ ไม่พบข้อมูล User หรือ Card กรุณารัน Seed ก่อนหน้าก่อน');
    return;
  }

  const statuses = ['PAID', 'SHIPPED', 'PAID', 'SHIPPED', 'PENDING', 'CANCELLED']; // เน้น PAID/SHIPPED เพื่อให้ยอดขายขึ้น
  const slipImages = [
    'https://res.cloudinary.com/demo/image/upload/v1625556281/sample.jpg',
    'https://placehold.co/400x600?text=Payment+Slip+Sample'
  ];

  console.log(`⏳ กำลังสร้าง 100 ออเดอร์...`);

  for (let i = 0; i < 100; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const hasSlip = ['PAID', 'SHIPPED'].includes(status);
    
    // สุ่มวันที่ย้อนหลัง 14 วัน
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 14));
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

    // สุ่มการ์ด 1-4 ใบ
    const selectedCards = cards.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 1);
    
    let total = 0;
    const orderItemsData = selectedCards.map(card => {
      const qty = Math.floor(Math.random() * 3) + 1;
      total += card.price * qty;
      return {
        cardId: card.id,
        quantity: qty,
        soldPrice: card.price
      };
    });

    await prisma.order.create({
      data: {
        status: status,
        total: total,
        address: `ที่อยู่จำลองของ ${user.username} สำหรับการทดสอบระบบกราฟ`,
        paymentSlip: hasSlip ? slipImages[Math.floor(Math.random() * slipImages.length)] : null,
        buyerId: user.id,
        createdAt: date,
        updatedAt: date,
        items: {
          create: orderItemsData
        }
      }
    });

    if ((i + 1) % 20 === 0) console.log(`✅ สร้างเสร็จแล้ว ${i + 1} ออเดอร์...`);
  }

  console.log('🚀 สร้างข้อมูลยอดขาย 100 ออเดอร์ย้อนหลังสำเร็จ! ลองไปดูกราฟได้เลยครับ');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
