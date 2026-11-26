import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, Download, Code2, Server, Workflow, Database, Terminal, Sparkles, BriefcaseBusiness, GraduationCap, ExternalLink, Award, Play, X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import './style.css';

// Files in /public are referenced through this helper so they work on any hosting path.
const asset = (p) => (/^(https?:)?\/\//.test(p) ? p : import.meta.env.BASE_URL + p.replace(/^\//, ''));

const PROFILE = {
  photo: 'profile/profile.jpg',
  initials: 'SG',
  name: 'Shehan Gunasinha',
  role: 'Software Engineer',
  intro: 'I build useful software, reliable backend systems, and practical automation. I enjoy turning ideas and real-world problems into clean, maintainable solutions.',
  email: 'shehangunasinha814@gmail.com',
  github: 'https://github.com/shehan-gunasinha',
  linkedin: 'https://www.linkedin.com/in/shehan-gunasinha-13b754290/',
  resume: 'profile/Shehan_gunasinha_CV.pdf'
};
const contactLinks = [
  { label: 'GitHub', value: 'github.com/shehan-gunasinha', hint: 'Browse my projects and repositories', icon: Github, href: PROFILE.github, external: true },
  { label: 'LinkedIn', value: 'linkedin.com/in/shehan-gunasinha', hint: 'Connect with me professionally', icon: Linkedin, href: PROFILE.linkedin, external: true },
  { label: 'Email', value: PROFILE.email, hint: 'Send me a message directly', icon: Mail, href: `mailto:${PROFILE.email}`, external: false }
];
const skills = [
  { icon: Code2, title: 'Languages & Frontend', items: ['Java', 'JavaScript', 'React', 'HTML', 'CSS'] },
  { icon: Server, title: 'Backend & Frameworks', items: ['Spring Boot', 'REST APIs', 'Microservices', 'JPA / Hibernate'] },
  { icon: Database, title: 'Databases & Messaging', items: ['PostgreSQL', 'MySQL', 'Kafka', 'SQL'] },
  { icon: Workflow, title: 'Tools & Automation', items: ['Git', 'Docker', 'n8n', 'Maven', 'IntelliJ IDEA'] }
];
const projects = [
  { number: '01', title: 'CareerMate AI', type: 'AI · Career Platform', desc: 'A career support platform concept designed to help job seekers organize their search, discover opportunities, and make their job-hunting workflow more efficient.', tech: ['React', 'Spring Boot', 'AI', 'PostgreSQL'], github: 'https://github.com/shehan-gunasinha/careermate-AI', demo: '', media: [
    { type: 'image', src: 'projects/careermat-ai/cm1.png' },
    { type: 'image', src: 'projects/careermat-ai/cm2.png' },
    { type: 'image', src: 'projects/careermat-ai/cm3.png' },
    { type: 'video', src: 'projects/careermat-ai/cm_demo.mp4', caption: 'Demo' },
    // { type: 'youtube', src: 'YOUTUBE_VIDEO_ID', caption: 'Walkthrough' }
  ] },
  { number: '02', title: 'Smart Canteen Management', type: 'Full-Stack Application', desc: 'A canteen management solution focused on streamlining food ordering and day-to-day operations through a digital workflow.', tech: ['Java', 'Spring Boot', 'React', 'Database'], github: 'https://github.com/shehan-gunasinha/e20-3yp-Smart-Canteen-Management-System', demo: '', media: [
      { type: 'image', src: 'projects/3yp/cms1.jpg' },
      { type: 'image', src: 'projects/3yp/cms2.jpg' },
      { type: 'image', src: 'projects/3yp/cms3.jpg' },
      { type: 'image', src: 'projects/3yp/cms4.jpg' },
   ] },

  { number: '03', title: 'JobMagnet', type: 'Web Application', desc: 'A job-search focused project that helps users navigate job opportunities and manage their application process in one place.', tech: ['Web Development', 'JavaScript', 'API'], github: 'https://github.com/shehan-gunasinha/jobMagnet', demo: '', media: [
      { type: 'image', src: 'projects/jobmagnet/jm1.jpeg' },
      { type: 'image', src: 'projects/jobmagnet/jm2.jpeg' },
      { type: 'image', src: 'projects/jobmagnet/jm3.jpeg' },
      { type: 'image', src: 'projects/jobmagnet/jm4.jpeg' },
  ] },

{number: '04',title: 'Watermark Removal',type: 'AI · Image Processing',desc: 'An image processing application designed to remove unwanted watermarks from images, providing users with a simple and efficient way to clean up their images.',tech: ['Python', 'Image Processing', 'Computer Vision', 'AI'],github: 'https://github.com/shehan-gunasinha/water-mark-removal',demo: '',media: [
      { type: 'image', src: 'projects/watermark/wm1.jpeg', caption: 'automatically' },
      { type: 'image', src: 'projects/watermark/wm2.jpeg', caption: 'manually' },
      { type: 'video', src: 'projects/watermark/demo.mp4', caption: 'Demo' },
    ] },

  { number: '05', title: 'Distributed Cache Invalidation', type: 'Backend · Messaging', desc: 'Implemented a Kafka-based cache invalidation broadcast approach to help synchronize cache-clearing events across application instances in a distributed environment.', tech: ['Java', 'Kafka', 'Spring', 'Microservices'], github: '', demo: '', media: [] }
];
const certifications = [
  { title: 'DevOps Foundations', issuer: 'LinkedIn', date: 'Nov-2026', image: 'certificates/cert1.jpg', credential: 'https://www.linkedin.com/learning/certificates/8ead7a65a7dbd982af899631c66928de806b350d00962b38c4ac8ad1d1b5fd7e' },
  { title: 'Advanced Prompt Engineering', issuer: 'Simplilearn', date: 'Nov-2026', image: 'certificates/cert3.jpg', credential: 'https://simpli-web.app.link/e/xErjbc5WK7b' },
  { title: 'AWS Cloud Practitioner Essentials', issuer: 'Amazon Web Services (AWS)', date: 'Nov-2026', image: 'certificates/cert2.jpg', credential: '' },
  // image: 'certs/name.png'  credential: 'https://verify-link'
];
const experience = [{ role: 'Software Engineering Intern', company: 'FineXa Tech (Pvt) Ltd', period: '2026', details: ['Contributed to Order Management System (OMS) development and maintenance.', 'Worked with Java, Spring-based services, database operations, and messaging-oriented architecture.', 'Investigated issues and implemented backend improvements with attention to reliability and maintainability.'] }];
const education = [{ title: 'Bachelor of Science in Engineering — Computer Engineering', place: 'University of Peradeniya', period: '2022 – 2026' }];
const services = [
  { icon: Server, title: 'Backend Development', desc: 'REST APIs, Spring Boot services, and reliable data workflows built for maintainability.' },
  { icon: Code2, title: 'Full-Stack Applications', desc: 'Practical web apps with clean React interfaces connected to solid backend systems.' },
  { icon: Sparkles, title: 'Automation & AI', desc: 'Workflow automation and AI-assisted tools that reduce repetitive work.' },
  { icon: Database, title: 'Data & Messaging', desc: 'Database design and event-driven flows using SQL, Kafka, and distributed patterns.' }
];
const highlights = [
  { value: String(projects.length).padStart(2, '0'), label: 'Projects & experiments' },
  { value: String(certifications.length).padStart(2, '0'), label: 'Certifications earned' },
  { value: String(experience.length).padStart(2, '0'), label: 'Internship experience' },
  { value: String(skills.length).padStart(2, '0'), label: 'Core skill areas' }
];
const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
function SectionTitle({ eyebrow, title, text }) { return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div> }
function ContactLinks() {
  return <div className="contact-links">
    {contactLinks.map(({ label, value, hint, icon: Icon, href, external }) => <a className="contact-card" key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
      <span className="contact-icon"><Icon size={22} /></span>
      <span className="contact-card-body"><strong>{label}</strong><span>{value}</span><small>{hint}</small></span>
      <ArrowUpRight className="contact-card-arrow" size={18} />
    </a>)}
  </div>;
}
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
  const [selectedProject, setSelectedProject] = useState(null);
  const toggleProject = (title) => setSelectedProject((current) => current === title ? null : title);
  return <div className="site-shell">
    <header className="nav"><a className="brand" href="#home"><span className="brand-mark">SG</span><span>Shehan<span className="accent">.</span></span></a><nav><a href="#about">About</a><a href="#services">Services</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#certifications">Certifications</a><a href="#contact" className="nav-contact">Let's talk <ArrowUpRight size={15}/></a></nav></header>
    <main>
      <section id="home" className="hero">
        <div className="hero-grid"><motion.div initial="hidden" animate="visible" variants={reveal}>
          <div className="availability"><span className="pulse"/> Open to opportunities</div>
          <h1>Building software<br/>that <span className="gradient-text">solves problems.</span></h1>
          <p className="hero-copy">Hi, I'm <strong>{PROFILE.name}</strong> — a software engineer interested in backend development, full-stack applications, and practical AI & automation.</p>
          <div className="hero-actions"><a className="button primary" href="#projects">Explore my work <ArrowUpRight size={17}/></a><a className="button secondary" href={asset(PROFILE.resume)}><Download size={16}/> Resume</a></div>
          <div className="socials">{contactLinks.map(({ label, icon: Icon, href, external }) => <a key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}><Icon size={18}/> {label}</a>)}</div>
        </motion.div><motion.div className="hero-art" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }}><div className="orb orb-one"/><div className="orb orb-two"/><Portrait/><div className="floating-chip chip-top"><Terminal size={16}/> Backend Development</div><div className="floating-chip chip-bottom"><Workflow size={16}/> Automation & AI</div></motion.div></div>
{/*         <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span className="scroll-line"/><span>01 / 05</span></div> */}
      </section>
      <section id="about" className="section about"><SectionTitle eyebrow="A LITTLE ABOUT ME" title="Curiosity drives my code."/><div className="about-layout"><p className="about-large">I’m an engineering graduate who loves learning how things work — and making them work better.</p><div className="about-text"><p>My interests span backend engineering, modern web development, distributed systems, and workflow automation. I enjoy collaborating, exploring unfamiliar technologies, and building applications with real value.</p><p>I'm currently looking for opportunities where I can contribute, learn from experienced engineers, and grow into a stronger developer.</p><a className="text-link" href="#contact">Get in touch <ArrowUpRight size={16}/></a></div></div><div className="stats-row">{highlights.map(h => <div className="stat" key={h.label}><strong>{h.value}</strong><span>{h.label}</span></div>)}</div></section>
      <section id="services" className="section services"><SectionTitle eyebrow="HOW I CAN HELP" title="What I do." text="A few ways I can contribute to a team or project."/><div className="service-grid">{services.map((s,i)=><motion.article className="service-card" key={s.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{once:true}} transition={{delay:i*.07}}><div className="service-icon"><s.icon size={20}/></div><h3>{s.title}</h3><p>{s.desc}</p><span className="service-line"/></motion.article>)}</div></section>
      <section id="skills" className="section skills"><SectionTitle eyebrow="MY TOOLKIT" title="Technologies I work with." text="Tools and technologies I've used across coursework, personal projects, and professional experience."/><div className="skill-grid">{skills.map((s,i)=><motion.article className="skill-card" key={s.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{once:true}} transition={{delay:i*.07}}><div className="skill-icon"><s.icon size={20}/></div><h3>{s.title}</h3><div className="tags">{s.items.map(item=><span key={item}>{item}</span>)}</div></motion.article>)}</div></section>
      <section id="projects" className="section projects"><SectionTitle eyebrow="SELECTED WORK" title="Projects & experiments." text="A selection of projects where I explored ideas, solved problems, and put technology into practice."/><div className="project-list">{projects.map((p,i)=><motion.article className={`project-card${selectedProject === p.title ? ' is-selected' : ''}`} key={p.title} initial="hidden" whileInView="visible" viewport={{once:true}} variants={reveal} tabIndex={0} aria-current={selectedProject === p.title ? 'true' : undefined} onClick={() => toggleProject(p.title)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleProject(p.title); } }}><div className="project-number">{p.number}</div><div className="project-main"><span className="project-type">{p.type}</span><h3>{p.title}</h3><p>{p.desc}</p><div className="tags">{p.tech.map(t=><span key={t}>{t}</span>)}</div>{p.media.length>0 && <MediaStrip items={p.media} label={p.title} open={(i)=>setLb({items:p.media,index:i,title:p.title})}/>}</div><div className="project-links">{p.github && <a href={p.github} target="_blank" rel="noreferrer" aria-label={`GitHub ${p.title}`}><Github size={18}/></a>}{p.demo && <a href={p.demo} target="_blank" rel="noreferrer" aria-label={`Demo ${p.title}`}><ExternalLink size={18}/></a>}<span className="project-arrow"><ArrowUpRight size={20}/></span></div></motion.article>)}</div></section>
      <section id="experience" className="section experience"><SectionTitle eyebrow="MY JOURNEY" title="Experience & education."/><div className="timeline"><div className="timeline-label"><BriefcaseBusiness size={18}/> Experience</div>{experience.map(e=><article className="timeline-item" key={e.company}><div className="timeline-dot"/><div className="timeline-top"><h3>{e.role}</h3><span>{e.period}</span></div><h4>{e.company}</h4><ul>{e.details.map(d=><li key={d}>{d}</li>)}</ul></article>)}<div className="timeline-label education-label"><GraduationCap size={18}/> Education</div>{education.map(e=><article className="timeline-item" key={e.place}><div className="timeline-dot"/><div className="timeline-top"><h3>{e.title}</h3><span>{e.period}</span></div><h4>{e.place}</h4></article>)}</div></section>
      <section id="certifications" className="section certs"><SectionTitle eyebrow="PROOF OF LEARNING" title="Certifications." text="Courses and credentials that back up the skills above. Select a certificate to view it."/><div className="cert-grid">{certifications.map((c,i)=><motion.article className="cert-card" key={c.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{once:true}} transition={{delay:i*.07}}>{c.image ? <button className="cert-preview" onClick={()=>setLb({items:[{type:'image',src:c.image}],index:0,title:c.title})} aria-label={`View ${c.title} certificate`}><img src={asset(c.image)} alt="" loading="lazy"/></button> : <div className="cert-preview empty"><Award size={34}/></div>}<div className="cert-body"><span className="cert-date">{c.date}</span><h3>{c.title}</h3><p>{c.issuer}</p>{c.credential && <a className="text-link" href={c.credential} target="_blank" rel="noreferrer">Verify credential <ExternalLink size={14}/></a>}</div></motion.article>)}</div></section>
      <section id="contact" className="contact-section">
        <div className="contact-box"><span className="eyebrow">HAVE A ROLE OR PROJECT IN MIND?</span><h2>Let's build something<br/><span className="gradient-text">meaningful.</span></h2><p>I'm open to new opportunities and conversations. Feel free to reach out.</p><a className="button primary" href={`mailto:${PROFILE.email}`}>Say hello <Mail size={17}/></a></div>
        <div className="contact-links-heading"><span className="eyebrow">FIND ME ONLINE</span><h3>Choose the best way to reach me.</h3></div>
        <ContactLinks />
      </section>
    </main>
    <footer><a className="brand" href="#home"><span className="brand-mark">SG</span><span>Shehan<span className="accent">.</span></span></a><span>Designed & built with care.</span><div className="footer-social">{contactLinks.map(({ label, icon: Icon, href, external }) => <a key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}><Icon size={17}/> {label}</a>)}</div></footer>
    <Lightbox state={lb} onChange={setLb}/>
  </div>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
