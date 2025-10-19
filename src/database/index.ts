import {
    Candidate, 
    Recruiter,
    CandidateDatabase,
    AIAnalysis,
    LinkedInProfiles,
    Client,
    Referral,
    Job,
    Application,
    RejectedApplication,
    ChatMessage,
    MonthlyData,
    TopPerformingJobs,
    ClientPerformance,
    SourceAnalytics,
} from "../types";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useJobs() {
  const { data: alljobs = [], error, isLoading, mutate } = useSWR<Job[]>("/api/jobs", fetcher);
  // if (isLoading) return <p className="text-center text-gray-500">Loading applications...</p>;
  // if (error) return <p className="text-center text-red-500">Failed to load applications.</p>;
  // if (!data) return <p className="text-center text-gray-500">No applications found.</p>;

  return { alljobs, mutate };
}

export function useClients() {
    const { data: clients = [], error, isLoading, mutate } = useSWR<Client[]>("/api/client", fetcher);
    
    return { clients, mutate };
}

export function useCandidates() {
    const { data: candidates = [], error, isLoading, mutate } = useSWR<Candidate[]>("/api/candidate", fetcher);
    return { candidates, mutate };
}

export function useRecruiters() {
  const { data: recruiters = [], error, isLoading, mutate } = useSWR<Recruiter[]>("/api/recruiters", fetcher);
  return { recruiters, mutate };
}

export function useAIAnalysis() {
  const { data: aiAnalysis = [], error, isLoading, mutate } = useSWR<AIAnalysis[]>("/api/aiAnalysis", fetcher);
  return { aiAnalysis, mutate };
}

export function useReferrals() {
  const { data: referrals = [], error, isLoading, mutate } = useSWR<Referral[]>("/api/referral", fetcher);
  return { referrals, mutate };
}

export function useApplications() {
  const { data: allApplications = [], error, isLoading, mutate } = useSWR<Application[]>("/api/applications", fetcher);
  // if (isLoading) return <p className="text-center text-gray-500">Loading applications...</p>;
  // if (error) return <p className="text-center text-red-500">Failed to load applications.</p>;
  // if (!data) return <p className="text-center text-gray-500">No applications found.</p>;

  return { allApplications, mutate };
}

export function useRejectedApplications() {
  const { data: allRejectedApplications = [], error, isLoading, mutate } = useSWR<RejectedApplication[]>("/api/rejectedApplications", fetcher);
  // if (isLoading) return <p className="text-center text-gray-500">Loading applications...</p>;
  // if (error) return <p className="text-center text-red-500">Failed to load applications.</p>;
  // if (!data) return <p className="text-center text-gray-500">No applications found.</p>;

  return { allRejectedApplications, mutate };
}



export function useJobsRecruiter(recruiterID: number) {
  const { alljobs } = useJobs();

  const jobs = alljobs.filter(d => d.recruiterID === recruiterID) ?? [];
  
  return jobs;
}





export function useUsers() {
  const { candidates } = useCandidates();
  const { recruiters } = useRecruiters();


  const users: { candidates: Candidate[]; recruiters: Recruiter[]; } = {
    recruiters: [...recruiters],
    candidates: [...candidates]
  };
  
  return users;
  
}



export function useAppliedJobsCandidate(candidateID: number) {
  const { allApplications } = useApplications();
  const { alljobs } = useJobs();
  // if (isLoading) return <p className="text-center text-gray-500">Loading applications...</p>;
  // if (error) return <p className="text-center text-red-500">Failed to load applications.</p>;
  // if (!data) return <p className="text-center text-gray-500">No applications found.</p>;
  const filteredApplications = allApplications.filter(app => app.candidateId === candidateID);
  const candidateAppliedJobs = alljobs.filter(job => filteredApplications.some(application => job.id === application.jobId));

  return { candidateAppliedJobs };
}

export function useRecentApplication(candidateID: number) {
  const {allApplications } = useApplications();
  
  const recentApplications = allApplications.find(app => app.candidateId === candidateID );

  return recentApplications;
}




export function useCandidatesDatabase(recruiterID: number) {
  const { data } = useSWR<CandidateDatabase[]>("/api/candidateDatabase", fetcher);
  const { candidates } = useCandidates();
  // console.log(data);
  const filtered_data = data?.filter(d => d.recruiterID === recruiterID);
  // console.log(filtered_data);
  const candidateIds = Object.values(filtered_data ?? []).map(c => c.candidateID);
  // console.log(candidateIds);
  const candidatesDatabase = candidates.filter(can => candidateIds.includes(can.id));

  return {
    candidatesDatabase
  };
}


export function useJobsCandidate(candidateID: number) {
  const { data: candidateDB } = useSWR<CandidateDatabase[]>("/api/candidateDatabase", fetcher);
  const { data: jobs } = useSWR<Job[]>("/api/jobs", fetcher);
  
  const filtered_candidateDB = candidateDB?.filter(d => d.candidateID === candidateID) ?? [];
  
  let recruiterIDList: number[] = [];

  for (const dato of filtered_candidateDB) {
    recruiterIDList.push(dato.recruiterID);
  }
  
  let activeJobs: Job[] = [];
  
  for (const recruiterID of recruiterIDList) {
    // let jobList: Job[] = []
    const filtered_jobs = jobs?.filter(j => j.recruiterID === recruiterID) ?? [];
    for (const job of filtered_jobs) {
      activeJobs.push(job);
    }
  }
  return activeJobs;
}