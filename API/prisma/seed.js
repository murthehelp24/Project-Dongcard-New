import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import { prisma } from '../src/lib/prisma.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getRandomPrice = (rarity) => {
  const priceMap = {
    'SP CARD': { min: 2000, max: 5000 },
    'SEC': { min: 800, max: 3500 },
    'SR': { min: 150, max: 600 },
    'L': { min: 100, max: 500 },
    'R': { min: 40, max: 120 },
    'UC': { min: 10, max: 40 },
    'C': { min: 5, max: 15 },
  };

  const range = priceMap[rarity] || { min: 20, max: 100 };
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
};

async function importCSV() {
  const csvFilePath = path.join(__dirname, 'OnePieceTCG_Cards.csv');

  if (!fs.existsSync(csvFilePath)) {
    console.error(`❌ ไม่พบไฟล์ที่: ${csvFilePath}`);
    return;
  }

  const results = [];
  console.log('📖 กำลังอ่านข้อมูลจาก CSV...');

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      console.log(`✅ อ่านเสร็จสิ้น: ${results.length} แถว. กำลังบันทึก...`);

      for (const row of results) {
        try {
          const randomPrice = getRandomPrice(row.card_rarity);
          const randomStock = Math.floor(Math.random() * 30) + 1; 

          await prisma.card.upsert({
            where: { id: row.card_id }, 
            update: {
              price: randomPrice,
              stock: randomStock,
            },
            create: {
              id: row.card_id,
              name: row.card_name,
              rarity: row.card_rarity,
              color: row.card_color,
              type: row.card_type,
              power: row.card_power ? Math.floor(parseFloat(row.card_power)) : null,
              effect: row.card_effect || null,
              image: row.card_image,
              price: randomPrice,
              stock: randomStock,
            },
          });
        } catch (err) {
          console.error(`❌ ข้ามการ์ด ID ${row.card_id}:`, err.message);
        }
      }

      console.log('🚀 นำเข้าข้อมูลและสุ่มราคา/สต็อกสำเร็จ!');
      await prisma.$disconnect();
    });
}

importCSV();
