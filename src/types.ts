export interface Project {
  slug: string
  title: string
  eyebrow: string
  summary: string
  details: string
  tags: string[]
  cover: string
  coverAlt: string
  repositoryUrl: string | null
  liveUrl: string | null
  accent: 'teal' | 'amber' | 'cyan' | 'violet'
}

export interface SkillGroup {
  title: string
  description: string
  skills: string[]
}

export interface JourneyItem {
  period: string
  title: string
  organization: string
  description: string
}

export interface Certification {
  name: string
  issuer: string
}

export interface SocialLink {
  label: string
  href: string
  external: boolean
}
