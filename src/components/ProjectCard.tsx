import { motion } from 'framer-motion'
import { ArrowUpRight, Expand } from 'lucide-react'
import type { Project } from '../types'

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  return (
    <motion.article
      className={`project-card accent-${project.accent}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
    >
      <div className="project-visual">
        <img src={project.cover} alt={project.coverAlt} loading={index > 1 ? 'lazy' : 'eager'} />
        <span className="project-number" aria-hidden="true">0{index + 1}</span>
      </div>
      <div className="project-copy">
        <p className="eyebrow">{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="tag-list" aria-label={`${project.title} technologies`}>
          {project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="project-actions">
          <button type="button" className="text-button" onClick={() => onOpen(project)} aria-label={`View details for ${project.title}`}>
            Explore project <Expand size={15} aria-hidden="true" />
          </button>
          {project.repositoryUrl && (
            <a href={project.repositoryUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} repository on GitHub`}>
              GitHub <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
