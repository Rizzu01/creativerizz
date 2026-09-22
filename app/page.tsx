"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
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
  return <motion.div className={className} initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

function TextRoll({ children }: { children: React.ReactNode }) {
  return <span className="text-roll"><span>{children}</span><span aria-hidden="true">{children}</span></span>;
}

function Magnetic({ children, className = "", href = "#" }: { children: React.ReactNode; className?: string; href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 420, damping: 24 }), sy = useSpring(y, { stiffness: 420, damping: 24 });
  const move = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2); y.set((e.clientY - (r.top + r.height / 2)) * 0.2);
  };
  return <motion.a ref={ref} href={href} className={className} style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.a>;
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 180, damping: 20 }), sy = useSpring(ry, { stiffness: 180, damping: 20 });
  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8); rx.set(-((e.clientY - r.top) / r.height - 0.5) * 6);
  };
  return <motion.div ref={ref} className="tilt-shell" style={{ rotateX: sx, rotateY: sy }} onMouseMove={move} onMouseLeave={() => { rx.set(0); ry.set(0); }}>{children}</motion.div>;
}

function WordReveal({ text }: { text: string }) {
  return <span className="word-reveal">{text.split(" ").map((word, i) => <motion.span key={`${word}-${i}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.7 }} transition={{ duration: 0.55, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}>{word}&nbsp;</motion.span>)}</span>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorLabel, setCursorLabel] = useState("");
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(scrollY, [0, 800], [0, -120]);
  const portraitX = useMotionValue(0), portraitY = useMotionValue(0);
  const portraitSX = useSpring(portraitX, { stiffness: 80, damping: 20 }), portraitSY = useSpring(portraitY, { stiffness: 80, damping: 20 });

  useEffect(() => { const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY }); window.addEventListener("mousemove", move); return () => window.removeEventListener("mousemove", move); }, []);

  return (
    <main onMouseMove={(e) => { portraitX.set((e.clientX / window.innerWidth - 0.5) * 20); portraitY.set((e.clientY / window.innerHeight - 0.5) * 16); }}>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <motion.div className="cursor-dot" animate={{ x: cursor.x - 5, y: cursor.y - 5 }} transition={{ type: "spring", stiffness: 700, damping: 45 }} />
      <motion.div className="cursor-ring" animate={{ x: cursor.x - 22, y: cursor.y - 22 }} transition={{ type: "spring", stiffness: 180, damping: 20 }} />
      {cursorLabel && <motion.div className="cursor-label" animate={{ x: cursor.x + 16, y: cursor.y + 16 }}>{cursorLabel}</motion.div>}
      <div className="ambient-grid" /><div className="noise" /><div className="orb orb-a" /><div className="orb orb-b" />

      <header className="nav">
        <a href="#top" className="logo">R<span>.</span></a>
        <nav className={menu ? "nav-links open" : "nav-links"}>{[["Work", "#work"], ["About", "#about"], ["Services", "#services"], ["Contact", "#contact"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}><TextRoll>{label}</TextRoll></a>)}</nav>
        <Magnetic className="availability" href="#contact">Available</Magnetic>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}>{menu ? <X size={22} /> : <Menu size={22} />}</button>
      </header>

      <section className="hero" id="top">
        <motion.div className="hero-copy" style={{ y: heroY }}>
          <Reveal><div className="eyebrow"><span /> AVAILABLE FOR SELECT PROJECTS · 2026</div></Reveal>
          <motion.h1 initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}>
            {"DESIGNING".split("").map((c, i) => <motion.span key={`a-${i}`} variants={{ hidden: { y: 90, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: .8, ease: [0.16, 1, 0.3, 1] } } }}>{c}</motion.span>)}<br />
            <em>{"IMPACT.".split("").map((c, i) => <motion.span key={`b-${i}`} variants={{ hidden: { y: 90, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: .8, delay: .18 + i * .04, ease: [0.16, 1, 0.3, 1] } } }}>{c}</motion.span>)}</em>
          </motion.h1>
          <Reveal delay={0.18}><p className="hero-text">Hi, I’m <strong>Rizwan Khan</strong> — a UI/UX & Graphic Designer crafting user-focused digital products, clean interfaces and bold visual identities.</p></Reveal>
          <Reveal delay={0.28}><div className="hero-actions"><Magnetic className="pill-btn" href="#work">Explore work <ArrowDown size={16} /></Magnetic><Magnetic className="text-btn" href="#contact">Let’s talk <ArrowUpRight size={17} /></Magnetic></div></Reveal>
        </motion.div>
        <motion.div className="hero-side" style={{ x: portraitSX, y: portraitSY }}><div className="portrait-wrap"><div className="portrait-ring" /><div className="portrait-cross" /><img src={`${IMG}/about/me2.jpg`} alt="Rizwan Khan" /></div><div className="hero-side-label">UI/UX<br />GRAPHIC<br />WEB</div></motion.div>
        <div className="hero-bottom"><span>Scroll to explore ↓</span><span>01 — 06</span></div>
      </section>

      <section className="marquee"><div className="marquee-track">{Array.from({ length: 3 }).flatMap((_, k) => ["UI/UX DESIGN", "GRAPHIC DESIGN", "BRAND IDENTITY", "WEB DESIGN"].map((x, i) => <span key={`${k}-${i}`}><b>{x}</b><i>✦</i></span>))}</div></section>

      <section className="work section" id="work">
        <div className="section-head"><Reveal><p className="kicker">Selected work / 01</p></Reveal><Reveal delay={0.1}><h2>Work that <em>moves.</em></h2></Reveal><Reveal delay={0.2}><p className="section-intro">A selection of visual systems, interfaces and digital experiences built to be noticed — and remembered.</p></Reveal></div>
        <div className="project-grid">{projects.map((p, i) => <Reveal key={p.num} delay={i % 2 ? 0.06 : 0}><TiltCard><motion.article className={`project-card ${i % 3 === 0 ? "wide" : ""}`} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} onMouseEnter={() => setCursorLabel("VIEW")} onMouseLeave={() => setCursorLabel("")}><div className="project-image"><img src={p.image} alt={p.title} /><div className="image-shade" /><span className="project-num">{p.num}</span><span className="view-project">View <ArrowUpRight size={18} /></span><div className="project-hover-title">{p.title}</div></div><div className="project-meta"><div><h3>{p.title}</h3><p>{p.type}</p></div><span>{p.num}</span></div></motion.article></TiltCard></Reveal>)}</div>
      </section>

      <section className="about section" id="about"><div className="about-left"><Reveal><p className="kicker">ABOUT / 02</p><h2>Ideas first.<br /><em>Pixels second.</em></h2></Reveal></div><div className="about-right"><Reveal delay={0.12}><p className="big-copy"><WordReveal text="I combine visual design thinking with product-focused UX to create work that looks sharp and makes sense." /></p></Reveal><Reveal delay={0.2}><p>From crypto and digital products to brand systems and social campaigns, I care about the tiny details that make an experience feel intentional.</p></Reveal><div className="stats"><div><strong>04+</strong><span>Design disciplines</span></div><div><strong>∞</strong><span>Ideas explored</span></div><div><strong>01</strong><span>Design obsession</span></div></div></div></section>

      <section className="services section" id="services"><div className="section-head compact"><Reveal><p className="kicker">CAPABILITIES / 03</p><h2>What I <em>do.</em></h2></Reveal></div><div className="service-list">{services.map(([n, title, text], i) => <Reveal key={n} delay={i * 0.06}><motion.div className="service-row" whileHover={{ x: 12 }} onMouseEnter={() => setCursorLabel("OPEN")} onMouseLeave={() => setCursorLabel("")}><span className="service-number">{n}</span><div><h3><TextRoll>{title}</TextRoll></h3><p>{text}</p></div><ArrowDown className="service-arrow" size={28} aria-hidden="true" /></motion.div></Reveal>)}</div></section>

      <section className="contact section" id="contact"><Reveal><p className="kicker">CONTACT / 04</p><h2>Have an idea?<br /><em>Let’s make it real.</em></h2></Reveal><Reveal delay={0.12}><Magnetic className="contact-mail contact-link" href="mailto:hello@rizwankhan.design">hello@rizwankhan.design <ArrowUpRight aria-hidden="true" /></Magnetic></Reveal><div className="contact-bottom"><span>RIZWAN KHAN © 2026</span><div className="socials"><a href="#"><TextRoll>LinkedIn</TextRoll></a><a href="#"><TextRoll>Instagram</TextRoll></a><a href="#"><TextRoll>Behance</TextRoll></a><a href="#"><TextRoll>GitHub</TextRoll></a></div></div></section>
      <footer><span>Built with intention.</span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
