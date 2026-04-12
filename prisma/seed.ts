import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing
  await prisma.doctor.deleteMany();
  await prisma.service.deleteMany();

  // Seed Doctors
  const d1 = await prisma.doctor.create({
    data: {
      name: "Dr. Sarah Mitchell",
      specialization: "Lead Cosmetic Surgeon",
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0r9h1AOjUkdUwvuzbtdIUR3PJ9U8zM6NAxphHA6esvkkockLxHGMOo4nVoDKGcWyt1A6CTDUHe_nTkyaPZaPzkNNylVxd0rebvgjWAWTM0zjS9Uh_RXW684MiCZ3Q71LKHNV_MDLmM6XGMdcgJ--w2EUz0njr11twLPa0Kae6EGSv7ZfMzKP-3gz5wKZZuOs1WFNVHA_JXPU9zrlNLzb0nWQYcC4hTVdaCiUzngyrTE5tieci75incnmJ1plFg4ne13uDAN5a0mRE",
      bio: "Master of aesthetic facial balance and dental restoration.",
      experience: 15,
      qualifications: ["BDS", "MDS", "AAID Member"]
    }
  });

  const d2 = await prisma.doctor.create({
    data: {
      name: "Dr. James Chen",
      specialization: "Master Implantologist",
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSzzm5kTZ4nFxNx0zezmFb-_JiCkKsICeKvWiYPjl4FXs4V0LXsLlw9on0QmixcD4WNIRarV2NKHJIzmyBbKZc9QwCuYurmwX3AMubus1X7k80ch3xtS0ubNkNCY2HHNJsI7XUstQ5qJrrsjodNvGvoY14ItZ9wz7iuNQF_w92EVFMZTPtyFk9jDDRmfdDDdnkRo_lAXkqGYSqOTdbXBK8VHiopLezc4GBCLkobl9VUDMAqg8ha6mtKGyK7DK2YNZN1Xmpyx3scydr",
      bio: "Pioneer in 3D-guided surgical implant technology.",
      experience: 12,
      qualifications: ["DDS", "PhD Oral Surgery"]
    }
  });

  // Seed Services
  const services = [
    { name: "Teeth Whitening", slug: "teeth-whitening", description: "Laser-guided whitening for a brighter smile.", price: 499, category: "Cosmetic" },
    { name: "Dental Implants", slug: "dental-implants", description: "Titanium precision for lifelong durability.", price: 2500, category: "Restorative" },
    { name: "Invisalign", slug: "invisalign", description: "Invisible alignment therapy.", price: 3500, category: "Cosmetic" },
    { name: "Root Canal", slug: "root-canal", description: "Pain-free endodontic care.", price: 800, category: "General" }
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
