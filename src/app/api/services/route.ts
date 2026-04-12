import { NextResponse } from "next/server";

const services = [
  { slug: "teeth-whitening", name: "Teeth Whitening", category: "Cosmetic", price: "₹8,000 – ₹15,000", description: "Laser-guided whitening for a brighter smile." },
  { slug: "porcelain-veneers", name: "Porcelain Veneers", category: "Cosmetic", price: "₹18,000/tooth", description: "Masterfully crafted veneers." },
  { slug: "dental-implants", name: "Dental Implants", category: "Restorative", price: "₹25,000+", description: "Titanium precision for lifelong durability." },
  { slug: "invisalign", name: "Invisalign", category: "Orthodontics", price: "₹1,20,000+", description: "Invisible alignment therapy." },
  { slug: "root-canal", name: "Root Canal", category: "Restorative", price: "₹6,000+", description: "Pain-free endodontic care." },
  { slug: "smile-makeover", name: "Smile Makeover", category: "Cosmetic", price: "Custom", description: "Holistic facial aesthetic approach." },
];

export async function GET() {
  return NextResponse.json({ services });
}
