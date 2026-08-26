import "server-only";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type InvoiceData = {
  orderId: string;
  date: string;
  customer: { name: string; email: string; address: string };
  lines: { name: string; qty: number; unit: string; total: string }[];
  total: string;
  currency: string;
};

export async function buildInvoicePdf(data: InvoiceData): Promise<Buffer> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]); // A4
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(0.118, 0.141, 0.2);
  const muted = rgb(0.42, 0.45, 0.5);
  let y = 800;

  const text = (
    s: string,
    x: number,
    yy: number,
    size = 10,
    f = font,
    color = ink
  ) => page.drawText(s, { x, y: yy, size, font: f, color });

  text("CARTRIDGE CLUB", 40, y, 20, bold);
  text("INVOICE", 470, y, 20, bold);
  y -= 18;
  text("Official game keys — instant email delivery", 40, y, 9, font, muted);
  y -= 40;

  // Seller
  text("Sold by", 40, y, 9, bold, muted);
  text("Billed to", 320, y, 9, bold, muted);
  y -= 14;
  const seller = [
    "ALDERROCK LTD",
    "Company No. 17381132",
    "Dept 6984, 196 High Road",
    "Wood Green, London, N22 8HH",
    "United Kingdom",
    "info@cartridge-club.com",
  ];
  const buyer = [
    data.customer.name,
    data.customer.email,
    ...data.customer.address.split("\n"),
  ];
  const rows = Math.max(seller.length, buyer.length);
  for (let i = 0; i < rows; i++) {
    if (seller[i]) text(seller[i], 40, y - i * 13, 9);
    if (buyer[i]) text(buyer[i], 320, y - i * 13, 9);
  }
  y -= rows * 13 + 24;

  text(`Invoice / Order:  ${data.orderId}`, 40, y, 10, bold);
  text(`Date:  ${data.date}`, 320, y, 10, bold);
  y -= 28;

  // Table header
  page.drawRectangle({ x: 40, y: y - 4, width: 515, height: 22, color: rgb(0.96, 0.94, 0.9) });
  text("Item", 46, y + 2, 9, bold);
  text("Qty", 360, y + 2, 9, bold);
  text("Unit", 410, y + 2, 9, bold);
  text("Total", 500, y + 2, 9, bold);
  y -= 26;

  for (const l of data.lines) {
    const name = l.name.length > 52 ? l.name.slice(0, 51) + "…" : l.name;
    text(name, 46, y, 9);
    text(String(l.qty), 360, y, 9);
    text(l.unit, 410, y, 9);
    text(l.total, 500, y, 9);
    y -= 18;
  }

  y -= 8;
  page.drawLine({ start: { x: 40, y }, end: { x: 555, y }, thickness: 1, color: muted });
  y -= 20;
  text("Total paid", 410, y, 11, bold);
  text(data.total, 500, y, 11, bold);
  y -= 40;

  text("Merchant of Record: ALDERROCK LTD.", 40, y, 8, font, muted);
  y -= 12;
  text(
    "Digital goods (game keys) are delivered instantly by email and are exempt from standard return periods once revealed.",
    40,
    y,
    8,
    font,
    muted
  );

  const bytes = await doc.save();
  return Buffer.from(bytes);
}
