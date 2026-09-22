import { writeFileSync } from "node:fs";
import { buildInvoicePdf } from "../src/lib/invoice";

async function main() {
  const pdf = await buildInvoicePdf({
    orderId: "cc_ord_9f3k2m81",
    date: new Date().toLocaleDateString("en-GB"),
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      address: "12 Baker Street\nLondon, NW1 6XE\nUnited Kingdom",
    },
    lines: [
      { name: "Elden Ring — Steam Key (EU)", qty: 1, unit: "£44.99", total: "£44.99" },
      { name: "Hades II — Steam Key (Global)", qty: 1, unit: "£24.50", total: "£24.50" },
    ],
    total: "£69.49",
    currency: "GBP",
  });
  writeFileSync("example-invoice.pdf", pdf);
  console.log("Written example-invoice.pdf");
}

main();
