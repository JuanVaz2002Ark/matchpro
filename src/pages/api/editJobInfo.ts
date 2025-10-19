import type { NextApiRequest, NextApiResponse } from 'next';
import matchprodb from '../../server/lib/dt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {

      const { title, company, department, location, experience, description, 
              workType, salaryMin, salaryMax, requirements, benefits, skills,
              jobId } = req.body;

      console.log('Received job data for posting:', req.body);

    //   const addedAt = new Date().toISOString().split('T')[0];

      const requirementsJson = Array.isArray(requirements) ? JSON.stringify(requirements) : requirements;
      const benefitsJson = Array.isArray(benefits) ? JSON.stringify(benefits) : benefits;
      const skillsJson = Array.isArray(skills) ? JSON.stringify(skills) : skills;


      const [result] = await matchprodb.query<any>(
        `UPDATE jobs 
         SET title = ?, 
             company = ?, 
             department = ?, 
             location = ?, 
             experience = ?, 
             description = ?, 
             job_type = ?, 
             salaryMin = ?, 
             salaryMax = ?, 
             requirements = ?, 
             benefits = ?, 
             skills = ?
         WHERE id = ?`,
         [
          title, company, department, location, Number(experience), description, workType, 
          Number(salaryMin), Number(salaryMax), requirementsJson, benefitsJson, skillsJson, jobId
         ]
      );

      console.log('Job inserted successfully:', result);
      return res.status(201).json({ message: 'Job created successfully', id: (result as any).insertId });
    } catch (error) {
      console.error('Error inserting job:', error);
      return res.status(500).json({ error: 'Failed to create job', details: error.message });
    }
  }
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}