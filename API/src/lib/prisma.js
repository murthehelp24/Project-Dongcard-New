import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export { prisma };
 