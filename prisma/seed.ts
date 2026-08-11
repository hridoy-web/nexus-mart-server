import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const categoryNames = [
    "Mobiles",
    "Laptops",
    "Gadgets",
    "Audio",
    "Gaming",
    "Monitors",
    "Cameras",
    "Accessories",
  ];

  for (const name of categoryNames) {
    await prisma.category.create({
      data: { name },
    });
  }

  console.log("categories added");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });