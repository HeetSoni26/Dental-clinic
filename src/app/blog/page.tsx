"use client";

import Image from "next/image";
import Link from "next/link";
import Card3D from "@/components/ui/Card3D";
import { useRevealAnimation } from "@/hooks/useAnimations";

const posts = [
  {
    slug: "the-architecture-of-a-smile",
    title: "The Architecture of a Smile: Beyond Cosmetic Dentistry",
    category: "Clinical Philosophy",
    date: "Oct 05, 2024",
    readTime: "6 min read",
    excerpt: "Exploring the mathematical precision and artistic intuition required to design a natural-looking smile transformation.",
    image: "/blog_architecture_1776015335754.png",
  },
  {
    slug: "advances-in-3d-guided-implant-surgery",
    title: "Advances in 3D Guided Implant Surgery",
    category: "Technology",
    date: "Sep 28, 2024",
    readTime: "5 min read",
    excerpt: "How digital mapping and surgical robotics are redefining the success rates and recovery times of dental implants.",
    image: "/blog_implants_1776015351867.png",
  },
  {
    slug: "the-silent-health-benefits-of-straight-teeth",
    title: "The Silent Health Benefits of Straight Teeth",
    category: "Patient Care",
    date: "Sep 12, 2024",
    readTime: "4 min read",
    excerpt: "Orthodontics isn't just for aesthetics. Discover how alignment affects digestion, posture, and long-term oral stability.",
    image: "/blog_straight_teeth_1776015367519.png",
  },
  {
    slug: "understanding-gum-disease",
    title: "Understanding Gum Disease: The Silent Threat",
    category: "Oral Health",
    date: "Aug 30, 2024",
    readTime: "7 min read",
    excerpt: "Periodontal disease affects over 50% of adults. Learn the signs, the systemic risks, and how SmileCraft treats it at every stage.",
    image: "/blog_gums_1776015383561.png",
  },
  {
    slug: "the-psychology-of-a-great-smile",
    title: "The Psychology of a Great Smile",
    category: "Wellness",
    date: "Aug 15, 2024",
    readTime: "5 min read",
    excerpt: "How smile confidence affects social outcomes, career progression, and mental well-being — backed by clinical research.",
    image: "/blog_psychology_1776015401202.png",
  },
  {
    slug: "invisalign-vs-traditional-braces",
    title: "Invisalign vs Traditional Braces: A Clinical Comparison",
    category: "Orthodontics",
    date: "Jul 22, 2024",
    readTime: "8 min read",
    excerpt: "A deep dive into efficacy, comfort, cost, and lifestyle impact to help you choose the right alignment path.",
    image: "/blog_aligners_1776015416487.png",
  },
];

const categories = ["All", "Clinical Philosophy", "Technology", "Patient Care", "Oral Health", "Wellness", "Orthodontics"];

export default function BlogPage() {
  const headerRef = useRevealAnimation(0.06);
  const postsRef = useRevealAnimation(0.08);

  const [featured, ...rest] = posts;

  return (
    <div className="bg-surface pb-20">
      {/* Hero Header */}
      <header ref={headerRef} className="py-10 md:py-14 px-4 md:px-8 max-w-screen-2xl mx-auto border-b border-outline-variant/10 text-center md:text-left">
        <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.3em] text-tertiary block mb-3 reveal-child">Journal</span>
        <div className="flex flex-col lg:flex-row justify-between items-center md:items-start lg:items-end gap-6 md:gap-8">
          <h1 className="font-serif text-5xl md:text-7xl text-primary leading-tight reveal-child text-balance">
            Clinical Insights &amp; <br className="hidden md:block" /><span className="italic">Wellness.</span>
          </h1>
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 reveal-child">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`font-display text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border transition-all no-scale ${
                  cat === "All"
                    ? "bg-tertiary text-white border-tertiary"
                    : "border-outline-variant/30 text-on-surface-variant hover:border-tertiary hover:text-tertiary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Featured Post */}
      <section className="px-4 md:px-8 max-w-screen-2xl mx-auto py-8 md:py-10">
        <Link href={`/blog/${featured.slug}`}>
          <Card3D className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden editorial-shadow bg-surface-container-low cursor-pointer" intensity={6}>
            <div className="aspect-[16/10] lg:aspect-auto relative overflow-hidden zoom-container">
              <Image fill src={featured.image} alt={featured.title} className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-6 md:p-10 lg:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="inline-block bg-tertiary/10 text-tertiary font-display text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                  Featured
                </span>
                <span className="font-display text-[10px] uppercase tracking-widest text-tertiary">{featured.category}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-primary mb-5 group-hover:text-tertiary transition-colors">{featured.title}</h2>
              <p className="text-on-surface-variant leading-relaxed mb-8">{featured.excerpt}</p>
              <div className="flex items-center gap-6 text-[10px] font-display uppercase tracking-widest text-on-surface-variant">
                <span>{featured.date}</span>
                <span className="w-1 h-1 bg-outline-variant/40 rounded-full" />
                <span>{featured.readTime}</span>
              </div>
            </div>
          </Card3D>
        </Link>
      </section>

      {/* Post Grid */}
      <section ref={postsRef} className="px-4 md:px-8 max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {rest.map((post, idx) => (
          <Link href={`/blog/${post.slug}`} key={idx}>
            <Card3D className="group cursor-pointer bg-white rounded-xl overflow-hidden editorial-shadow border border-outline-variant/5 h-full reveal-child" intensity={8}>
              <div className="aspect-[16/10] relative overflow-hidden zoom-container">
                <Image
                  fill
                  src={post.image}
                  alt={post.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display text-[9px] uppercase tracking-widest text-tertiary">{post.category}</span>
                  <span className="w-1 h-1 bg-outline-variant/30 rounded-full"></span>
                  <span className="font-sans text-[9px] uppercase tracking-widest text-on-surface-variant">{post.date}</span>
                  <span className="w-1 h-1 bg-outline-variant/30 rounded-full"></span>
                  <span className="font-sans text-[9px] uppercase tracking-widest text-on-surface-variant">{post.readTime}</span>
                </div>
                <h2 className="font-serif text-xl text-primary mb-3 group-hover:text-tertiary transition-colors">
                  {post.title}
                </h2>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-5 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="font-display text-xs uppercase tracking-widest text-primary border-b border-tertiary/30 hover:border-tertiary pb-1 transition-all">
                  Read Article →
                </span>
              </div>
            </Card3D>
          </Link>
        ))}
      </section>
    </div>
  );
}
