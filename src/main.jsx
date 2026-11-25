import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, Download, Code2, Server, Workflow, Database, Terminal, Sparkles, BriefcaseBusiness, GraduationCap, ExternalLink, Award, Play, X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import './style.css';

// Files in /public are referenced through this helper so they work on any hosting path.
const asset = (p) => (/^(https?:)?\/\//.test(p) ? p : import.meta.env.BASE_URL + p.replace(/^\//, ''));

const PROFILE = {
  photo: 'profile.jpg', // put your photo at public/profile.jpg
  initials: 'SG',
  name: 'Shehan Gunasinha',
  role: 'Software Engineer',
  intro: 'I build useful software, reliable backend systems, and practical automation. I enjoy turning ideas and real-world problems into clean, maintainable solutions.',
  email: 'YOUR_EMAIL@example.com',
  github: 'https://github.com/YOUR_GITHUB_USERNAME',
  linkedin: 'https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME/',
  resume: 'resume.pdf'
};
const skills = [
  { icon: Code2, title: 'Languages & Frontend', items: ['Java', 'JavaScript', 'React', 'HTML', 'CSS'] },
  { icon: Server, title: 'Backend & Frameworks', items: ['Spring Boot', 'REST APIs', 'Microservices', 'JPA / Hibernate'] },
  { icon: Database, title: 'Databases & Messaging', items: ['PostgreSQL', 'MySQL', 'Kafka', 'SQL'] },
  { icon: Workflow, title: 'Tools & Automation', items: ['Git', 'Docker', 'n8n', 'Maven', 'IntelliJ IDEA'] }
];
const projects = [
  { number: '01', title: 'CareerMate AI', type: 'AI · Career Platform', desc: 'A career support platform concept designed to help job seekers organize their search, discover opportunities, and make their job-hunting workflow more efficient.', tech: ['React', 'Spring Boot', 'AI', 'PostgreSQL'], github: 'https://github.com/YOUR_GITHUB_USERNAME/careermate-ai', demo: '', media: [
    { type: 'image', src: 'media/sample-1.svg', caption: 'Dashboard' },
    { type: 'image', src: 'media/sample-2.svg', caption: 'Job tracker' }
    // { type: 'video', src: 'media/careermate-demo.mp4', poster: 'media/careermate-poster.png', caption: 'Demo' },
    // { type: 'youtube', src: 'YOUTUBE_VIDEO_ID', caption: 'Walkthrough' }
  ] },
  { number: '02', title: 'Smart Canteen Management', type: 'Full-Stack Application', desc: 'A canteen management solution focused on streamlining food ordering and day-to-day operations through a digital workflow.', tech: ['Java', 'Spring Boot', 'React', 'Database'], github: 'https://github.com/YOUR_GITHUB_USERNAME/smart-canteen', demo: '', media: [] },
  { number: '03', title: 'JobMagnet', type: 'Web Application', desc: 'A job-search focused project that helps users navigate job opportunities and manage their application process in one place.', tech: ['Web Development', 'JavaScript', 'API'], github: 'https://github.com/YOUR_GITHUB_USERNAME/jobmagnet', demo: '', media: [] },
  { number: '04', title: 'Distributed Cache Invalidation', type: 'Backend · Messaging', desc: 'Implemented a Kafka-based cache invalidation broadcast approach to help synchronize cache-clearing events across application instances in a distributed environment.', tech: ['Java', 'Kafka', 'Spring', 'Microservices'], github: '', demo: '', media: [] }
];
const certifications = [
  { title: 'Your first certification', issuer: 'Issuing organization', date: '2026', image: '', credential: '' },
  { title: 'Your second certification', issuer: 'Issuing organization', date: '2025', image: '', credential: '' }
  // image: 'certs/name.png'  credential: 'https://verify-link'
];
const experience = [{ role: 'Software Engineering Intern', company: 'FineXa Tech (Pvt) Ltd', period: '2026', details: ['Contributed to Order Management System (OMS) development and maintenance.', 'Worked with Java, Spring-based services, database operations, and messaging-oriented architecture.', 'Investigated issues and implemented backend improvements with attention to reliability and maintainability.'] }];
const education = [{ title: 'Bachelor of Science in Engineering — Computer Engineering', place: 'University of Peradeniya', period: '2022 – 2026' }];
const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
function SectionTitle({ eyebrow, title, text }) { return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div> }
function Portrait() {
  const [ok, setOk] = useState(true);
  return <div className="portrait">
    <div className="portrait-frame">
      {ok ? <img src={asset(PROFILE.photo)} alt={`Portrait of ${PROFILE.name}`} onError={() => setOk(false)} /> : <div className="portrait-fallback"><span className="gradient-text">{PROFILE.initials}</span><small>Add public/profile.jpg</small></div>}
    </div>
    <div className="portrait-badge"><span className="code-purple">const</span> <span className="code-blue">me</span> = <span className="code-green">'builder'</span>;</div>
  </div>;
}
const thumbOf = (m) => m.type === 'youtube' ? `https://img.youtube.com/vi/${m.src}/hqdefault.jpg` : m.poster ? asset(m.poster) : asset(m.src);
function MediaStrip({ items, label, open }) {
  return <div className="media-strip" aria-label={`${label} media`}>
    {items.map((m, i) => <button className="media-thumb" key={m.src} onClick={() => open(i)} aria-label={`Open ${m.caption || m.type} for ${label}`}>
      {m.type === 'video' && !m.poster ? <video src={asset(m.src)} preload="metadata" muted playsInline /> : <img src={thumbOf(m)} alt="" loading="lazy" />}
      {m.type !== 'image' && <span className="media-play"><Play size={16} fill="currentColor" /></span>}
      {m.caption && <span className="media-cap">{m.caption}</span>}
    </button>)}
  </div>;
}
function Lightbox({ state, onChange }) {
  const close = () => onChange(null);
  const go = (d) => onChange({ ...state, index: (state.index + d + state.items.length) % state.items.length });
  useEffect(() => {
    if (!state) return;
    const key = (e) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    document.body.style.overflow = 'hidden'; window.addEventListener('keydown', key);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', key); };
  });
  if (!state) return null;
  const m = state.items[state.index];
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label={state.title} onClick={close}>
    <button className="lb-btn lb-close" onClick={close} aria-label="Close"><X size={20} /></button>
    {state.items.length > 1 && <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous"><ChevronLeft size={22} /></button>}
    <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
      {m.type === 'image' && <img src={asset(m.src)} alt={m.caption || state.title} />}
      {m.type === 'video' && <video key={m.src} src={asset(m.src)} controls autoPlay playsInline />}
      {m.type === 'youtube' && <iframe key={m.src} src={`https://www.youtube-nocookie.com/embed/${m.src}?autoplay=1`} title={state.title} allow="autoplay; encrypted-media" allowFullScreen />}
      <div className="lb-cap"><strong>{state.title}</strong>{m.caption && <span> · {m.caption}</span>}<em>{state.index + 1} / {state.items.length}</em></div>
    </div>
    {state.items.length > 1 && <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next"><ChevronRight size={22} /></button>}
  </div>;
}
function App() {
  const [lb, setLb] = useState(null);
  return <div className="site-shell">
    <header className="nav"><a className="brand" href="#home"><span className="brand-mark">SG</span><span>Shehan<span className="accent">.</span></span></a><nav><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#certifications">Certifications</a><a href="#contact" className="nav-contact">Let's talk <ArrowUpRight size={15}/></a></nav></header>
    <main>
      <section id="home" className="hero">
        <div className="hero-grid"><motion.div initial="hidden" animate="visible" variants={reveal}>
          <div className="availability"><span className="pulse"/> Open to opportunities</div>
          <h1>Building software<br/>that <span className="gradient-text">solves problems.</span></h1>
          <p className="hero-copy">Hi, I'm <strong>{PROFILE.name}</strong> — a software engineer interested in backend development, full-stack applications, and practical AI & automation.</p>
          <div className="hero-actions"><a className="button primary" href="#projects">Explore my work <ArrowUpRight size={17}/></a><a className="button secondary" href={asset(PROFILE.resume)}><Download size={16}/> Resume</a></div>
          <div className="socials"><a href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a><a href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn</a><a href={`mailto:${PROFILE.email}`}><Mail size={18}/> Email</a></div>
        </motion.div><motion.div className="hero-art" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }}><div className="orb orb-one"/><div className="orb orb-two"/><Portrait/><div className="floating-chip chip-top"><Terminal size={16}/> Backend Development</div><div className="floating-chip chip-bottom"><Workflow size={16}/> Automation & AI</div></motion.div></div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span className="scroll-line"/><span>01 / 05</span></div>
      </section>
      <section id="about" className="section about"><SectionTitle eyebrow="A LITTLE ABOUT ME" title="Curiosity drives my code."/><div className="about-layout"><p className="about-large">I’m an engineering graduate who loves learning how things work — and making them work better.</p><div className="about-text"><p>My interests span backend engineering, modern web development, distributed systems, and workflow automation. I enjoy collaborating, exploring unfamiliar technologies, and building applications with real value.</p><p>I'm currently looking for opportunities where I can contribute, learn from experienced engineers, and grow into a stronger developer.</p><a className="text-link" href="#contact">Get in touch <ArrowUpRight size={16}/></a></div></div></section>
      <section id="skills" className="section skills"><SectionTitle eyebrow="MY TOOLKIT" title="Technologies I work with." text="Tools and technologies I've used across coursework, personal projects, and professional experience."/><div className="skill-grid">{skills.map((s,i)=><motion.article className="skill-card" key={s.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{once:true}} transition={{delay:i*.07}}><div className="skill-icon"><s.icon size={20}/></div><h3>{s.title}</h3><div className="tags">{s.items.map(item=><span key={item}>{item}</span>)}</div></motion.article>)}</div></section>
      <section id="projects" className="section projects"><SectionTitle eyebrow="SELECTED WORK" title="Projects & experiments." text="A selection of projects where I explored ideas, solved problems, and put technology into practice."/><div className="project-list">{projects.map((p,i)=><motion.article className="project-card" key={p.title} initial="hidden" whileInView="visible" viewport={{once:true}} variants={reveal}><div className="project-number">{p.number}</div><div className="project-main"><span className="project-type">{p.type}</span><h3>{p.title}</h3><p>{p.desc}</p><div className="tags">{p.tech.map(t=><span key={t}>{t}</span>)}</div>{p.media.length>0 && <MediaStrip items={p.media} label={p.title} open={(i)=>setLb({items:p.media,index:i,title:p.title})}/>}</div><div className="project-links">{p.github && <a href={p.github} target="_blank" rel="noreferrer" aria-label={`GitHub ${p.title}`}><Github size={18}/></a>}{p.demo && <a href={p.demo} target="_blank" rel="noreferrer" aria-label={`Demo ${p.title}`}><ExternalLink size={18}/></a>}<span className="project-arrow"><ArrowUpRight size={20}/></span></div></motion.article>)}</div></section>
      <section id="experience" className="section experience"><SectionTitle eyebrow="MY JOURNEY" title="Experience & education."/><div className="timeline"><div className="timeline-label"><BriefcaseBusiness size={18}/> Experience</div>{experience.map(e=><article className="timeline-item" key={e.company}><div className="timeline-dot"/><div className="timeline-top"><h3>{e.role}</h3><span>{e.period}</span></div><h4>{e.company}</h4><ul>{e.details.map(d=><li key={d}>{d}</li>)}</ul></article>)}<div className="timeline-label education-label"><GraduationCap size={18}/> Education</div>{education.map(e=><article className="timeline-item" key={e.place}><div className="timeline-dot"/><div className="timeline-top"><h3>{e.title}</h3><span>{e.period}</span></div><h4>{e.place}</h4></article>)}</div></section>
      <section id="certifications" className="section certs"><SectionTitle eyebrow="PROOF OF LEARNING" title="Certifications." text="Courses and credentials that back up the skills above. Select a certificate to view it."/><div className="cert-grid">{certifications.map((c,i)=><motion.article className="cert-card" key={c.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{once:true}} transition={{delay:i*.07}}>{c.image ? <button className="cert-preview" onClick={()=>setLb({items:[{type:'image',src:c.image}],index:0,title:c.title})} aria-label={`View ${c.title} certificate`}><img src={asset(c.image)} alt="" loading="lazy"/></button> : <div className="cert-preview empty"><Award size={34}/></div>}<div className="cert-body"><span className="cert-date">{c.date}</span><h3>{c.title}</h3><p>{c.issuer}</p>{c.credential && <a className="text-link" href={c.credential} target="_blank" rel="noreferrer">Verify credential <ExternalLink size={14}/></a>}</div></motion.article>)}</div></section>
      <section id="contact" className="contact-section"><div className="contact-box"><span className="eyebrow">HAVE A ROLE OR PROJECT IN MIND?</span><h2>Let's build something<br/><span className="gradient-text">meaningful.</span></h2><p>I'm open to new opportunities and conversations. Feel free to reach out.</p><a className="button primary" href={`mailto:${PROFILE.email}`}>Say hello <Mail size={17}/></a></div></section>
    </main>
    <footer><a className="brand" href="#home"><span className="brand-mark">SG</span><span>Shehan<span className="accent">.</span></span></a><span>Designed & built with care.</span><div className="footer-social"><a href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={17}/></a><a href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/></a></div></footer>
    <Lightbox state={lb} onChange={setLb}/>
  </div>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
