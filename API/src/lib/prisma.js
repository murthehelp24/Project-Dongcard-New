import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import prismaPkg from '../generated/prisma/index.js';
const { PrismaClient } = prismaPkg;

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export { prisma };