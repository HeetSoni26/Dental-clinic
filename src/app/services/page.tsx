import ServiceCard from "@/components/ui/ServiceCard";

export default function ServicesPage() {
  const categories = [
    {
      name: "Cosmetic & Aesthetic",
      services: [
        { title: "Teeth Whitening", desc: "Laser-guided whitening for a brighter smile in a single luxury session.", icon: "dentistry", image: "/hero_patient_1_1776015001405.png" },
        { title: "Porcelain Veneers", desc: "Masterfully crafted veneers that blend seamlessly with your natural smile.", icon: "flare", image: "/compare_after_1776015065676.png" },
        { title: "Smile Makeover", desc: "A holistic facial aesthetic approach to redefine your complete look.", icon: "face_6", image: "/hero_patient_2_1776015020239.png" },
      ],
    },
    {
      name: "Restorative Excellence",
      services: [
        { title: "Dental Implants", desc: "Titanium precision for lifelong durability and natural function.", icon: "home_repair_service", image: "/blog_implants_1776015351867.png" },
        { title: "Root Canal", desc: "Pain-free endodontic care using advanced microscopic navigation.", icon: "medical_information", image: "/service_tools_1776015433527.png" },
        { title: "Bite Correction", desc: "Structural dental rehabilitation for improved comfort and function.", icon: "align_center", image: "/compare_before_1776015116248.png" },
      ],
    },
  ];

  return (
    <div className="bg-surface pb-20">
      <header className="py-12 md:py-14 px-4 md:px-8 max-w-screen-2xl mx-auto border-b border-outline-variant/10 text-center md:text-left">
        <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-tertiary block mb-3">Our Services</span>
        <h1 className="font-serif text-5xl md:text-7xl text-primary leading-tight max-w-3xl mx-auto md:mx-0">
          Clinical Excellence, <br/><span className="italic">Redefined.</span>
        </h1>
      </header>

      {categories.map((cat, idx) => (
        <section key={idx} className="py-12 md:py-14 px-4 md:px-8 max-w-screen-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6 md:mb-10 text-center md:text-left">{cat.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {cat.services.map((service, sIdx) => (
              <ServiceCard 
                key={sIdx}
                title={service.title}
                description={service.desc}
                icon={service.icon}
                image={service.image}
                href={`/services/${service.title.toLowerCase().replace(/ /g, "-")}`}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
