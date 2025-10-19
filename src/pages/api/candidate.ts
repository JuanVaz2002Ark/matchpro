import type { NextApiRequest, NextApiResponse } from 'next';
import matchprodb from '../../server/lib/dt';
const DEFAULT_AVATAR = '/placeholder-user.jpg';
import { Candidate, Certification, Education, JobPreferences, WorkExperience } from '../../types';
import { Certificate } from 'crypto';

const script_candidate = `SELECT * FROM matchprodb.candidates`;
const script_job_preferences = `SELECT * FROM matchprodb.job_preferences`;
const script_education = `SELECT * FROM matchprodb.education_candidate`;
const script_work_experience = `SELECT * FROM matchprodb.work_experience`;
const script_certifications = `SELECT * FROM matchprodb.certifications`;
const script_ai_analysis = `SELECT * FROM matchprodb.ai_analysis`;



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const [rows_candidate] = await matchprodb.query<any[]>(script_candidate);
        const [rows_job_preferences] = await matchprodb.query<any[]>(script_job_preferences);
        const [rows_education] = await matchprodb.query<any[]>(script_education);
        const [rows_work_experience] = await matchprodb.query<any[]>(script_work_experience);
        const [rows_certifications] = await matchprodb.query<any[]>(script_certifications);
        const [rows_ai_analysis] = await matchprodb.query<any[]>(script_ai_analysis);
        

        // Group by client ID
        const candidatesMap: Record<number, any> = {};
        
        for (const candidate of rows_candidate) {
            const candidateId = candidate.id;

            let skills = []
            try {
                skills = candidate.skills ? JSON.parse(candidate.skills) : [];
            } catch (error) {
                console.warn(`Failed to parse skills from the candidate (${candidate.id}):`, error);
                skills = [];
            }

            if (!candidatesMap[candidateId]) {
                candidatesMap[candidateId] = {
                    id: candidate.id,
                    email: candidate.email,
                    password: candidate.password,
                    name: candidate.name,
                    avatar: candidate.avatar || DEFAULT_AVATAR, 
                    createdAt: candidate.createdAt,
                    bio: candidate.bio,
                    role: "candidate",
                    location: candidate.location,
                    phone: candidate.phone,
                    education: [],
                    company: candidate.company,
                    industry: candidate.industry,
                    skills: skills,
                    experience: candidate.experience,
                    cvUploaded: candidate.cvUploaded,
                    professionalTitle: candidate.professionalTitle,
                    matchScore: candidate.matchScore,
                    availability: candidate.availability,
                    jobPreferences: {},
                    workExperience: [],
                    certifications: [],
                    aiAnalysis: {}
                };
            }

            // 2. Enrich with job_preferences
            for (const job_preferences of rows_job_preferences) {
                const candidate_id = job_preferences.candidate_id;
                if (candidatesMap[candidate_id]) {
                    candidatesMap[candidate_id].jobPreferences = {
                        salary: { min: job_preferences.salaryMin, max: job_preferences.salaryMax },
                        location: (job_preferences.location).split(","),
                        jobType: job_preferences.jobType
                    };
                }
            }
        
            // 3. Enrich with education
            for (const education of rows_education) {
                const candidate_id = education.user_id;
                if (candidatesMap[candidate_id]) {
                    candidatesMap[candidate_id].education.push({
                        degree: education.degree,
                        school: education.school,
                        year: education.year,
                        gpa: education.gpa,
                    });
                }
            }
            
            // 4. Enrich with work_experience
            for (const work_experience of rows_work_experience) {
                const candidate_id = work_experience.candidate_id;
                if (candidatesMap[candidate_id]) {
                    let endDate = "";
                    if(work_experience.endDate !== "")
                    {
                        endDate = work_experience.endDate instanceof Date ? work_experience.endDate.toISOString().split("T")[0] : String(work_experience.endDate).split("T")[0];
                    }
                    else
                    {
                        endDate = "Present";
                    }
                    
                    candidatesMap[candidate_id].workExperience.push({
                        title: work_experience.title,
                        company: work_experience.company,
                        location: work_experience.location,
                        startDate: work_experience.startDate instanceof Date ? work_experience.startDate.toISOString().split("T")[0] : String(work_experience.startDate).split("T")[0],
                        endDate: endDate,
                        description: work_experience.description
                    });
                }
            }
            
            // 5. Enrich with certifications
            for (const certification of rows_certifications) {
                const candidate_id = certification.candidate_id;
                if (candidatesMap[candidate_id]) {
                candidatesMap[candidate_id].certifications.push({
                    name: certification.name,
                    issuer: certification.issuer,
                    year: certification.year,
                    credential_id: certification.credential_id,
                });
                }
            }


              // 6. Enrich with AI analysis
            for (const ai_analysis of rows_ai_analysis) {
                const candidate_id = ai_analysis.candidate_id;
                
                // Safely parse JSON strings with error handling
                let strengths = [];
                let concerns = [];
                
                try {
                    strengths = ai_analysis.strengths ? JSON.parse(ai_analysis.strengths) : [];
                } catch (error) {
                    console.warn(`Failed to parse strengths for candidate ${candidate_id}:`, error);
                    strengths = [];
                }
                
                try {
                    concerns = ai_analysis.concerns ? JSON.parse(ai_analysis.concerns) : [];
                } catch (error) {
                    console.warn(`Failed to parse concerns for candidate ${candidate_id}:`, error);
                    concerns = [];
                }
                
                if (candidatesMap[candidate_id]) {
                    candidatesMap[candidate_id].aiAnalysis = {
                        strengths: strengths,
                        concerns: concerns,
                        recommendation: ai_analysis.recommendation || '',
                        matchScore: ai_analysis.matchScore || 0,
                        resume: {
                            cv_link: ai_analysis.cv_link || '',
                            uploadedAt: ai_analysis.uploadedAt || ''
                        }
                    };
                    // console.log(candidatesMap[candidate_id].aiAnalysis)
                }
            }



        }

      
        const candidates = Object.values(candidatesMap);
        res.status(200).json(candidates);
    }
    if (req.method == 'PATCH') {
        const { completeProfile } = req.body;

        if (!completeProfile) {
            return res.status(404).json({ error: 'completeProfile is required' });
        }

        const basicInfo: Partial<Candidate> = completeProfile.basicInfo;
        const education: Education[] = completeProfile.education;
        const jobPreferences: JobPreferences = completeProfile.jobPreferences;
        const workExperience: WorkExperience[] = completeProfile.workExperience;
        const certifications: Certification[] = completeProfile.certifications;

        


    }
}