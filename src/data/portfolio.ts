import type {
  Certification,
  JourneyItem,
  Project,
  SkillGroup,
  SocialLink,
} from '../types'

export const projects: Project[] = [
  {
    slug: 'sureball',
    title: 'SureBall',
    eyebrow: 'Computer vision · Mobile coaching',
    summary: 'A basketball coaching application that turns video into practical form feedback, scores, and session insights.',
    details: 'SureBall combines MediaPipe BlazePose and YOLOv11 to analyze shooting form, defensive stance, and footwork. A FastAPI analysis service extracts biomechanics and returns rule-based coaching feedback to a mobile experience built for repeatable practice.',
    tags: ['React Native', 'FastAPI', 'MediaPipe', 'YOLOv11', 'OpenCV'],
    cover: '/projects/sureball.svg',
    coverAlt: 'Abstract SureBall basketball pose-analysis project cover',
    repositoryUrl: 'https://github.com/Udarbe-M/Sureball',
    liveUrl: null,
    accent: 'amber',
  },
  {
    slug: 'grocery-manager',
    title: 'Grocery Manager',
    eyebrow: 'Mobile · OCR',
    summary: 'A shelf-price scanner that turns labels into a clean grocery list with quantities, currencies, and a running total.',
    details: 'Built with Expo and React Native, Grocery Manager supports camera or photo-library OCR, automatic currency detection, editable quantities, and live totals. It selects cloud OCR in Expo Go and supports on-device ML Kit recognition in development builds.',
    tags: ['Expo', 'React Native', 'TypeScript', 'OCR', 'ML Kit'],
    cover: '/projects/grocery-manager.svg',
    coverAlt: 'Abstract Grocery Manager OCR scanning project cover',
    repositoryUrl: 'https://github.com/Udarbe-M/GroceryManager',
    liveUrl: null,
    accent: 'teal',
  },
  {
    slug: 'prescription-scheduler',
    title: 'Prescription Scheduler',
    eyebrow: 'Health productivity · OCR',
    summary: 'A medication companion for scanning prescriptions, reviewing extracted instructions, and scheduling reminders.',
    details: 'The system pairs an Expo React Native app with a FastAPI OCR service. It supports printed and handwritten prescription workflows, medication review before saving, pill-stock tracking, local reminders, and dose completion history.',
    tags: ['React Native', 'Expo', 'FastAPI', 'EasyOCR', 'TrOCR'],
    cover: '/projects/prescription-scheduler.svg',
    coverAlt: 'Abstract Prescription Scheduler medication and OCR project cover',
    repositoryUrl: 'https://github.com/Udarbe-M/Prescription-Scheduler-System',
    liveUrl: null,
    accent: 'cyan',
  },
  {
    slug: 'nullpix',
    title: 'NullPix',
    eyebrow: 'AI imaging · GPU processing',
    summary: 'An AI image-processing workspace for background removal, upscaling, object removal, and visual comparison.',
    details: 'NullPix is designed as a multi-image productivity platform with batch processing, GPU-accelerated enhancement, and before-and-after review. Its workflow brings common image cleanup tasks into one focused interface.',
    tags: ['Python', 'PyTorch', 'CUDA', 'BiRefNet', 'Real-ESRGAN'],
    cover: '/projects/nullpix.svg',
    coverAlt: 'Abstract NullPix AI image-processing project cover',
    repositoryUrl: null,
    liveUrl: null,
    accent: 'violet',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Software engineering',
    description: 'Product-focused development across mobile, web, APIs, and data.',
    skills: ['TypeScript', 'JavaScript', 'Python', 'C++', 'Java', 'PHP', 'React Native', 'FastAPI', 'MySQL'],
  },
  {
    title: 'Machine learning & vision',
    description: 'Applied models and computer-vision pipelines for useful feedback.',
    skills: ['PyTorch', 'Keras', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'MediaPipe', 'YOLO'],
  },
  {
    title: 'Cloud & delivery',
    description: 'Tools for packaging, automating, and shipping dependable software.',
    skills: ['Docker', 'Git', 'GitHub Actions', 'Vercel', 'Supabase', 'REST APIs', 'CI/CD'],
  },
]

export const journey: JourneyItem[] = [
  {
    period: '2020 — Present',
    title: 'BS Computer Science — Software Engineering',
    organization: 'FEU Institute of Technology',
    description: 'Building a practical foundation in software engineering through mobile applications, computer vision, machine learning, and full-stack project work.',
  },
]

export const certifications: Certification[] = [
  { name: 'Oracle Cloud Infrastructure 2025 Certified Generative AI', issuer: 'Oracle' },
  { name: 'IT Specialist — Java', issuer: 'Certiport' },
  { name: 'IT Specialist — Python', issuer: 'Certiport' },
  { name: 'Project Management Ready', issuer: 'PMI' },
  { name: 'Open Science 101', issuer: 'NASA' },
  { name: 'Artificial Intelligence Fundamentals', issuer: 'IBM SkillsBuild' },
  { name: 'AI Fundamentals: Foundations for Understanding AI', issuer: 'IBM SkillsBuild' },
  { name: 'Getting Started with Artificial Intelligence', issuer: 'IBM SkillsBuild' },
  { name: 'Getting Started with Generative AI', issuer: 'IBM SkillsBuild' },
  { name: 'AI Literacy', issuer: 'IBM SkillsBuild' },
  { name: 'AI-Enabled Applications for Customer Service', issuer: 'IBM SkillsBuild' },
]

export const socialLinks: SocialLink[] = [
  { label: 'Email', href: 'mailto:michaeludarbe@yahoo.com', external: false },
  { label: 'GitHub', href: 'https://github.com/Udarbe-M', external: true },
]
