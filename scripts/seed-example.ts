/**
 * Creates the sample customer and the sample order used to document the
 * purchase flow and the back office (see docs/payally).
 *
 * Only runs against a local database:
 *   DATABASE_URL=postgresql://user@127.0.0.1:5433/ccdemo node scripts/seed-example.ts
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const CUSTOMER_PASSWORD = "Shopper!2026";
const ADMIN_PASSWORD = "BackOffice!2026";

async function main() {
  if (!process.env.DATABASE_URL?.includes("127.0.0.1")) {
    throw new Error("Refusing to seed: DATABASE_URL is not a local database.");
  }

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.balanceTransaction.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.emailVerificationToken.deleteMany();
  await prisma.user.deleteMany();

  const customer = await prisma.user.create({
    data: {
      email: "oliver.bennett@example.com",
      passwordHash: await bcrypt.hash(CUSTOMER_PASSWORD, 10),
      firstName: "Oliver",
      lastName: "Bennett",
      phone: "+44 7700 900142",
      dateOfBirth: "1991-04-18",
      street: "12 Baker Street",
      city: "London",
      country: "United Kingdom",
      postalCode: "NW1 6XE",
      balance: 60,
      emailVerified: true,
    },
  });

  await prisma.user.create({
    data: {
      email: "admin@cartridge-club.com",
      passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 10),
      firstName: "Back",
      lastName: "Office",
      phone: "+44 7822 016861",
      dateOfBirth: "1985-01-01",
      street: "Dept 6984, 196 High Road",
      city: "Wood Green, London",
      country: "United Kingdom",
      postalCode: "N22 8HH",
      balance: 0,
      emailVerified: true,
    },
  });

  // Card-paid order, fulfilled by the supplier and delivered by email. It
  // matches the item used in the checkout screenshots.
  const order = await prisma.order.create({
    data: {
      userId: customer.id,
      total: 6.45,
      currency: "GBP",
      status: "delivered",
      kinguinOrderId: "KNG-7391204",
      items: {
        create: [
          {
            productId: "5c9b5eab2539a4e8f172143e",
            name: "Anno 2070 Ubisoft Connect CD Key",
            qty: 1,
            price: 6.45,
            keys: JSON.stringify(["A2070-9PLMD-4KRVN"]),
          },
        ],
      },
    },
  });

  await prisma.balanceTransaction.create({
    data: {
      userId: customer.id,
      amount: 60,
      type: "topup",
      description: "Top-up £51.00 GBP",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26),
    },
  });

  console.log("Seeded example data.");
  console.log(`  customer: ${customer.email} / ${CUSTOMER_PASSWORD}`);
  console.log(`  admin:    admin@cartridge-club.com / ${ADMIN_PASSWORD}`);
  console.log(`  order:    ${order.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
