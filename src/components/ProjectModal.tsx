import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import type { Project } from '../types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!project) return
    previousFocus.current = document.activeElement as HTMLElement | null
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
      previousFocus.current?.focus()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose()
          }}
        >
          <motion.div
            className={`project-modal accent-${project.accent}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          >
            <button ref={closeRef} type="button" className="modal-close" onClick={onClose} aria-label="Close project details">
              <X aria-hidden="true" />
            </button>
            <div className="modal-image">
              <img src={project.cover} alt={project.coverAlt} />
            </div>
            <div className="modal-copy">
              <p className="eyebrow">{project.eyebrow}</p>
              <h2 id="project-modal-title">{project.title}</h2>
              <p>{project.details}</p>
              <div className="tag-list modal-tags">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="modal-actions">
                {project.repositoryUrl && (
                  <a className="button button-primary" href={project.repositoryUrl} target="_blank" rel="noreferrer">
                    View repository <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                )}
                {project.liveUrl && (
                  <a className="button button-secondary" href={project.liveUrl} target="_blank" rel="noreferrer">
                    Visit product <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                )}
                {!project.repositoryUrl && !project.liveUrl && (
                  <span className="private-note">Project details available on request.</span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
