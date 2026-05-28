import { prisma } from '../src/lib/prisma.js';
import bcrypt from 'bcrypt';

async function main() {
  console.log('🌱 เริ่มต้นการ Seed ข้อมูล Orders...');

  // 1. สร้าง Users 10 คน
  const users = [];
  const hashedPassword = await bcrypt.hash('123456', 10);

  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.upsert({
      where: { email: `user${i}@example.com` },
      update: {},
      create: {
        username: `User_${i}`,
        email: `user${i}@example.com`,
        password: hashedPassword,
        role: 'USER',
      },
    });
    users.push(user);
  }
  console.log(`✅ สร้าง Users สำเร็จ: ${users.length} คน`);

  // 2. ดึงข้อมูล Cards มา 20 ใบเพื่อใช้สุ่มสั่งซื้อ
  const cards = await prisma.card.findMany({ take: 20 });
  if (cards.length === 0) {
    console.error('❌ ไม่พบข้อมูลการ์ดในระบบ กรุณารัน seed CSV ก่อน');
    return;
  }

  const statuses = ['PENDING', 'PAID', 'SHIPPED', 'CANCELLED'];
  const slipImages = [
    'https://res.cloudinary.com/demo/image/upload/v1625556281/sample.jpg',
    'https://placehold.co/400x600?text=Payment+Slip+Sample+1',
    'https://placehold.co/400x600?text=Payment+Slip+Sample+2',
  ];

  // 3. สร้าง Orders สำหรับแต่ละ User
  for (const user of users) {
    // แต่ละคนซื้อ 1-2 ออเดอร์
    const orderCount = Math.floor(Math.random() * 2) + 1;

    for (let j = 0; j < orderCount; j++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const hasSlip = status === 'PAID' || status === 'SHIPPED';
      
      // สุ่มเลือกการ์ด 1-3 ใบ
      const selectedCards = cards.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
      
      let total = 0;
      const orderItemsData = selectedCards.map(card => {
        const qty = Math.floor(Math.random() * 2) + 1;
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
          address: `ที่อยู่จัดส่งของ ${user.username}: 123/45 ถนนทดสอบ แขวงทดสอบ เขตทดสอบ กรุงเทพฯ 10XXX`,
          paymentSlip: hasSlip ? slipImages[Math.floor(Math.random() * slipImages.length)] : null,
          buyerId: user.id,
          items: {
            create: orderItemsData
          }
        }
      });
    }
  }

  console.log('🚀 Seed ข้อมูล Orders และรายการซื้อขายสำเร็จ!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
