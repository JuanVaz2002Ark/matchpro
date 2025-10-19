
export interface CompanyInfo {
  name: string
  size: string
  industry: string,
  founded: string,
  description: string
  culture: string
  website: string
}

export interface Education {
  degree: string
  school: string
  year: number
  gpa: number
}

export interface WorkExperience {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
  jobType: "full-time" | "part-time" | "contract" | "freelance" | "internship" | "temporary" | "volunteer" | "remote" | "hybrid" | "other" 
}

export interface Certification {
  title: string
  issuer: string
  year: number
  credentialId: string
}

interface Salary {
  min: number
  max: number 
}

export interface JobPreferences {
  salary: Salary
  location: string[]
  jobType: "full-time" | "part-time" | "contract" | "freelance" | "internship" | "temporary" | "volunteer" | "remote" | "hybrid" | "other"
}

export interface CandidateDatabase {
  id: number
  candidateID: number
  recruiterID: number
  addedAt: string
}


interface User {
  id: number
  email: string
  password: string
  name: string
  avatar?: string 
  createdAt: string
  bio: string
  role: "candidate" | "recruiter"
  location: string
  phone?: string 
  education: Education[]
  company: string
  industry: string
}

interface Resume {
  cv_link: string
  uploadedAt: string
}

export interface AIAnalysis {
  strengths: string[]
  concerns: string[]
  recommendation: string
  matchScore: number
  resume: Resume
}

export interface Candidate extends User {
  role: "candidate"
  skills: string[]
  experience: number
  cvUploaded: boolean
  professionalTitle: string
  matchScore: number
  availability: string
  recruitmentSource?: 'job-boards' | 'company-career-page' | 'employee-referral' | 'recruitment-events' | 'professional-conferences' | 'social-media' | 'coding-communities' | 'university-partnerships' | 'recruitment-agencies' | 'direct-outreach' | 'other'
  jobPreferences: JobPreferences
  workExperience: WorkExperience[]
  certifications: Certification[]
  aiAnalysis: AIAnalysis
}

export interface Recruiter extends User {
  role: "recruiter"
  companySize: string
  address?: string
  foundedYear?: number
  companyDescription?: string
  employerRole?: string
  requirements?: string[]
  companyTypes?: string[]
  companyLocation?: string
}

export interface Job {
  id: number
  recruiterID: number
  title: string
  company: string
  department: string
  location: string
  job_type: "full-time" | "part-time" | "contract" | "freelance" | "internship" | "temporary" | "volunteer" | "remote" | "hybrid" | "other"
  createdAt: string
  experience: number
  salary: Salary
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  skills: string[]
  companyInfo: CompanyInfo
  applicants: number
  views: number
  shortlisted: number
  interviewed: number
  status: "active" | "paused" | "closed"
}

export interface Application {
  id: number
  appliedAt: string
  candidateId: number
  status: 'new' | 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'interview_scheduled' | 'hired';
  jobId: number
  // coverLetter: string
}

export interface RejectedApplication {
  id: number
  rejectedApplicationId: number
  candidateId: number
  jobId: number
  reason: string
  responsedAt: string
  comentario: string
}

interface RecentPosts {
  content: string
  engagement: number
}

export interface LinkedInProfiles extends Candidate {
  headline: string
  previousCompanies: string[]
  lastActivity: string
  connections: string
  mutualConnections: number
  summary: string
  recentPosts: RecentPosts[]
}

interface ClientActivity {
  type: 'job_posted' | 'hire' | 'interview' | 'contract_ended'; // extendable
  description: string;
  date: string; // You can use `Date` if you parse the string
}

export interface Client {
  id: number
  name: string
  industry: string
  size: string
  location: string
  contactPerson: string
  email: string
  phone: string
  status: 'inactive' | "active" | "pending"
  joinedDate: string
  activeJobs: number
  totalHires: number
  revenue: number
  logo: string
  description: string
  recentActivity: ClientActivity[]
}

interface Referrer {
  id: number
  name: string
  professionalTitle: string
  company: string
  relationship: string
}

interface Timeline {
  id: number
  event: string
  date: string
  status: 'completed' | 'in_progress' | 'pending' | 'scheduled'
}

export interface Referral {
  id: number
  candidate: Candidate
  referredDate: string
  status: 'rejected' | 'under_review' | 'hired' | 'interview_scheduled'
  jobTitle: string
  referralBonus: number
  notes: string
  referrer: Referrer
  timeline: Timeline[]
}


export interface ChatMessage {
  id: number
  sender: "user" | "ai"
  message: string
  timestamp: string
}

export interface MonthlyData {
  month: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec'
  jobs: number
  applications: number
  hires: number
  revenue: number
}

export interface TopPerformingJobs {
  title: string
  applications: number
  hires: number
  conversionRate: number
}

export interface ClientPerformance {
  name: string
  jobs: number
  hires: number
  revenue: number
  satisfaction: number
}

export interface SourceAnalytics {
  source: string
  applications: number
  percentage: number
}

