"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";

const IMG = "https://raw.githubusercontent.com/Rizzu01/New-portfolio/main/assets/images";

const projects = [
  { title: "Crypto Brand System", type: "Brand Identity / Visual Design", image: `${IMG}/projects/work1.jpg`, num: "01" },
  { title: "Digital Product Experience", type: "UI/UX Design", image: `${IMG}/projects/work2.jpg`, num: "02" },
  { title: "Campaign & Motion", type: "Creative Direction", image: `${IMG}/projects/work3.jpg`, num: "03" },
  { title: "Visual Identity", type: "Graphic Design", image: `${IMG}/projects/work4.jpg`, num: "04" },
  { title: "Web Experience", type: "Web Design", image: `${IMG}/projects/work5.jpg`, num: "05" },
  { title: "Brand Assets", type: "Visual Design", image: `${IMG}/projects/work6.jpg`, num: "06" },
];

const services = [
  ["01", "UI/UX Design", "Intuitive, user-focused digital experiences with a strong visual system."],
  ["02", "Graphic Design", "Bold communication systems for social, campaigns and digital products."],
  ["03", "Brand Identity", "Recognizable identities built from strategy, typography and visual language."],
  ["04", "Web Design", "Responsive, modern websites designed to feel as good as they perform."],
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const yOrb = useTransform(scrollYProgress, [0, 1], [0, -280]);

  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <main>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <motion.div className="cursor-dot" animate={{ x: cursor.x - 5, y: cursor.y - 5 }} transition={{ type: "spring", stiffness: 700, damping: 45 }} />
      <div className="ambient-grid" />
      <motion.div className="orb orb-a" style={{ y: yOrb }} />
      <div className="orb orb-b" />

      <header className="nav">
        <a href="#top" className="logo">R<span>.</span></a>
        <nav className={menu ? "nav-links open" : "nav-links"}>
          {[["Work", "#work"], ["About", "#about"], ["Services", "#services"], ["Contact", "#contact"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}
        </nav>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X size={22} /> : <Menu size={22} />}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <Reveal><div className="eyebrow"><span /> AVAILABLE FOR SELECT PROJECTS · 2026</div></Reveal>
          <motion.h1 initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>DESIGNING<br /><em>IMPACT.</em></motion.h1>
          <Reveal delay={0.15}><p className="hero-text">Hi, I’m <strong>Rizwan Khan</strong> — a UI/UX & Graphic Designer crafting user-focused digital products, clean interfaces and bold visual identities.</p></Reveal>
          <Reveal delay={0.25}><div className="hero-actions"><a className="pill-btn" href="#work">Explore work <ArrowDown size={16} /></a><a className="text-btn" href="#contact">Let’s talk <ArrowUpRight size={17} /></a></div></Reveal>
        </div>
        <div className="hero-side"><div className="portrait-wrap"><div className="portrait-ring" /><img src={`${IMG}/about/me2.jpg`} alt="Rizwan Khan" /></div><div className="hero-side-label">UI/UX<br />GRAPHIC<br />WEB</div></div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span>01 — 06</span></div>
      </section>

      <section className="marquee"><div className="marquee-track">{Array.from({ length: 2 }).flatMap((_, k) => ["UI/UX DESIGN", "GRAPHIC DESIGN", "BRAND IDENTITY", "WEB DESIGN"].map((x, i) => <span key={`${k}-${i}`}><b>{x}</b><i>✦</i></span>))}</div></section>

      <section className="work section" id="work">
        <div className="section-head"><Reveal><p className="kicker">SELECTED WORK / 01</p></Reveal><Reveal delay={0.1}><h2>Work that <em>moves.</em></h2></Reveal><Reveal delay={0.2}><p className="section-intro">A selection of visual systems, interfaces and digital experiences built to be noticed — and remembered.</p></Reveal></div>
        <div className="project-grid">
          {projects.map((p, i) => <Reveal key={p.num} delay={i % 2 ? 0.08 : 0}><motion.article className={`project-card ${i % 3 === 0 ? "wide" : ""}`} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 260, damping: 24 }}><div className="project-image"><img src={p.image} alt={p.title} /><div className="image-shade" /><span className="project-num">{p.num}</span><span className="view-project">View <ArrowUpRight size={18} /></span></div><div className="project-meta"><div><h3>{p.title}</h3><p>{p.type}</p></div><span>{p.num}</span></div></motion.article></Reveal>)}
        </div>
      </section>

      <section className="about section" id="about"><div className="about-left"><Reveal><p className="kicker">ABOUT / 02</p><h2>Ideas first.<br /><em>Pixels second.</em></h2></Reveal></div><div className="about-right"><Reveal delay={0.12}><p className="big-copy">I combine visual design thinking with product-focused UX to create work that looks sharp and makes sense.</p></Reveal><Reveal delay={0.2}><p>From crypto and digital products to brand systems and social campaigns, I care about the tiny details that make an experience feel intentional.</p></Reveal><div className="stats"><div><strong>04+</strong><span>Design disciplines</span></div><div><strong>∞</strong><span>Ideas explored</span></div><div><strong>01</strong><span>Design obsession</span></div></div></div></section>

      <section className="services section" id="services"><div className="section-head compact"><Reveal><p className="kicker">CAPABILITIES / 03</p><h2>What I <em>do.</em></h2></Reveal></div><div className="service-list">{services.map(([n, title, text], i) => <Reveal key={n} delay={i * 0.06}><motion.div className="service-row" whileHover={{ x: 10 }}><span className="service-number">{n}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight className="service-arrow" size={28} /></motion.div></Reveal>)}</div></section>

      <section className="contact section" id="contact"><Reveal><p className="kicker">CONTACT / 04</p><h2>Have an idea?<br /><em>Let’s make it real.</em></h2></Reveal><Reveal delay={0.12}><a className="contact-mail" href="mailto:hello@rizwankhan.design">hello@rizwankhan.design <ArrowUpRight /></a></Reveal><div className="contact-bottom"><span>RIZWAN KHAN © 2026</span><div className="socials"><a href="#">LinkedIn</a><a href="#">Instagram</a><a href="#">Behance</a><a href="#">GitHub</a></div></div></section>
      <footer><span>BUILT WITH INTENTION.</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}