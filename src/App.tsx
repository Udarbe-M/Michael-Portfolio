import { lazy, Suspense, useCallback, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Download,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { Header } from './components/Header'
import { ProjectCard } from './components/ProjectCard'
import { ProjectModal } from './components/ProjectModal'
import { certifications, journey, projects, skillGroups, socialLinks } from './data/portfolio'
import type { Project } from './types'

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const ParticleField = lazy(() =>
  import('./components/ParticleField').then((module) => ({ default: module.ParticleField })),
)

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const reduceMotion = useReducedMotion()
  const closeProject = useCallback(() => setActiveProject(null), [])

  return (
    <div className="site-shell">
      <Suspense fallback={null}><ParticleField /></Suspense>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <Header />

      <main id="main-content">
        <section id="home" className="hero section-shell" aria-labelledby="hero-title">
          <motion.div
            className="hero-copy"
            initial={reduceMotion ? undefined : 'hidden'}
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.7 }}
          >
            <div className="availability"><span aria-hidden="true" /> Open to software engineering opportunities</div>
            <p className="section-index">00 / INTRODUCTION</p>
            <h1 id="hero-title">
              Building software that turns
              <em> complex ideas </em>
              into useful products.
            </h1>
            <p className="hero-intro">
              I’m <strong>Michael O. Udarbe Jr</strong>, a software engineer focused on mobile experiences,
              computer vision, and practical AI systems built for real-world use.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                View selected work <ArrowDown size={17} aria-hidden="true" />
              </a>
              <a className="button button-secondary" href="/Michael-Udarbe-Resume.pdf" download>
                Download résumé <Download size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-meta" aria-label="Profile highlights">
              <span><MapPin size={15} aria-hidden="true" /> Rizal, Philippines</span>
              <span><Code2 size={15} aria-hidden="true" /> Mobile · Vision · AI</span>
            </div>
          </motion.div>

          <motion.aside
            className="hero-console"
            aria-label="Profile snapshot"
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.18 }}
          >
            <div className="console-topbar"><span /><span /><span /><small>profile.ts</small></div>
            <div className="console-body">
              <span className="code-muted">const</span> <span className="code-accent">engineer</span> = {'{'}
              <div><span className="code-key">name</span>: <span className="code-string">'Michael Udarbe'</span>,</div>
              <div><span className="code-key">focus</span>: [<span className="code-string">'mobile'</span>, <span className="code-string">'vision'</span>, <span className="code-string">'AI'</span>],</div>
              <div><span className="code-key">principle</span>: <span className="code-string">'build for people'</span>,</div>
              <div><span className="code-key">status</span>: <span className="code-string">'ready to collaborate'</span></div>
              {'}'}
            </div>
            <div className="console-orbit" aria-hidden="true">
              <span className="orbit-core">MU</span>
              <span className="orbit-ring ring-one" />
              <span className="orbit-ring ring-two" />
            </div>
          </motion.aside>
        </section>

        <section id="projects" className="section-shell projects-section" aria-labelledby="projects-title">
          <div className="section-heading">
            <div>
              <p className="section-index">01 / SELECTED PROJECTS</p>
              <h2 id="projects-title">Work built around real problems.</h2>
            </div>
            <p>Four projects spanning computer vision, mobile productivity, OCR, and AI-powered imaging.</p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} onOpen={setActiveProject} />
            ))}
          </div>
        </section>

        <section id="journey" className="section-shell journey-section" aria-labelledby="journey-title">
          <div className="section-heading">
            <div>
              <p className="section-index">02 / JOURNEY</p>
              <h2 id="journey-title">Learning by building.</h2>
            </div>
            <p>A software-engineering education strengthened through applied projects and continuous certification.</p>
          </div>

          <div className="journey-layout">
            <div className="education-column">
              {journey.map((item) => (
                <motion.article
                  key={item.title}
                  className="journey-card"
                  initial={reduceMotion ? undefined : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={reveal}
                  transition={{ duration: 0.55 }}
                >
                  <span className="journey-dot" aria-hidden="true" />
                  <p className="eyebrow">{item.period}</p>
                  <h3>{item.title}</h3>
                  <strong>{item.organization}</strong>
                  <p>{item.description}</p>
                </motion.article>
              ))}
              <div className="journey-note">
                <Sparkles size={20} aria-hidden="true" />
                <p><strong>Current direction</strong> — turning applied AI and computer vision into dependable product experiences.</p>
              </div>
            </div>

            <div className="certifications-panel">
              <div className="panel-heading">
                <p className="eyebrow">Credentials</p>
                <span>{certifications.length} certifications</span>
              </div>
              <div className="certification-list">
                {certifications.map((certificate) => (
                  <article key={certificate.name}>
                    <CheckCircle2 size={17} aria-hidden="true" />
                    <div><h3>{certificate.name}</h3><p>{certificate.issuer}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-shell skills-section" aria-labelledby="skills-title">
          <div className="section-heading">
            <div>
              <p className="section-index">03 / CAPABILITIES</p>
              <h2 id="skills-title">Tools chosen for the problem.</h2>
            </div>
            <p>A practical stack for taking an idea from prototype to a tested, deployable product.</p>
          </div>

          <div className="skill-groups">
            {skillGroups.map((group, index) => (
              <motion.article
                key={group.title}
                className="skill-group"
                initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="skill-group-copy">
                  <span>0{index + 1}</span>
                  <div><h3>{group.title}</h3><p>{group.description}</p></div>
                </div>
                <div className="skill-marquee" aria-label={`${group.title} skills`}>
                  <div className="skill-track">
                    {[...group.skills, ...group.skills].map((skill, skillIndex) => (
                      <span key={`${skill}-${skillIndex}`} aria-hidden={skillIndex >= group.skills.length}>{skill}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contact" className="section-shell contact-section" aria-labelledby="contact-title">
          <div className="contact-card">
            <p className="section-index">04 / LET’S BUILD</p>
            <h2 id="contact-title">Have a practical problem worth solving?</h2>
            <p>I’m open to software engineering opportunities, collaborative projects, and conversations about mobile, AI, and computer vision products.</p>
            <div className="contact-actions">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  className={link.label === 'Email' ? 'button button-primary' : 'button button-secondary'}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                >
                  {link.label === 'Email' ? <Mail size={18} aria-hidden="true" /> : <Code2 size={18} aria-hidden="true" />}
                  {link.label === 'Email' ? 'Start a conversation' : 'View GitHub'}
                  {link.external && <ArrowUpRight size={16} aria-hidden="true" />}
                </a>
              ))}
            </div>
            <a className="email-line" href="mailto:michaeludarbe@yahoo.com">michaeludarbe@yahoo.com</a>
          </div>
        </section>
      </main>

      <footer>
        <span>Michael O. Udarbe Jr</span>
        <span>Designed and engineered in the Philippines · {new Date().getFullYear()}</span>
      </footer>

      <ProjectModal project={activeProject} onClose={closeProject} />
    </div>
  )
}

export default App
