import Image from "next/image";

export default function TeamPage() {
  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Lead Cosmetic Surgeon",
      bio: "Master of aesthetic facial balance and dental restoration.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0r9h1AOjUkdUwvuzbtdIUR3PJ9U8zM6NAxphHA6esvkkockLxHGMOo4nVoDKGcWyt1A6CTDUHe_nTkyaPZaPzkNNylVxd0rebvgjWAWTM0zjS9Uh_RXW684MiCZ3Q71LKHNV_MDLmM6XGMdcgJ--w2EUz0njr11twLPa0Kae6EGSv7ZfMzKP-3gz5wKZZuOs1WFNVHA_JXPU9zrlNLzb0nWQYcC4hTVdaCiUzngyrTE5tieci75incnmJ1plFg4ne13uDAN5a0mRE"
    },
    {
      name: "Dr. James Chen",
      role: "Master Implantologist",
      bio: "Pioneer in 3D-guided surgical implant technology.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSzzm5kTZ4nFxNx0zezmFb-_JiCkKsICeKvWiYPjl4FXs4V0LXsLlw9on0QmixcD4WNIRarV2NKHJIzmyBbKZc9QwCuYurmwX3AMubus1X7k80ch3xtS0ubNkNCY2HHNJsI7XUstQ5qJrrsjodNvGvoY14ItZ9wz7iuNQF_w92EVFMZTPtyFk9jDDRmfdDDdnkRo_lAXkqGYSqOTdbXBK8VHiopLezc4GBCLkobl9VUDMAqg8ha6mtKGyK7DK2YNZN1Xmpyx3scydr"
    },
    {
      name: "Dr. Elena Rossi",
      role: "Orthodontic Specialist",
      bio: "Focused on invisible alignment therapy and bite correction.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCg4dpID9VcfEYM_pOLgThdMaA1B-HD13AmwlGQTPLYV6MOJpXCWxCaGFjSl5Y-WmuPQWzwggjo_wEogjMYRmX81avNFaU-P29xjQN0fR4gnhMEv4s1Wag91rDOH_CKOV0ET0Q7P8hi8spxyrIch31p08NWrKGIWRwVPdI8XN2xtvgPHJYFmvJNpFK4u-wmY1EWEXtT41ep2hHJk-TqpEXm-cRIqQ7aFsGr4zP99vquXJAPhvaGh1cJsxLFEBn0rBGw3_FQzWGtaXJy"
    },
    {
      name: "Hygienist Miller",
      role: "Lead Dental Hygienist",
      bio: "Deep tissue therapy and preventative health advocacy.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKbmqOE1tqYyUWwGyFSm-bHoTSC4PICu07kIsb_Sag2E9oTWGHyxiJY8_M19X6GFstuR2bb-SReG2E2vZR0_sH0cpU8nVn5HhhiS0ob6snRYeQn_bG9f-INOmrdWkbTRbea6T4YJdku7r16BRgBMCxnrbtQf7iWFfyUFd-OQlE3ItjaX9VGcDikUTcX1jYoius_tgsjQGcXUouXboWk5H5U83bItMUsVH2jjzw_nKx1udcZgxeFJCn9Pix1ublMwac9-LFUbscuskg"
    }
  ];

  return (
    <div className="bg-surface pb-16 md:pb-32">
      <header className="py-16 md:py-24 px-4 md:px-8 max-w-screen-2xl mx-auto text-center">
        <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-tertiary block mb-3 md:mb-4">Our Specialists</span>
        <h1 className="font-serif text-5xl md:text-7xl text-primary leading-tight">
          The Hands Behind <br className="hidden md:block"/><span className="italic">The Art.</span>
        </h1>
      </header>

      <section className="px-4 md:px-8 max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {team.map((member, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="aspect-[4/5] rounded-xl overflow-hidden mb-8 relative editorial-shadow">
              <Image 
                fill 
                src={member.image} 
                alt={member.name} 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-2xl text-primary mb-1">{member.name}</h3>
              <p className="font-display text-[10px] uppercase tracking-widest text-tertiary mb-4">{member.role}</p>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-[200px] mx-auto">
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Philosophy Callout */}
      <section className="mt-16 md:mt-32 py-16 md:py-24 bg-surface-container-low border-y border-outline-variant/10 text-center">
        <div className="max-w-xl mx-auto px-4 md:px-8">
          <span className="material-symbols-outlined text-4xl text-tertiary mb-6">medical_services</span>
          <h2 className="font-serif text-3xl text-primary mb-6">A United Vision of Excellence</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Every clinical decision at SmileCraft is guided by a peer-review protocol. Our specialists collaborate daily on complex cases to ensure the most comprehensive care plan.
          </p>
        </div>
      </section>
    </div>
  );
}
